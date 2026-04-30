/**
 * FileUtils.js - File Operation Utility Class
 *
 * Unified management of file read/write operations
 * Eliminates duplicate patterns like JSON.parse(fs.readFileSync())
 * Provides unified error handling and logging
 */

const fs = require('fs');
const path = require('path');
const { FileError } = require('./AppError');
const Constants = require('./Constants');

class FileUtils {
  /**
   * Read JSON file
   * @param {string} filePath - File path
   * @param {string} encoding - File encoding, default utf8
   * @returns {Object} Parsed JSON object
   * @throws {FileError} Thrown when read or parse fails
   */
  static readJSON(filePath, encoding = Constants.DEFAULT_CONFIG.LOG_FILE_ENCODING) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new FileError(
          `${Constants.ERROR_MESSAGES.FILE_READ_FAILED}: file does not exist`,
          { filePath, reason: 'FILE_NOT_FOUND' }
        );
      }

      const content = fs.readFileSync(filePath, encoding);

      try {
        return JSON.parse(content);
      } catch (parseError) {
        throw new FileError(
          `${Constants.ERROR_MESSAGES.JSON_PARSE_FAILED}: ${filePath}`,
          { filePath, parseError: parseError.message }
        );
      }
    } catch (error) {
      if (error instanceof FileError) {
        throw error;
      }
      throw new FileError(
        `${Constants.ERROR_MESSAGES.FILE_READ_FAILED}: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * Write JSON file
   * @param {string} filePath - File path
   * @param {Object} data - Data object to write
   * @param {number} indent - JSON indent spaces, default 2
   * @throws {FileError} Thrown when write fails
   */
  static writeJSON(filePath, data, indent = 2) {
    try {
      const directory = path.dirname(filePath);
      this.ensureDirectory(directory);

      const jsonString = JSON.stringify(data, null, indent);
      fs.writeFileSync(filePath, jsonString, Constants.DEFAULT_CONFIG.LOG_FILE_ENCODING);
    } catch (error) {
      throw new FileError(
        `${Constants.ERROR_MESSAGES.FILE_WRITE_FAILED}: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * Read file
   * @param {string} filePath - File path
   * @param {string} encoding - File encoding, default utf8
   * @returns {string} File content
   * @throws {FileError} Thrown when read fails
   */
  static readFile(filePath, encoding = Constants.DEFAULT_CONFIG.LOG_FILE_ENCODING) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new FileError(
          `${Constants.ERROR_MESSAGES.FILE_READ_FAILED}: file does not exist`,
          { filePath, reason: 'FILE_NOT_FOUND' }
        );
      }

      return fs.readFileSync(filePath, encoding);
    } catch (error) {
      if (error instanceof FileError) {
        throw error;
      }
      throw new FileError(
        `${Constants.ERROR_MESSAGES.FILE_READ_FAILED}: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * Write file
   * @param {string} filePath - File path
   * @param {string} content - File content
   * @param {string} encoding - File encoding, default utf8
   * @throws {FileError} Thrown when write fails
   */
  static writeFile(filePath, content, encoding = Constants.DEFAULT_CONFIG.LOG_FILE_ENCODING) {
    try {
      const directory = path.dirname(filePath);
      this.ensureDirectory(directory);

      fs.writeFileSync(filePath, content, encoding);
    } catch (error) {
      throw new FileError(
        `${Constants.ERROR_MESSAGES.FILE_WRITE_FAILED}: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * Append content to file
   * @param {string} filePath - File path
   * @param {string} content - Content to append
   * @param {string} encoding - File encoding, default utf8
   * @throws {FileError} Thrown when append fails
   */
  static appendToFile(filePath, content, encoding = Constants.DEFAULT_CONFIG.LOG_FILE_ENCODING) {
    try {
      const directory = path.dirname(filePath);
      this.ensureDirectory(directory);

      fs.appendFileSync(filePath, content, encoding);
    } catch (error) {
      throw new FileError(
        `${Constants.ERROR_MESSAGES.FILE_WRITE_FAILED}: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * Ensure directory exists, create if not
   * @param {string} dirPath - Directory path
   * @throws {FileError} Thrown when creation fails
   */
  static ensureDirectory(dirPath) {
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    } catch (error) {
      throw new FileError(
        `${Constants.ERROR_MESSAGES.LOG_DIR_CREATE_FAILED}: ${dirPath}`,
        { dirPath, error: error.message }
      );
    }
  }

  /**
   * Check if file exists
   * @param {string} filePath - File path
   * @returns {boolean} Whether file exists
   */
  static fileExists(filePath) {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if directory exists
   * @param {string} dirPath - Directory path
   * @returns {boolean} Whether directory exists
   */
  static directoryExists(dirPath) {
    try {
      const stats = fs.statSync(dirPath);
      return stats.isDirectory();
    } catch (error) {
      return false;
    }
  }

  /**
   * Delete file
   * @param {string} filePath - File path
   * @throws {FileError} Thrown when delete fails
   */
  static deleteFile(filePath) {
    try {
      if (this.fileExists(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      throw new FileError(
        `File deletion failed: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * Delete directory and all its contents
   * @param {string} dirPath - Directory path
   * @throws {FileError} Thrown when delete fails
   */
  static deleteDirectory(dirPath) {
    try {
      if (this.directoryExists(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    } catch (error) {
      throw new FileError(
        `Directory deletion failed: ${dirPath}`,
        { dirPath, error: error.message }
      );
    }
  }

  /**
   * Get file size in bytes
   * @param {string} filePath - File path
   * @returns {number} File size
   * @throws {FileError} Thrown when get fails
   */
  static getFileSize(filePath) {
    try {
      if (!this.fileExists(filePath)) {
        throw new FileError(
          `File does not exist: ${filePath}`,
          { filePath, reason: 'FILE_NOT_FOUND' }
        );
      }

      const stats = fs.statSync(filePath);
      return stats.size;
    } catch (error) {
      if (error instanceof FileError) {
        throw error;
      }
      throw new FileError(
        `Failed to get file size: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * Get file modification time
   * @param {string} filePath - File path
   * @returns {Date} Modification time
   * @throws {FileError} Thrown when get fails
   */
  static getModifyTime(filePath) {
    try {
      if (!this.fileExists(filePath)) {
        throw new FileError(
          `File does not exist: ${filePath}`,
          { filePath, reason: 'FILE_NOT_FOUND' }
        );
      }

      const stats = fs.statSync(filePath);
      return stats.mtime;
    } catch (error) {
      if (error instanceof FileError) {
        throw error;
      }
      throw new FileError(
        `Failed to get file modification time: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * List files in directory
   * @param {string} dirPath - Directory path
   * @param {boolean} recursive - Whether to list recursively
   * @returns {Array} Array of file paths
   * @throws {FileError} Thrown when list fails
   */
  static listFiles(dirPath, recursive = false) {
    try {
      if (!this.directoryExists(dirPath)) {
        throw new FileError(
          `Directory does not exist: ${dirPath}`,
          { dirPath, reason: 'DIRECTORY_NOT_FOUND' }
        );
      }

      const files = [];
      const entries = fs.readdirSync(dirPath);

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry);
        const stats = fs.statSync(fullPath);

        if (stats.isFile()) {
          files.push(fullPath);
        } else if (recursive && stats.isDirectory()) {
          files.push(...this.listFiles(fullPath, recursive));
        }
      }

      return files;
    } catch (error) {
      if (error instanceof FileError) {
        throw error;
      }
      throw new FileError(
        `Failed to list directory files: ${dirPath}`,
        { dirPath, error: error.message }
      );
    }
  }

  /**
   * Read package.json
   * @param {string} basePath - Project base path, default current working directory
   * @returns {Object} package.json object
   * @throws {FileError} Thrown when read fails
   */
  static readPackageJSON(basePath = process.cwd()) {
    const packageJsonPath = path.join(basePath, Constants.FILE_PATHS.PACKAGE_JSON);
    return this.readJSON(packageJsonPath);
  }

  /**
   * Read package-lock.json
   * @param {string} basePath - Project base path, default current working directory
   * @returns {Object|null} package-lock.json object, null if file does not exist
   * @throws {FileError} Thrown when read fails
   */
  static readPackageLock(basePath = process.cwd()) {
    const lockPath = path.join(basePath, Constants.FILE_PATHS.PACKAGE_LOCK);
    if (!this.fileExists(lockPath)) {
      return null;
    }
    return this.readJSON(lockPath);
  }
}

module.exports = FileUtils;
