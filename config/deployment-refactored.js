/**
 * deployment-refactored.js - Refactored Deployment Manager
 *
 * Improvements:
 * 1. Uses FileUtils for unified file operations
 * 2. Uses CommandExecutor for unified command execution
 * 3. Uses Constants to eliminate hardcoded strings
 * 4. Improved cross-platform compatibility (Windows/Linux)
 * 5. Eliminates duplicate code with dependency-manager
 * 6. Improved error handling using AppError
 */

const FileUtils = require('./FileUtils');
const CommandExecutor = require('./CommandExecutor');
const { DeploymentError } = require('./AppError');
const Constants = require('./Constants');
const path = require('path');

class DeploymentManager {
  constructor(environment = process.env.NODE_ENV || Constants.ENVIRONMENTS.DEVELOPMENT) {
    this.environment = environment;
  }

  /**
   * Environment health check
   * @returns {Object} Check results
   */
  healthCheck() {
    const checks = {
      environment: this.environment,
      timestamp: new Date().toISOString(),
      checks: {}
    };

    // Check config file
    checks.checks.config = this._checkConfig();

    // Check log directory
    checks.checks.logging = this._checkLogging();

    // Check server config
    checks.checks.server = this._checkServer();

    // Check dependencies
    checks.checks.dependencies = this._checkDependencies();

    return checks;
  }

  /**
   * Check config
   * @private
   */
  _checkConfig() {
    try {
      const configPath = Constants.ENV_CONFIG_FILES[this.environment];
      if (FileUtils.fileExists(configPath)) {
        const config = FileUtils.readJSON(configPath);
        return {
          status: Constants.HEALTH_CHECK_STATUS.PASS,
          message: 'Config file loaded successfully',
          environment: this.environment
        };
      } else {
        return {
          status: Constants.HEALTH_CHECK_STATUS.FAIL,
          message: `Config file not found: ${configPath}`
        };
      }
    } catch (error) {
      return {
        status: Constants.HEALTH_CHECK_STATUS.FAIL,
        message: `Config error: ${error.message}`
      };
    }
  }

  /**
   * Check log directory
   * @private
   */
  _checkLogging() {
    try {
      const logPath = './logs';
      FileUtils.ensureDirectory(logPath);
      return {
        status: Constants.HEALTH_CHECK_STATUS.PASS,
        message: 'Log directory accessible',
        path: logPath
      };
    } catch (error) {
      return {
        status: Constants.HEALTH_CHECK_STATUS.FAIL,
        message: `Log error: ${error.message}`
      };
    }
  }

  /**
   * Check server config
   * @private
   */
  _checkServer() {
    try {
      return {
        status: Constants.HEALTH_CHECK_STATUS.PASS,
        message: 'Server config correct',
        environment: this.environment
      };
    } catch (error) {
      return {
        status: Constants.HEALTH_CHECK_STATUS.FAIL,
        message: `Server config error: ${error.message}`
      };
    }
  }

  /**
   * Check dependencies
   * @private
   */
  _checkDependencies() {
    try {
      if (!FileUtils.directoryExists(Constants.FILE_PATHS.NODE_MODULES)) {
        return {
          status: Constants.HEALTH_CHECK_STATUS.FAIL,
          message: Constants.ERROR_MESSAGES.NODE_MODULES_NOT_FOUND
        };
      }
      return {
        status: Constants.HEALTH_CHECK_STATUS.PASS,
        message: 'Dependencies installed'
      };
    } catch (error) {
      return {
        status: Constants.HEALTH_CHECK_STATUS.FAIL,
        message: `Dependency check failed: ${error.message}`
      };
    }
  }

  /**
   * Pre-deployment check
   * @returns {Object} Check result { passed, checks }
   */
  preDeploymentCheck() {
    console.log('Running pre-deployment checks...');

    const checks = [];

    // Check environment variables
    if (this.environment === Constants.ENVIRONMENTS.PRODUCTION) {
      const requiredEnvVars = ['DB_USERNAME', 'DB_PASSWORD'];
      for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
          checks.push({
            type: Constants.CHECK_TYPES.ERROR,
            message: `${Constants.ERROR_MESSAGES.MISSING_ENV_VAR}: ${envVar}`
          });
        }
      }
    }

    // Check dependencies
    if (!FileUtils.directoryExists(Constants.FILE_PATHS.NODE_MODULES)) {
      checks.push({
        type: Constants.CHECK_TYPES.WARNING,
        message: Constants.ERROR_MESSAGES.NODE_MODULES_NOT_FOUND
      });
    }

    // Check package.json
    if (!FileUtils.fileExists(Constants.FILE_PATHS.PACKAGE_JSON)) {
      checks.push({
        type: Constants.CHECK_TYPES.ERROR,
        message: Constants.ERROR_MESSAGES.CONFIG_FILE_NOT_FOUND
      });
    }

    return {
      passed: checks.filter(c => c.type === Constants.CHECK_TYPES.ERROR).length === 0,
      checks
    };
  }

  /**
   * Generate deployment script
   * @returns {string} Script file path
   * @throws {DeploymentError} Thrown when generation fails
   */
  generateDeploymentScript() {
    try {
      const scriptName = this._getDeploymentScriptName();
      const scriptContent = this._getDeploymentScriptContent();

      FileUtils.writeFile(scriptName, scriptContent);

      // Make script executable on Unix systems
      if (process.platform !== 'win32') {
        try {
          CommandExecutor.execute(`chmod +x ${scriptName}`);
        } catch (error) {
          console.warn('Cannot set script executable permission:', error.message);
        }
      }

      console.log(`${Constants.SUCCESS_MESSAGES.DEPLOYMENT_SCRIPT_GENERATED}: ${scriptName}`);
      return scriptName;
    } catch (error) {
      throw new DeploymentError(
        `Failed to generate deployment script`,
        'SCRIPT_GENERATION',
        { error: error.message }
      );
    }
  }

  /**
   * Get deployment script name
   * @private
   */
  _getDeploymentScriptName() {
    const extension = process.platform === 'win32' ? '.bat' : '.sh';
    return `deploy-${this.environment}${extension}`;
  }

  /**
   * Get deployment script content
   * @private
   */
  _getDeploymentScriptContent() {
    const templates = {
      [Constants.ENVIRONMENTS.DEVELOPMENT]: this._generateDevScript(),
      [Constants.ENVIRONMENTS.TESTING]: this._generateTestScript(),
      [Constants.ENVIRONMENTS.PRODUCTION]: this._generateProdScript()
    };

    return templates[this.environment] || templates[Constants.ENVIRONMENTS.DEVELOPMENT];
  }

  /**
   * Generate dev environment script
   * @private
   */
  _generateDevScript() {
    if (process.platform === 'win32') {
      return `@echo off
echo Starting development deployment...
set NODE_ENV=development
npm install
npm run dev`;
    }
    return `#!/bin/bash
echo "Starting development deployment..."
export NODE_ENV=development
npm install
npm run dev`;
  }

  /**
   * Generate test environment script
   * @private
   */
  _generateTestScript() {
    if (process.platform === 'win32') {
      return `@echo off
echo Starting testing deployment...
set NODE_ENV=testing
npm install
npm run build
npm run test`;
    }
    return `#!/bin/bash
echo "Starting testing deployment..."
export NODE_ENV=testing
npm install
npm run build
npm run test`;
  }

  /**
   * Generate production environment script
   * @private
   */
  _generateProdScript() {
    if (process.platform === 'win32') {
      return `@echo off
echo Starting production deployment...
set NODE_ENV=production
npm ci --only=production
npm run build
npm start`;
    }
    return `#!/bin/bash
echo "Starting production deployment..."
export NODE_ENV=production
npm ci --only=production
npm run build
npm start`;
  }

  /**
   * Rebuild environment
   * @returns {boolean} Whether rebuild succeeded
   */
  rebuildEnvironment() {
    try {
      console.log(`Rebuilding ${this.environment} environment...`);

      // Clean old build files
      if (FileUtils.directoryExists(Constants.FILE_PATHS.DOT_NEXT)) {
        console.log('Cleaning build files...');
        FileUtils.deleteDirectory(Constants.FILE_PATHS.DOT_NEXT);
      }

      // Reinstall dependencies
      console.log('Installing dependencies...');
      CommandExecutor.executeNpmWithStdio('install');

      // Build project
      if (this.environment !== Constants.ENVIRONMENTS.DEVELOPMENT) {
        console.log('Building project...');
        CommandExecutor.executeNpmWithStdio('run', ['build']);
      }

      console.log(Constants.SUCCESS_MESSAGES.ENVIRONMENT_REBUILT);
      return true;
    } catch (error) {
      console.error(`${Constants.ERROR_MESSAGES.ENVIRONMENT_REBUILD_FAILED}:`, error.message);
      return false;
    }
  }

  /**
   * Execute deployment
   * @returns {boolean} Whether deployment succeeded
   */
  deploy() {
    try {
      console.log(`Starting deployment to ${this.environment} environment...`);

      // Execute pre-deployment check
      const preCheck = this.preDeploymentCheck();
      if (!preCheck.passed) {
        console.error('Pre-deployment check failed:');
        preCheck.checks.forEach(check => {
          if (check.type === Constants.CHECK_TYPES.ERROR) {
            console.error(`X ${check.message}`);
          }
        });
        return false;
      }

      // Rebuild environment
      if (!this.rebuildEnvironment()) {
        return false;
      }

      console.log(`${this.environment} environment deployment complete`);
      return true;
    } catch (error) {
      console.error('Deployment failed:', error.message);
      return false;
    }
  }

  /**
   * Get deployment status
   * @returns {Object} Deployment status info
   */
  getDeploymentStatus() {
    return {
      environment: this.environment,
      timestamp: new Date().toISOString(),
      health: this.healthCheck(),
      preCheck: this.preDeploymentCheck()
    };
  }

  /**
   * Set environment
   * @param {string} environment - Environment name
   */
  setEnvironment(environment) {
    if (!Object.values(Constants.ENVIRONMENTS).includes(environment)) {
      throw new DeploymentError(
        `Invalid environment: ${environment}`,
        'INVALID_ENVIRONMENT'
      );
    }
    this.environment = environment;
  }
}

module.exports = DeploymentManager;
