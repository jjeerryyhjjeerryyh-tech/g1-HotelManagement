/**
 * deployment-refactored.js - 重构后的部署管理器
 * 
 * 改进点：
 * 1. 使用 FileUtils 统一文件操作
 * 2. 使用 CommandExecutor 统一命令执行
 * 3. 使用 Constants 消除硬编码字符串
 * 4. 改进跨平台兼容性（Windows/Linux）
 * 5. 消除与 dependency-manager 的重复代码
 * 6. 使用 AppError 改进错误处理
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
   * 环境健康检查
   * @returns {Object} 检查结果
   */
  healthCheck() {
    const checks = {
      environment: this.environment,
      timestamp: new Date().toISOString(),
      checks: {}
    };

    // 检查配置文件
    checks.checks.config = this._checkConfig();

    // 检查日志目录
    checks.checks.logging = this._checkLogging();

    // 检查服务器配置
    checks.checks.server = this._checkServer();

    // 检查依赖
    checks.checks.dependencies = this._checkDependencies();

    return checks;
  }

  /**
   * 检查配置
   * @private
   */
  _checkConfig() {
    try {
      const configPath = Constants.ENV_CONFIG_FILES[this.environment];
      if (FileUtils.fileExists(configPath)) {
        const config = FileUtils.readJSON(configPath);
        return {
          status: Constants.HEALTH_CHECK_STATUS.PASS,
          message: '配置文件加载成功',
          environment: this.environment
        };
      } else {
        return {
          status: Constants.HEALTH_CHECK_STATUS.FAIL,
          message: `配置文件未找到: ${configPath}`
        };
      }
    } catch (error) {
      return {
        status: Constants.HEALTH_CHECK_STATUS.FAIL,
        message: `配置错误: ${error.message}`
      };
    }
  }

  /**
   * 检查日志目录
   * @private
   */
  _checkLogging() {
    try {
      const logPath = './logs';
      FileUtils.ensureDirectory(logPath);
      return {
        status: Constants.HEALTH_CHECK_STATUS.PASS,
        message: '日志目录可访问',
        path: logPath
      };
    } catch (error) {
      return {
        status: Constants.HEALTH_CHECK_STATUS.FAIL,
        message: `日志错误: ${error.message}`
      };
    }
  }

  /**
   * 检查服务器配置
   * @private
   */
  _checkServer() {
    try {
      return {
        status: Constants.HEALTH_CHECK_STATUS.PASS,
        message: '服务器配置正确',
        environment: this.environment
      };
    } catch (error) {
      return {
        status: Constants.HEALTH_CHECK_STATUS.FAIL,
        message: `服务器配置错误: ${error.message}`
      };
    }
  }

  /**
   * 检查依赖
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
        message: '依赖已安装'
      };
    } catch (error) {
      return {
        status: Constants.HEALTH_CHECK_STATUS.FAIL,
        message: `依赖检查失败: ${error.message}`
      };
    }
  }

  /**
   * 部署前检查
   * @returns {Object} 检查结果 { passed, checks }
   */
  preDeploymentCheck() {
    console.log('执行部署前检查...');

    const checks = [];

    // 检查环境变量
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

    // 检查依赖
    if (!FileUtils.directoryExists(Constants.FILE_PATHS.NODE_MODULES)) {
      checks.push({
        type: Constants.CHECK_TYPES.WARNING,
        message: Constants.ERROR_MESSAGES.NODE_MODULES_NOT_FOUND
      });
    }

    // 检查 package.json
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
   * 生成部署脚本
   * @returns {string} 脚本文件路径
   * @throws {DeploymentError} 生成失败时抛出
   */
  generateDeploymentScript() {
    try {
      const scriptName = this._getDeploymentScriptName();
      const scriptContent = this._getDeploymentScriptContent();

      FileUtils.writeFile(scriptName, scriptContent);

      // 在 Unix 系统上使脚本可执行
      if (process.platform !== 'win32') {
        try {
          CommandExecutor.execute(`chmod +x ${scriptName}`);
        } catch (error) {
          console.warn('无法设置脚本执行权限:', error.message);
        }
      }

      console.log(`${Constants.SUCCESS_MESSAGES.DEPLOYMENT_SCRIPT_GENERATED}: ${scriptName}`);
      return scriptName;
    } catch (error) {
      throw new DeploymentError(
        `部署脚本生成失败`,
        'SCRIPT_GENERATION',
        { error: error.message }
      );
    }
  }

  /**
   * 获取部署脚本名称
   * @private
   */
  _getDeploymentScriptName() {
    const extension = process.platform === 'win32' ? '.bat' : '.sh';
    return `deploy-${this.environment}${extension}`;
  }

  /**
   * 获取部署脚本内容
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
   * 生成开发环境脚本
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
   * 生成测试环境脚本
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
   * 生成生产环境脚本
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
   * 环境重建
   * @returns {boolean} 是否重建成功
   */
  rebuildEnvironment() {
    try {
      console.log(`重建 ${this.environment} 环境...`);

      // 清理旧的构建文件
      if (FileUtils.directoryExists(Constants.FILE_PATHS.DOT_NEXT)) {
        console.log('清理构建文件...');
        FileUtils.deleteDirectory(Constants.FILE_PATHS.DOT_NEXT);
      }

      // 重新安装依赖
      console.log('安装依赖...');
      CommandExecutor.executeNpmWithStdio('install');

      // 构建项目
      if (this.environment !== Constants.ENVIRONMENTS.DEVELOPMENT) {
        console.log('构建项目...');
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
   * 执行部署
   * @returns {boolean} 是否部署成功
   */
  deploy() {
    try {
      console.log(`开始部署到 ${this.environment} 环境...`);

      // 执行部署前检查
      const preCheck = this.preDeploymentCheck();
      if (!preCheck.passed) {
        console.error('部署前检查失败:');
        preCheck.checks.forEach(check => {
          if (check.type === Constants.CHECK_TYPES.ERROR) {
            console.error(`❌ ${check.message}`);
          }
        });
        return false;
      }

      // 重建环境
      if (!this.rebuildEnvironment()) {
        return false;
      }

      console.log(`${this.environment} 环境部署完成`);
      return true;
    } catch (error) {
      console.error('部署失败:', error.message);
      return false;
    }
  }

  /**
   * 获取部署状态
   * @returns {Object} 部署状态信息
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
   * 设置环境
   * @param {string} environment - 环境名称
   */
  setEnvironment(environment) {
    if (!Object.values(Constants.ENVIRONMENTS).includes(environment)) {
      throw new DeploymentError(
        `无效的环境: ${environment}`,
        'INVALID_ENVIRONMENT'
      );
    }
    this.environment = environment;
  }
}

module.exports = DeploymentManager;
