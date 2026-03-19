/**
 * dependency-manager-refactored.js - 重构后的依赖管理器
 * 
 * 改进点：
 * 1. 使用 FileUtils 统一 JSON 读写操作
 * 2. 使用 CommandExecutor 统一命令执行
 * 3. 使用 Constants 消除硬编码字符串
 * 4. 消除与 deployment-manager 的重复代码
 * 5. 改进错误处理使用 AppError
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
   * 检查依赖完整性
   * @returns {Object} 检查结果 { status, missing, total }
   * @throws {DependencyError} 检查失败时抛出
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
   * 安装依赖
   * @returns {boolean} 是否安装成功
   */
  installDependencies() {
    try {
      console.log('正在安装依赖...');
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
   * 为生产环境安装依赖（使用 npm ci）
   * @returns {boolean} 是否安装成功
   */
  installProductionDependencies() {
    try {
      console.log('正在安装生产依赖...');
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
   * 生成依赖报告
   * @returns {Object} 依赖报告对象
   * @throws {DependencyError} 生成失败时抛出
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
        `生成依赖报告失败`,
        [],
        { error: error.message }
      );
    }
  }

  /**
   * 获取 NPM 版本
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
   * 清理依赖
   * @returns {boolean} 是否清理成功
   */
  cleanDependencies() {
    try {
      const nodeModulesPath = require('path').join(
        process.cwd(),
        Constants.FILE_PATHS.NODE_MODULES
      );

      if (FileUtils.directoryExists(nodeModulesPath)) {
        console.log('正在清理 node_modules...');
        FileUtils.deleteDirectory(nodeModulesPath);
      }

      if (FileUtils.fileExists(this.lockfilePath)) {
        console.log('正在删除 package-lock.json...');
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
   * 获取依赖树
   * @returns {Object} 依赖树结构
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
        `获取依赖树失败`,
        [],
        { error: error.message }
      );
    }
  }

  /**
   * 检查特定依赖是否已安装
   * @param {string} packageName - 包名称
   * @returns {boolean} 是否已安装
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
   * 获取依赖信息
   * @param {string} packageName - 包名称
   * @returns {Object|null} 依赖信息或 null
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
   * 安装特定依赖
   * @param {string} packageName - 包名称
   * @param {boolean} isDev - 是否作为开发依赖
   * @returns {boolean} 是否安装成功
   */
  installDependency(packageName, isDev = false) {
    try {
      const args = isDev ? [packageName, '--save-dev'] : [packageName];
      CommandExecutor.executeNpmWithStdio('install', args);
      return true;
    } catch (error) {
      console.error(`安装 ${packageName} 失败:`, error.message);
      return false;
    }
  }

  /**
   * 卸载依赖
   * @param {string} packageName - 包名称
   * @returns {boolean} 是否卸载成功
   */
  uninstallDependency(packageName) {
    try {
      CommandExecutor.executeNpmWithStdio('uninstall', [packageName]);
      return true;
    } catch (error) {
      console.error(`卸载 ${packageName} 失败:`, error.message);
      return false;
    }
  }

  /**
   * 升级依赖
   * @param {string} packageName - 包名称（可选，不指定则升级所有）
   * @returns {boolean} 是否升级成功
   */
  upgradeDependency(packageName = null) {
    try {
      const args = packageName ? ['update', packageName] : ['update'];
      CommandExecutor.executeNpmWithStdio(...args);
      return true;
    } catch (error) {
      console.error(`升级依赖失败:`, error.message);
      return false;
    }
  }

  /**
   * 审计依赖安全性
   * @returns {Object} 审计结果
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
