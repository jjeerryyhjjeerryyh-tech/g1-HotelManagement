/**
 * AppError.js - 自定义异常类体系
 * 
 * 定义应用层的异常类层次结构
 * 便于统一的错误处理和日志记录
 */

/**
 * 基础应用异常类
 * 继承自 Error，提供统一的错误处理接口
 */
class AppError extends Error {
  constructor(message, code = 'APP_ERROR', statusCode = 500, details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();

    // 保持堆栈跟踪
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * 转换为日志对象
   */
  toLog() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: this.timestamp,
      stack: this.stack
    };
  }

  /**
   * 转换为 JSON 对象
   */
  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
        details: this.details,
        timestamp: this.timestamp
      }
    };
  }
}

/**
 * 配置错误 - 配置加载、解析失败时抛出
 */
class ConfigError extends AppError {
  constructor(message, details = {}) {
    super(message, 'CONFIG_ERROR', 500, details);
  }
}

/**
 * 日志错误 - 日志写入失败时抛出
 */
class LogError extends AppError {
  constructor(message, details = {}) {
    super(message, 'LOG_ERROR', 500, details);
  }
}

/**
 * 文件错误 - 文件读写失败时抛出
 */
class FileError extends AppError {
  constructor(message, details = {}) {
    super(message, 'FILE_ERROR', 500, details);
  }
}

/**
 * 命令执行错误 - 命令执行失败时抛出
 */
class CommandError extends AppError {
  constructor(message, command = '', exitCode = 0, details = {}) {
    super(
      message,
      'COMMAND_ERROR',
      500,
      { ...details, command, exitCode }
    );
    this.command = command;
    this.exitCode = exitCode;
  }
}

/**
 * 部署错误 - 部署检查或部署过程失败时抛出
 */
class DeploymentError extends AppError {
  constructor(message, checkType = '', details = {}) {
    super(
      message,
      'DEPLOYMENT_ERROR',
      500,
      { ...details, checkType }
    );
    this.checkType = checkType;
  }
}

/**
 * 依赖错误 - 依赖检查失败时抛出
 */
class DependencyError extends AppError {
  constructor(message, missingDeps = [], details = {}) {
    super(
      message,
      'DEPENDENCY_ERROR',
      500,
      { ...details, missingDeps }
    );
    this.missingDeps = missingDeps;
  }
}

/**
 * 验证错误 - 输入验证失败时抛出
 */
class ValidationError extends AppError {
  constructor(message, field = '', details = {}) {
    super(
      message,
      'VALIDATION_ERROR',
      400,
      { ...details, field }
    );
    this.field = field;
  }
}

/**
 * 环境错误 - 环境变量或环境配置错误时抛出
 */
class EnvironmentError extends AppError {
  constructor(message, envVar = '', details = {}) {
    super(
      message,
      'ENVIRONMENT_ERROR',
      500,
      { ...details, envVar }
    );
    this.envVar = envVar;
  }
}

/**
 * 错误处理工具函数
 */
const ErrorHandling = {
  /**
   * 检查错误是否为 AppError 实例
   */
  isAppError(error) {
    return error instanceof AppError;
  },

  /**
   * 获取错误信息
   */
  getErrorMessage(error) {
    if (this.isAppError(error)) {
      return error.message;
    }
    return error instanceof Error ? error.message : String(error);
  },

  /**
   * 获取错误代码
   */
  getErrorCode(error) {
    if (this.isAppError(error)) {
      return error.code;
    }
    return 'UNKNOWN_ERROR';
  },

  /**
   * 包装未知错误为 AppError
   */
  wrapError(error, type = 'APP_ERROR') {
    if (this.isAppError(error)) {
      return error;
    }

    const message = error instanceof Error ? error.message : String(error);
    const details = error instanceof Error ? { originalError: error } : {};

    switch (type) {
      case 'CONFIG_ERROR':
        return new ConfigError(message, details);
      case 'LOG_ERROR':
        return new LogError(message, details);
      case 'FILE_ERROR':
        return new FileError(message, details);
      case 'COMMAND_ERROR':
        return new CommandError(message, '', 0, details);
      case 'DEPLOYMENT_ERROR':
        return new DeploymentError(message, '', details);
      case 'DEPENDENCY_ERROR':
        return new DependencyError(message, [], details);
      default:
        return new AppError(message, 'APP_ERROR', 500, details);
    }
  }
};

module.exports = {
  AppError,
  ConfigError,
  LogError,
  FileError,
  CommandError,
  DeploymentError,
  DependencyError,
  ValidationError,
  EnvironmentError,
  ErrorHandling
};
