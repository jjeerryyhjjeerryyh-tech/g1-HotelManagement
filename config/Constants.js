/**
 * Constants.js - 系统常量定义
 * 
 * 统一管理项目中的常量，消除硬编码字符串和魔法数字
 * 便于维护和修改，提高代码可读性
 */

// ============ 环境常量 ============
const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  TESTING: 'testing',
  PRODUCTION: 'production'
};

// ============ 日志级别常量 ============
const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

// 日志级别优先级（用于日志过滤）
const LOG_LEVEL_PRIORITY = {
  [LOG_LEVELS.DEBUG]: 0,
  [LOG_LEVELS.INFO]: 1,
  [LOG_LEVELS.WARN]: 2,
  [LOG_LEVELS.ERROR]: 3
};

// ============ NPM 命令常量 ============
const NPM_COMMANDS = {
  INSTALL: 'npm install',
  CI_PRODUCTION: 'npm ci --only=production',
  BUILD: 'npm run build',
  START: 'npm start',
  DEV: 'npm run dev',
  TEST: 'npm run test',
  LINT: 'npm run lint'
};

// ============ 部署命令常量 ============
const DEPLOY_COMMANDS = {
  DEV: 'deploy:dev',
  TEST: 'deploy:test',
  PROD: 'deploy:prod'
};

// ============ 部署脚本模板 ============
const DEPLOYMENT_SCRIPTS = {
  DEVELOPMENT: `#!/bin/bash
echo "Starting development deployment..."
export NODE_ENV=development
npm install
npm run dev`,
  
  TESTING: `#!/bin/bash
echo "Starting testing deployment..."
export NODE_ENV=testing
npm install
npm run build
npm run test`,
  
  PRODUCTION: `#!/bin/bash
echo "Starting production deployment..."
export NODE_ENV=production
npm ci --only=production
npm run build
npm start`
};

// ============ 文件路径常量 ============
const FILE_PATHS = {
  PACKAGE_JSON: 'package.json',
  PACKAGE_LOCK: 'package-lock.json',
  NODE_MODULES: 'node_modules',
  ENV_FILE: '.env',
  CONFIG_DIR: 'config',
  ENVIRONMENTS_DIR: 'config/environments',
  LOGS_DIR: 'logs',
  DOT_NEXT: '.next',
  DEPENDENCY_REPORT: 'dependency-report.json'
};

// ============ 环境配置文件路径 ============
const ENV_CONFIG_FILES = {
  [ENVIRONMENTS.DEVELOPMENT]: 'config/environments/development.json',
  [ENVIRONMENTS.TESTING]: 'config/environments/testing.json',
  [ENVIRONMENTS.PRODUCTION]: 'config/environments/production.json'
};

// ============ 错误消息常量 ============
const ERROR_MESSAGES = {
  CONFIG_LOAD_FAILED: '配置加载失败',
  CONFIG_FILE_NOT_FOUND: '配置文件未找到',
  INVALID_CONFIG: '无效的配置格式',
  LOG_DIR_CREATE_FAILED: '日志目录创建失败',
  LOG_FILE_WRITE_FAILED: '日志文件写入失败',
  FILE_READ_FAILED: '文件读取失败',
  FILE_WRITE_FAILED: '文件写入失败',
  JSON_PARSE_FAILED: 'JSON 解析失败',
  COMMAND_EXECUTION_FAILED: '命令执行失败',
  MISSING_DEPENDENCY: '缺失依赖',
  DEPENDENCY_CHECK_FAILED: '依赖检查失败',
  DEPLOYMENT_CHECK_FAILED: '部署检查失败',
  PREDEPLOYMENT_CHECK_FAILED: '部署前检查失败',
  ENVIRONMENT_REBUILD_FAILED: '环境重建失败',
  MISSING_ENV_VAR: '缺失环境变量',
  NODE_MODULES_NOT_FOUND: 'node_modules 目录未找到'
};

// ============ 成功消息常量 ============
const SUCCESS_MESSAGES = {
  CONFIG_LOADED: '配置加载成功',
  DEPENDENCIES_INSTALLED: '依赖安装成功',
  DEPENDENCIES_CLEANED: '依赖清理成功',
  LOG_DIR_CREATED: '日志目录创建成功',
  FILE_WRITTEN: '文件写入成功',
  DEPLOYMENT_SCRIPT_GENERATED: '部署脚本生成成功',
  ENVIRONMENT_REBUILT: '环境重建成功',
  PREDEPLOYMENT_CHECK_PASSED: '部署前检查通过'
};

// ============ 健康检查状态 ============
const HEALTH_CHECK_STATUS = {
  PASS: 'pass',
  FAIL: 'fail'
};

// ============ 依赖检查状态 ============
const DEPENDENCY_STATUS = {
  COMPLETE: 'complete',
  INCOMPLETE: 'incomplete'
};

// ============ 检查类型常量 ============
const CHECK_TYPES = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// ============ 默认配置 ============
const DEFAULT_CONFIG = {
  LOG_LEVEL: LOG_LEVELS.INFO,
  ENVIRONMENT: ENVIRONMENTS.DEVELOPMENT,
  LOG_FILE_ENCODING: 'utf8',
  COMMAND_TIMEOUT: 30000,
  HEALTH_CHECK_INTERVAL: 60000
};

// ============ 正则表达式常量 ============
const REGEX_PATTERNS = {
  ENV_VAR_PATTERN: /\$\{([^}]+)\}/g,
  DEPLOY_SCRIPT_EXTENSION: /\.sh$/
};

module.exports = {
  ENVIRONMENTS,
  LOG_LEVELS,
  LOG_LEVEL_PRIORITY,
  NPM_COMMANDS,
  DEPLOY_COMMANDS,
  DEPLOYMENT_SCRIPTS,
  FILE_PATHS,
  ENV_CONFIG_FILES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  HEALTH_CHECK_STATUS,
  DEPENDENCY_STATUS,
  CHECK_TYPES,
  DEFAULT_CONFIG,
  REGEX_PATTERNS
};
