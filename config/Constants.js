/**
 * Constants.js - System Constants Definition
 *
 * Unified management of project constants, eliminates hardcoded strings and magic numbers
 * Improves maintainability and code readability
 */

// Environment constants
const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  TESTING: 'testing',
  PRODUCTION: 'production'
};

// Log level constants
const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

// Log level priority (for log filtering)
const LOG_LEVEL_PRIORITY = {
  [LOG_LEVELS.DEBUG]: 0,
  [LOG_LEVELS.INFO]: 1,
  [LOG_LEVELS.WARN]: 2,
  [LOG_LEVELS.ERROR]: 3
};

// NPM command constants
const NPM_COMMANDS = {
  INSTALL: 'npm install',
  CI_PRODUCTION: 'npm ci --only=production',
  BUILD: 'npm run build',
  START: 'npm start',
  DEV: 'npm run dev',
  TEST: 'npm run test',
  LINT: 'npm run lint'
};

// Deployment command constants
const DEPLOY_COMMANDS = {
  DEV: 'deploy:dev',
  TEST: 'deploy:test',
  PROD: 'deploy:prod'
};

// Deployment script templates
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

// File path constants
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

// Environment config file paths
const ENV_CONFIG_FILES = {
  [ENVIRONMENTS.DEVELOPMENT]: 'config/environments/development.json',
  [ENVIRONMENTS.TESTING]: 'config/environments/testing.json',
  [ENVIRONMENTS.PRODUCTION]: 'config/environments/production.json'
};

// Error message constants
const ERROR_MESSAGES = {
  CONFIG_LOAD_FAILED: 'Config loading failed',
  CONFIG_FILE_NOT_FOUND: 'Config file not found',
  INVALID_CONFIG: 'Invalid config format',
  LOG_DIR_CREATE_FAILED: 'Log directory creation failed',
  LOG_FILE_WRITE_FAILED: 'Log file write failed',
  FILE_READ_FAILED: 'File read failed',
  FILE_WRITE_FAILED: 'File write failed',
  JSON_PARSE_FAILED: 'JSON parse failed',
  COMMAND_EXECUTION_FAILED: 'Command execution failed',
  MISSING_DEPENDENCY: 'Missing dependency',
  DEPENDENCY_CHECK_FAILED: 'Dependency check failed',
  DEPLOYMENT_CHECK_FAILED: 'Deployment check failed',
  PREDEPLOYMENT_CHECK_FAILED: 'Pre-deployment check failed',
  ENVIRONMENT_REBUILD_FAILED: 'Environment rebuild failed',
  MISSING_ENV_VAR: 'Missing environment variable',
  NODE_MODULES_NOT_FOUND: 'node_modules directory not found'
};

// Success message constants
const SUCCESS_MESSAGES = {
  CONFIG_LOADED: 'Config loaded successfully',
  DEPENDENCIES_INSTALLED: 'Dependencies installed successfully',
  DEPENDENCIES_CLEANED: 'Dependencies cleaned successfully',
  LOG_DIR_CREATED: 'Log directory created successfully',
  FILE_WRITTEN: 'File written successfully',
  DEPLOYMENT_SCRIPT_GENERATED: 'Deployment script generated successfully',
  ENVIRONMENT_REBUILT: 'Environment rebuilt successfully',
  PREDEPLOYMENT_CHECK_PASSED: 'Pre-deployment check passed'
};

// Health check status
const HEALTH_CHECK_STATUS = {
  PASS: 'pass',
  FAIL: 'fail'
};

// Dependency check status
const DEPENDENCY_STATUS = {
  COMPLETE: 'complete',
  INCOMPLETE: 'incomplete'
};

// Check type constants
const CHECK_TYPES = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Default config
const DEFAULT_CONFIG = {
  LOG_LEVEL: LOG_LEVELS.INFO,
  ENVIRONMENT: ENVIRONMENTS.DEVELOPMENT,
  LOG_FILE_ENCODING: 'utf8',
  COMMAND_TIMEOUT: 30000,
  HEALTH_CHECK_INTERVAL: 60000
};

// Regex pattern constants
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
