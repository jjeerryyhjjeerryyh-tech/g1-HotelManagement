/**
 * dependency-manager-refactored.js - Refactored Dependency Manager
 *
 * Improvements:
 * 1. Uses FileUtils for unified JSON read/write operations
 * 2. Uses CommandExecutor for unified command execution
 * 3. Uses Constants to eliminate hardcoded strings
 * 4. Eliminates duplicate code with deployment-manager
 * 5. Improved error handling using AppError
 */

const FileUtils = require('./FileUtils');
const CommandExecutor = require('./CommandExecutor');
const { DependencyError } = require('./AppError');
const Constants = require('./Constants');

class DependencyManager {
  constructor() {
    this.packageJsonPath = require('path').join(
      process.cwd(),
      Constants.FILE_PATHS.PACKAGE_JSON
    );
    this.lockfilePath = require('path').join(
      process.cwd(),
      Constants.FILE_PATHS.PACKAGE_LOCK
    );
  }

  /**
   * Check dependency completeness
   * @returns {Object} Check result { status, missing, total }
   * @throws {DependencyError} Thrown when check fails
   */
  checkDependencies() {
    try {
      const packageJson = FileUtils.readPackageJSON();
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };

      const missingDeps = [];

      for (const [name, version] of Object.entries(dependencies)) {
        try {
          require.resolve(name);
        } catch (error) {
          missingDeps.push({ name, version });
        }
      }

      return {
        status: missingDeps.length === 0
          ? Constants.DEPENDENCY_STATUS.COMPLETE
          : Constants.DEPENDENCY_STATUS.INCOMPLETE,
        missing: missingDeps,
        total: Object.keys(dependencies).length
      };
    } catch (error) {
      throw new DependencyError(
        `${Constants.ERROR_MESSAGES.DEPENDENCY_CHECK_FAILED}`,
        [],
        { error: error.message }
      );
    }
  }

  /**
   * Install dependencies
   * @returns {boolean} Whether installation succeeded
   */
  installDependencies() {
    try {
      console.log('Installing dependencies...');
      CommandExecutor.executeNpmWithStdio('install');
      console.log(Constants.SUCCESS_MESSAGES.DEPENDENCIES_INSTALLED);
      return true;
    } catch (error) {
      console.error(
        `${Constants.ERROR_MESSAGES.COMMAND_EXECUTION_FAILED}: npm install`,
        error.message
      );
      return false;
    }
  }

  /**
   * Install dependencies for production (using npm ci)
   * @returns {boolean} Whether installation succeeded
   */
  installProductionDependencies() {
    try {
      console.log('Installing production dependencies...');
      CommandExecutor.executeNpmWithStdio('ci', ['--only=production']);
      console.log(Constants.SUCCESS_MESSAGES.DEPENDENCIES_INSTALLED);
      return true;
    } catch (error) {
      console.error(
        `${Constants.ERROR_MESSAGES.COMMAND_EXECUTION_FAILED}: npm ci`,
        error.message
      );
      return false;
    }
  }

  /**
   * Generate dependency report
   * @returns {Object} Dependency report object
   * @throws {DependencyError} Thrown when generation fails
   */
  generateDependencyReport() {
    try {
      const packageJson = FileUtils.readPackageJSON();
      const lockfile = FileUtils.readPackageLock();

      const report = {
        projectName: packageJson.name,
        version: packageJson.version,
        nodeVersion: process.version,
        npmVersion: this._getNpmVersion(),
        dependencies: {
          production: packageJson.dependencies || {},
          development: packageJson.devDependencies || {}
        },
        lockfileExists: !!lockfile,
        generatedAt: new Date().toISOString()
      };

      const reportPath = require('path').join(
        process.cwd(),
        Constants.FILE_PATHS.DEPENDENCY_REPORT
      );

      FileUtils.writeJSON(reportPath, report);
      return report;
    } catch (error) {
      throw new DependencyError(
        `Failed to generate dependency report`,
        [],
        { error: error.message }
      );
    }
  }

  /**
   * Get NPM version
   * @private
   */
  _getNpmVersion() {
    try {
      return CommandExecutor.getCommandVersion('npm');
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Clean dependencies
   * @returns {boolean} Whether cleaning succeeded
   */
  cleanDependencies() {
    try {
      const nodeModulesPath = require('path').join(
        process.cwd(),
        Constants.FILE_PATHS.NODE_MODULES
      );

      if (FileUtils.directoryExists(nodeModulesPath)) {
        console.log('Cleaning node_modules...');
        FileUtils.deleteDirectory(nodeModulesPath);
      }

      if (FileUtils.fileExists(this.lockfilePath)) {
        console.log('Deleting package-lock.json...');
        FileUtils.deleteFile(this.lockfilePath);
      }

      console.log(Constants.SUCCESS_MESSAGES.DEPENDENCIES_CLEANED);
      return true;
    } catch (error) {
      console.error(
        Constants.ERROR_MESSAGES.COMMAND_EXECUTION_FAILED,
        error.message
      );
      return false;
    }
  }

  /**
   * Get dependency tree
   * @returns {Object} Dependency tree structure
   */
  getDependencyTree() {
    try {
      const packageJson = FileUtils.readPackageJSON();
      return {
        name: packageJson.name,
        version: packageJson.version,
        dependencies: packageJson.dependencies || {},
        devDependencies: packageJson.devDependencies || {},
        peerDependencies: packageJson.peerDependencies || {},
        optionalDependencies: packageJson.optionalDependencies || {}
      };
    } catch (error) {
      throw new DependencyError(
        `Failed to get dependency tree`,
        [],
        { error: error.message }
      );
    }
  }

  /**
   * Check if specific dependency is installed
   * @param {string} packageName - Package name
   * @returns {boolean} Whether installed
   */
  isDependencyInstalled(packageName) {
    try {
      require.resolve(packageName);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get dependency info
   * @param {string} packageName - Package name
   * @returns {Object|null} Dependency info or null
   */
  getDependencyInfo(packageName) {
    try {
      const packageJson = FileUtils.readPackageJSON();
      const version = packageJson.dependencies?.[packageName]
        || packageJson.devDependencies?.[packageName]
        || packageJson.peerDependencies?.[packageName]
        || packageJson.optionalDependencies?.[packageName];

      if (!version) {
        return null;
      }

      return {
        name: packageName,
        version,
        type: packageJson.dependencies?.[packageName]
          ? 'production'
          : packageJson.devDependencies?.[packageName]
            ? 'development'
            : packageJson.peerDependencies?.[packageName]
              ? 'peer'
              : 'optional'
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Install specific dependency
   * @param {string} packageName - Package name
   * @param {boolean} isDev - Whether as dev dependency
   * @returns {boolean} Whether installation succeeded
   */
  installDependency(packageName, isDev = false) {
    try {
      const args = isDev ? [packageName, '--save-dev'] : [packageName];
      CommandExecutor.executeNpmWithStdio('install', args);
      return true;
    } catch (error) {
      console.error(`Failed to install ${packageName}:`, error.message);
      return false;
    }
  }

  /**
   * Uninstall dependency
   * @param {string} packageName - Package name
   * @returns {boolean} Whether uninstallation succeeded
   */
  uninstallDependency(packageName) {
    try {
      CommandExecutor.executeNpmWithStdio('uninstall', [packageName]);
      return true;
    } catch (error) {
      console.error(`Failed to uninstall ${packageName}:`, error.message);
      return false;
    }
  }

  /**
   * Upgrade dependency
   * @param {string} packageName - Package name (optional, upgrade all if not specified)
   * @returns {boolean} Whether upgrade succeeded
   */
  upgradeDependency(packageName = null) {
    try {
      const args = packageName ? ['update', packageName] : ['update'];
      CommandExecutor.executeNpmWithStdio(...args);
      return true;
    } catch (error) {
      console.error(`Failed to upgrade dependency:`, error.message);
      return false;
    }
  }

  /**
   * Audit dependency security
   * @returns {Object} Audit results
   */
  auditDependencies() {
    try {
      const output = CommandExecutor.execute('npm audit --json', {
        encoding: 'utf8'
      });
      return JSON.parse(output);
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = new DependencyManager();
