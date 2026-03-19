/**
 * logger-refactored.js - 重构后的日志系统
 * 
 * 改进点：
 * 1. 使用 Constants 消除硬编码日志级别
 * 2. 使用 FileUtils 统一文件操作
 * 3. 更好的错误处理使用 AppError
 * 4. 支持日志元数据和格式化
 * 5. 性能优化建议（可选使用缓冲或流）
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
   * 从配置中加载日志配置
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
   * 确保日志目录存在
   * @private
   */
  _ensureLogDirectory() {
    try {
      if (this.logConfig.file && this.logConfig.path) {
        FileUtils.ensureDirectory(this._getLogDirectory());
      }
    } catch (error) {
      console.error('日志目录创建失败:', error.message);
    }
  }

  /**
   * 获取日志目录
   * @private
   */
  _getLogDirectory() {
    return require('path').dirname(this.logConfig.path);
  }

  /**
   * 格式化日志消息
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
   * 写入日志到文件
   * @private
   */
  _writeToFile(formattedMessage) {
    if (!this.logConfig.file || !this.logConfig.path) {
      return;
    }

    try {
      FileUtils.appendToFile(this.logConfig.path, formattedMessage + '\n');
    } catch (error) {
      console.error('写入日志文件失败:', error.message);
    }
  }

  /**
   * 写入日志到控制台
   * @private
   */
  _writeToConsole(formattedMessage, level) {
    if (!this.logConfig.console) {
      return;
    }

    // 根据日志级别使用不同的输出方法
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
   * 检查是否应该记录该级别的日志
   * @private
   */
  _shouldLog(level) {
    const currentLevelIndex = Constants.LOG_LEVEL_PRIORITY[this.logConfig.level] ?? 1;
    const messageLevelIndex = Constants.LOG_LEVEL_PRIORITY[level] ?? 1;
    return messageLevelIndex >= currentLevelIndex;
  }

  /**
   * 内部日志方法
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
   * 调试日志
   */
  debug(message, meta = {}) {
    this._log(Constants.LOG_LEVELS.DEBUG, message, meta);
  }

  /**
   * 信息日志
   */
  info(message, meta = {}) {
    this._log(Constants.LOG_LEVELS.INFO, message, meta);
  }

  /**
   * 警告日志
   */
  warn(message, meta = {}) {
    this._log(Constants.LOG_LEVELS.WARN, message, meta);
  }

  /**
   * 错误日志
   */
  error(message, meta = {}) {
    this._log(Constants.LOG_LEVELS.ERROR, message, meta);
  }

  /**
   * 记录异常
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

    this.error('发生异常', errorInfo);
  }

  /**
   * 获取当前日志配置
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
   * 设置日志级别
   */
  setLevel(level) {
    if (!Constants.LOG_LEVELS[level.toUpperCase()]) {
      this.warn(`未知的日志级别: ${level}`);
      return;
    }
    this.logConfig.level = level;
  }

  /**
   * 清空日志文件
   */
  clearLogFile() {
    try {
      if (this.logConfig.file && this.logConfig.path) {
        FileUtils.deleteFile(this.logConfig.path);
        this.info('日志文件已清空');
      }
    } catch (error) {
      this.error('清空日志文件失败', { error: error.message });
    }
  }

  /**
   * 获取日志文件大小
   */
  getLogFileSize() {
    try {
      if (this.logConfig.file && this.logConfig.path) {
        return FileUtils.getFileSize(this.logConfig.path);
      }
      return 0;
    } catch (error) {
      this.error('获取日志文件大小失败', { error: error.message });
      return 0;
    }
  }

  /**
   * 轮转日志文件（当文件过大时）
   */
  rotateLogFile(maxSize = 10 * 1024 * 1024) { // 默认 10MB
    try {
      if (!this.logConfig.file || !this.logConfig.path) {
        return;
      }

      const size = this.getLogFileSize();
      if (size > maxSize) {
        const timestamp = new Date().getTime();
        const backupPath = `${this.logConfig.path}.${timestamp}`;
        
        // 重命名当前日志文件
        require('fs').renameSync(this.logConfig.path, backupPath);
        this.info(`日志文件已轮转至: ${backupPath}`);
      }
    } catch (error) {
      this.error('轮转日志文件失败', { error: error.message });
    }
  }
}

// 导出单例
module.exports = new Logger();
