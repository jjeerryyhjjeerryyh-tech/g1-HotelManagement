/**
 * logger-refactored.js - Refactored Logging System
 *
 * Improvements:
 * 1. Uses Constants to eliminate hardcoded log levels
 * 2. Uses FileUtils for unified file operations
 * 3. Better error handling using AppError
 * 4. Supports log metadata and formatting
 * 5. Performance optimization suggestions (optional buffering or streaming)
 */

const FileUtils = require('./FileUtils');
const { LogError } = require('./AppError');
const Constants = require('./Constants');

class Logger {
  constructor() {
    this.logConfig = this._loadLogConfig();
    this._ensureLogDirectory();
  }

  /**
   * Load log config from settings
   * @private
   */
  _loadLogConfig() {
    const defaultConfig = {
      level: Constants.LOG_LEVELS.INFO,
      console: true,
      file: true,
      path: `./logs/${process.env.NODE_ENV || 'development'}.log`
    };

    return defaultConfig;
  }

  /**
   * Ensure log directory exists
   * @private
   */
  _ensureLogDirectory() {
    try {
      if (this.logConfig.file && this.logConfig.path) {
        FileUtils.ensureDirectory(this._getLogDirectory());
      }
    } catch (error) {
      console.error('Failed to create log directory:', error.message);
    }
  }

  /**
   * Get log directory
   * @private
   */
  _getLogDirectory() {
    return require('path').dirname(this.logConfig.path);
  }

  /**
   * Format log message
   * @private
   */
  _formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length > 0
      ? ` | ${JSON.stringify(meta)}`
      : '';

    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }

  /**
   * Write log to file
   * @private
   */
  _writeToFile(formattedMessage) {
    if (!this.logConfig.file || !this.logConfig.path) {
      return;
    }

    try {
      FileUtils.appendToFile(this.logConfig.path, formattedMessage + '\n');
    } catch (error) {
      console.error('Failed to write log file:', error.message);
    }
  }

  /**
   * Write log to console
   * @private
   */
  _writeToConsole(formattedMessage, level) {
    if (!this.logConfig.console) {
      return;
    }

    // Use different output methods based on log level
    switch (level) {
      case Constants.LOG_LEVELS.ERROR:
        console.error(formattedMessage);
        break;
      case Constants.LOG_LEVELS.WARN:
        console.warn(formattedMessage);
        break;
      case Constants.LOG_LEVELS.INFO:
        console.info(formattedMessage);
        break;
      case Constants.LOG_LEVELS.DEBUG:
        console.log(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
  }

  /**
   * Check if this level of log should be recorded
   * @private
   */
  _shouldLog(level) {
    const currentLevelIndex = Constants.LOG_LEVEL_PRIORITY[this.logConfig.level] ?? 1;
    const messageLevelIndex = Constants.LOG_LEVEL_PRIORITY[level] ?? 1;
    return messageLevelIndex >= currentLevelIndex;
  }

  /**
   * Internal log method
   * @private
   */
  _log(level, message, meta = {}) {
    if (!this._shouldLog(level)) {
      return;
    }

    const formattedMessage = this._formatMessage(level, message, meta);

    this._writeToConsole(formattedMessage, level);
    this._writeToFile(formattedMessage);
  }

  /**
   * Debug log
   */
  debug(message, meta = {}) {
    this._log(Constants.LOG_LEVELS.DEBUG, message, meta);
  }

  /**
   * Info log
   */
  info(message, meta = {}) {
    this._log(Constants.LOG_LEVELS.INFO, message, meta);
  }

  /**
   * Warning log
   */
  warn(message, meta = {}) {
    this._log(Constants.LOG_LEVELS.WARN, message, meta);
  }

  /**
   * Error log
   */
  error(message, meta = {}) {
    this._log(Constants.LOG_LEVELS.ERROR, message, meta);
  }

  /**
   * Log exception
   */
  logError(error, context = {}) {
    const errorInfo = {
      name: error.name || 'Error',
      message: error.message,
      ...context
    };

    if (error.stack) {
      errorInfo.stack = error.stack;
    }

    this.error('Exception occurred', errorInfo);
  }

  /**
   * Get current log config
   */
  getConfig() {
    return {
      level: this.logConfig.level,
      console: this.logConfig.console,
      file: this.logConfig.file,
      path: this.logConfig.path
    };
  }

  /**
   * Set log level
   */
  setLevel(level) {
    if (!Constants.LOG_LEVELS[level.toUpperCase()]) {
      this.warn(`Unknown log level: ${level}`);
      return;
    }
    this.logConfig.level = level;
  }

  /**
   * Clear log file
   */
  clearLogFile() {
    try {
      if (this.logConfig.file && this.logConfig.path) {
        FileUtils.deleteFile(this.logConfig.path);
        this.info('Log file cleared');
      }
    } catch (error) {
      this.error('Failed to clear log file', { error: error.message });
    }
  }

  /**
   * Get log file size
   */
  getLogFileSize() {
    try {
      if (this.logConfig.file && this.logConfig.path) {
        return FileUtils.getFileSize(this.logConfig.path);
      }
      return 0;
    } catch (error) {
      this.error('Failed to get log file size', { error: error.message });
      return 0;
    }
  }

  /**
   * Rotate log file (when file is too large)
   */
  rotateLogFile(maxSize = 10 * 1024 * 1024) { // Default 10MB
    try {
      if (!this.logConfig.file || !this.logConfig.path) {
        return;
      }

      const size = this.getLogFileSize();
      if (size > maxSize) {
        const timestamp = new Date().getTime();
        const backupPath = `${this.logConfig.path}.${timestamp}`;

        // Rename current log file
        require('fs').renameSync(this.logConfig.path, backupPath);
        this.info(`Log file rotated to: ${backupPath}`);
      }
    } catch (error) {
      this.error('Failed to rotate log file', { error: error.message });
    }
  }
}

// Export singleton
module.exports = new Logger();
