/**
 * CommandExecutor.js - Command Execution Utility Class
 *
 * Unified management of command execution logic
 * Eliminates scattered execSync usage and error handling
 * Provides unified logging and error handling
 */

const { execSync, spawnSync } = require('child_process');
const { CommandError } = require('./AppError');
const Constants = require('./Constants');

class CommandExecutor {
  /**
   * Synchronous command execution
   * @param {string} command - Command to execute
   * @param {Object} options - Execution options
   * @param {Object} options.cwd - Working directory
   * @param {boolean} options.stdio - stdin/stdout/stderr settings
   * @param {string} options.encoding - Output encoding
   * @param {number} options.timeout - Timeout in milliseconds
   * @returns {string} Command output
   * @throws {CommandError} Thrown when command execution fails
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
   * Execute command with stdio inheritance (for interactive output)
   * @param {string} command - Command to execute
   * @param {Object} options - Execution options
   * @returns {void}
   * @throws {CommandError} Thrown when command execution fails
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
   * Try to execute command, fallback on failure
   * @param {string} command - Primary command
   * @param {string} fallbackCommand - Fallback command
   * @param {Object} options - Execution options
   * @returns {string} Command output
   */
  static tryExecute(command, fallbackCommand, options = {}) {
    try {
      return this.execute(command, options);
    } catch (error) {
      try {
        console.warn(`Primary command failed, trying fallback: ${fallbackCommand}`);
        return this.execute(fallbackCommand, options);
      } catch (fallbackError) {
        this._throwCommandError(fallbackError, fallbackCommand);
      }
    }
  }

  /**
   * Asynchronous command execution
   * @param {string} command - Command to execute
   * @param {Object} options - Execution options
   * @returns {Promise<string>} Command output
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
          const error = new Error(child.stderr?.toString() || 'Command failed');
          this._throwCommandError(error, command, child.status);
        }

        resolve(child.stdout?.toString() || '');
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Check if command is available
   * @param {string} command - Command name (e.g., 'npm', 'node')
   * @returns {boolean} Whether command is available
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
   * Get command version
   * @param {string} command - Command name
   * @returns {string} Version string
   * @throws {CommandError} Thrown when version retrieval fails
   */
  static getCommandVersion(command) {
    try {
      const versionCommand = `${command} --version`;
      return this.execute(versionCommand).trim();
    } catch (error) {
      throw new CommandError(
        `Failed to get ${command} version`,
        command,
        error.status || 0,
        { reason: 'VERSION_CHECK_FAILED' }
      );
    }
  }

  /**
   * Execute NPM command
   * @param {string} subCommand - Subcommand (e.g., 'install', 'build')
   * @param {Array} args - Command arguments
   * @param {Object} options - Execution options
   * @returns {string} Command output
   * @throws {CommandError} Thrown when command execution fails
   */
  static executeNpm(subCommand, args = [], options = {}) {
    const command = `npm ${subCommand} ${args.join(' ')}`.trim();
    return this.execute(command, options);
  }

  /**
   * Execute NPM command with stdio
   * @param {string} subCommand - Subcommand
   * @param {Array} args - Command arguments
   * @param {Object} options - Execution options
   */
  static executeNpmWithStdio(subCommand, args = [], options = {}) {
    const command = `npm ${subCommand} ${args.join(' ')}`.trim();
    return this.executeWithStdio(command, options);
  }

  /**
   * Internal method: throw command error
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
   * Check if package.json exists
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
   * Execute environment check
   * @returns {Object} Check results
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
