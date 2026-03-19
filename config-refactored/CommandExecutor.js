/**
 * CommandExecutor.js - 命令执行工具类
 * 
 * 统一管理命令执行逻辑
 * 消除 execSync 的重复使用和错误处理散布
 * 提供统一的日志记录和错误处理
 */

const { execSync, spawnSync } = require('child_process');
const { CommandError } = require('./AppError');
const Constants = require('./Constants');

class CommandExecutor {
  /**
   * 同步执行命令
   * @param {string} command - 要执行的命令
   * @param {Object} options - 执行选项
   * @param {Object} options.cwd - 工作目录
   * @param {boolean} options.stdio - 标准输入输出设置
   * @param {string} options.encoding - 输出编码
   * @param {number} options.timeout - 超时时间（毫秒）
   * @returns {string} 命令输出
   * @throws {CommandError} 命令执行失败时抛出
   */
  static execute(command, options = {}) {
    try {
      const defaultOptions = {
        encoding: 'utf8',
        timeout: Constants.DEFAULT_CONFIG.COMMAND_TIMEOUT,
        ...options
      };

      const output = execSync(command, defaultOptions);
      return output.toString();
    } catch (error) {
      this._throwCommandError(error, command);
    }
  }

  /**
   * 执行命令并继承 stdio（用于需要交互式输出的命令）
   * @param {string} command - 要执行的命令
   * @param {Object} options - 执行选项
   * @returns {void}
   * @throws {CommandError} 命令执行失败时抛出
   */
  static executeWithStdio(command, options = {}) {
    try {
      const defaultOptions = {
        stdio: 'inherit',
        timeout: Constants.DEFAULT_CONFIG.COMMAND_TIMEOUT,
        ...options
      };

      execSync(command, defaultOptions);
    } catch (error) {
      this._throwCommandError(error, command);
    }
  }

  /**
   * 尝试执行命令，如果失败则执行备选命令
   * @param {string} command - 主命令
   * @param {string} fallbackCommand - 备选命令
   * @param {Object} options - 执行选项
   * @returns {string} 命令输出
   */
  static tryExecute(command, fallbackCommand, options = {}) {
    try {
      return this.execute(command, options);
    } catch (error) {
      try {
        console.warn(`命令执行失败，尝试备选命令: ${fallbackCommand}`);
        return this.execute(fallbackCommand, options);
      } catch (fallbackError) {
        this._throwCommandError(fallbackError, fallbackCommand);
      }
    }
  }

  /**
   * 异步执行命令
   * @param {string} command - 要执行的命令
   * @param {Object} options - 执行选项
   * @returns {Promise<string>} 命令输出
   */
  static executeAsync(command, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        const defaultOptions = {
          encoding: 'utf8',
          timeout: Constants.DEFAULT_CONFIG.COMMAND_TIMEOUT,
          ...options
        };

        const child = spawnSync(command, { shell: true, ...defaultOptions });

        if (child.error) {
          this._throwCommandError(child.error, command);
        }

        if (child.status !== 0) {
          const error = new Error(child.stderr?.toString() || '命令失败');
          this._throwCommandError(error, command, child.status);
        }

        resolve(child.stdout?.toString() || '');
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 检查命令是否可用
   * @param {string} command - 命令名称（如 'npm', 'node'）
   * @returns {boolean} 命令是否可用
   */
  static isCommandAvailable(command) {
    try {
      const checkCommand = process.platform === 'win32'
        ? `where ${command}`
        : `which ${command}`;
      
      execSync(checkCommand, { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 获取命令版本
   * @param {string} command - 命令名称
   * @returns {string} 版本字符串
   * @throws {CommandError} 获取版本失败时抛出
   */
  static getCommandVersion(command) {
    try {
      const versionCommand = `${command} --version`;
      return this.execute(versionCommand).trim();
    } catch (error) {
      throw new CommandError(
        `获取 ${command} 版本失败`,
        command,
        error.status || 0,
        { reason: 'VERSION_CHECK_FAILED' }
      );
    }
  }

  /**
   * 执行 NPM 命令
   * @param {string} subCommand - 子命令（如 'install', 'build'）
   * @param {Array} args - 命令参数
   * @param {Object} options - 执行选项
   * @returns {string} 命令输出
   * @throws {CommandError} 命令执行失败时抛出
   */
  static executeNpm(subCommand, args = [], options = {}) {
    const command = `npm ${subCommand} ${args.join(' ')}`.trim();
    return this.execute(command, options);
  }

  /**
   * 执行 NPM 命令（带 stdio）
   * @param {string} subCommand - 子命令
   * @param {Array} args - 命令参数
   * @param {Object} options - 执行选项
   */
  static executeNpmWithStdio(subCommand, args = [], options = {}) {
    const command = `npm ${subCommand} ${args.join(' ')}`.trim();
    return this.executeWithStdio(command, options);
  }

  /**
   * 内部方法：抛出命令错误
   * @private
   */
  static _throwCommandError(error, command, exitCode = null) {
    const status = exitCode !== null ? exitCode : (error.status || error.code || 1);
    
    throw new CommandError(
      `${Constants.ERROR_MESSAGES.COMMAND_EXECUTION_FAILED}: ${command}`,
      command,
      status,
      {
        stderr: error.stderr?.toString() || error.message,
        stdout: error.stdout?.toString() || ''
      }
    );
  }

  /**
   * 检查 package.json 是否存在
   * @returns {boolean}
   */
  static hasPackageJSON() {
    try {
      return this.isCommandAvailable('npm') || this.isCommandAvailable('yarn');
    } catch (error) {
      return false;
    }
  }

  /**
   * 执行环境检查
   * @returns {Object} 检查结果
   */
  static checkEnvironment() {
    const results = {
      node: this.getCommandVersion('node'),
      npm: this.getCommandVersion('npm'),
      git: this.isCommandAvailable('git')
    };

    return results;
  }
}

module.exports = CommandExecutor;
