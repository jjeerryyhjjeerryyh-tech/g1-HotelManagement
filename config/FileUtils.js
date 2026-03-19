/**
 * FileUtils.js - 文件操作工具类
 * 
 * 统一管理文件读写操作
 * 消除 JSON.parse(fs.readFileSync()) 的重复模式
 * 提供统一的错误处理和日志记录
 */

const fs = require('fs');
const path = require('path');
const { FileError } = require('./AppError');
const Constants = require('./Constants');

class FileUtils {
  /**
   * 读取 JSON 文件
   * @param {string} filePath - 文件路径
   * @param {string} encoding - 文件编码，默认为 utf8
   * @returns {Object} 解析后的 JSON 对象
   * @throws {FileError} 读取或解析失败时抛出
   */
  static readJSON(filePath, encoding = Constants.DEFAULT_CONFIG.LOG_FILE_ENCODING) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new FileError(
          `${Constants.ERROR_MESSAGES.FILE_READ_FAILED}: 文件不存在`,
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
   * 写入 JSON 文件
   * @param {string} filePath - 文件路径
   * @param {Object} data - 要写入的数据对象
   * @param {number} indent - JSON 缩进空格数，默认为 2
   * @throws {FileError} 写入失败时抛出
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
   * 读取文件
   * @param {string} filePath - 文件路径
   * @param {string} encoding - 文件编码，默认为 utf8
   * @returns {string} 文件内容
   * @throws {FileError} 读取失败时抛出
   */
  static readFile(filePath, encoding = Constants.DEFAULT_CONFIG.LOG_FILE_ENCODING) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new FileError(
          `${Constants.ERROR_MESSAGES.FILE_READ_FAILED}: 文件不存在`,
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
   * 写入文件
   * @param {string} filePath - 文件路径
   * @param {string} content - 文件内容
   * @param {string} encoding - 文件编码，默认为 utf8
   * @throws {FileError} 写入失败时抛出
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
   * 追加内容到文件
   * @param {string} filePath - 文件路径
   * @param {string} content - 要追加的内容
   * @param {string} encoding - 文件编码，默认为 utf8
   * @throws {FileError} 追加失败时抛出
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
   * 确保目录存在，如果不存在则创建
   * @param {string} dirPath - 目录路径
   * @throws {FileError} 创建失败时抛出
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
   * 检查文件是否存在
   * @param {string} filePath - 文件路径
   * @returns {boolean} 文件是否存在
   */
  static fileExists(filePath) {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      return false;
    }
  }

  /**
   * 检查目录是否存在
   * @param {string} dirPath - 目录路径
   * @returns {boolean} 目录是否存在
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
   * 删除文件
   * @param {string} filePath - 文件路径
   * @throws {FileError} 删除失败时抛出
   */
  static deleteFile(filePath) {
    try {
      if (this.fileExists(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      throw new FileError(
        `文件删除失败: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * 删除目录及其所有内容
   * @param {string} dirPath - 目录路径
   * @throws {FileError} 删除失败时抛出
   */
  static deleteDirectory(dirPath) {
    try {
      if (this.directoryExists(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    } catch (error) {
      throw new FileError(
        `目录删除失败: ${dirPath}`,
        { dirPath, error: error.message }
      );
    }
  }

  /**
   * 获取文件大小（字节）
   * @param {string} filePath - 文件路径
   * @returns {number} 文件大小
   * @throws {FileError} 获取失败时抛出
   */
  static getFileSize(filePath) {
    try {
      if (!this.fileExists(filePath)) {
        throw new FileError(
          `文件不存在: ${filePath}`,
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
        `获取文件大小失败: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * 获取文件修改时间
   * @param {string} filePath - 文件路径
   * @returns {Date} 修改时间
   * @throws {FileError} 获取失败时抛出
   */
  static getModifyTime(filePath) {
    try {
      if (!this.fileExists(filePath)) {
        throw new FileError(
          `文件不存在: ${filePath}`,
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
        `获取文件修改时间失败: ${filePath}`,
        { filePath, error: error.message }
      );
    }
  }

  /**
   * 列出目录中的文件
   * @param {string} dirPath - 目录路径
   * @param {boolean} recursive - 是否递归列出
   * @returns {Array} 文件路径数组
   * @throws {FileError} 列出失败时抛出
   */
  static listFiles(dirPath, recursive = false) {
    try {
      if (!this.directoryExists(dirPath)) {
        throw new FileError(
          `目录不存在: ${dirPath}`,
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
        `列出目录文件失败: ${dirPath}`,
        { dirPath, error: error.message }
      );
    }
  }

  /**
   * 读取 package.json
   * @param {string} basePath - 项目基础路径，默认为当前工作目录
   * @returns {Object} package.json 对象
   * @throws {FileError} 读取失败时抛出
   */
  static readPackageJSON(basePath = process.cwd()) {
    const packageJsonPath = path.join(basePath, Constants.FILE_PATHS.PACKAGE_JSON);
    return this.readJSON(packageJsonPath);
  }

  /**
   * 读取 package-lock.json
   * @param {string} basePath - 项目基础路径，默认为当前工作目录
   * @returns {Object|null} package-lock.json 对象，如果文件不存在则返回 null
   * @throws {FileError} 读取失败时抛出
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
