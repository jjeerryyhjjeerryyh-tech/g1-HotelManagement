/**
 * AppError.js - Custom Exception Class System
 *
 * Defines the application-layer exception class hierarchy
 * Enables unified error handling and logging
 */

/**
 * Base application exception class
 * Extends Error, provides unified error handling interface
 */
class AppError extends Error {
  constructor(message, code = 'APP_ERROR', statusCode = 500, details = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();

    // Preserve stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Convert to log object
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
   * Convert to JSON object
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
 * Config error - thrown when config loading or parsing fails
 */
class ConfigError extends AppError {
  constructor(message, details = {}) {
    super(message, 'CONFIG_ERROR', 500, details);
  }
}

/**
 * Log error - thrown when log writing fails
 */
class LogError extends AppError {
  constructor(message, details = {}) {
    super(message, 'LOG_ERROR', 500, details);
  }
}

/**
 * File error - thrown when file read/write fails
 */
class FileError extends AppError {
  constructor(message, details = {}) {
    super(message, 'FILE_ERROR', 500, details);
  }
}

/**
 * Command execution error - thrown when command execution fails
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
 * Deployment error - thrown when deployment check or process fails
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
 * Dependency error - thrown when dependency check fails
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
 * Validation error - thrown when input validation fails
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
 * Environment error - thrown when environment variable or config is wrong
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
 * Error handling utility functions
 */
const ErrorHandling = {
  /**
   * Check if error is an AppError instance
   */
  isAppError(error) {
    return error instanceof AppError;
  },

  /**
   * Get error message
   */
  getErrorMessage(error) {
    if (this.isAppError(error)) {
      return error.message;
    }
    return error instanceof Error ? error.message : String(error);
  },

  /**
   * Get error code
   */
  getErrorCode(error) {
    if (this.isAppError(error)) {
      return error.code;
    }
    return 'UNKNOWN_ERROR';
  },

  /**
   * Wrap unknown error as AppError
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
