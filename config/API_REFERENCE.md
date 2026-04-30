# API Quick Reference

**Purpose**: Query all API usage, parameters, and examples
**When**: Look up when encountering problems
**Format**: Organized by module for quick lookup

---

## Navigation

- [Constants](#constants) - Constant definitions
- [FileUtils](#fileutils) - File operations
- [CommandExecutor](#commandexecutor) - Command execution
- [AppError](#apperror) - Exception handling
- [Logger](#logger) - Logging system
- [DependencyManager](#dependencymanager) - Dependency management
- [Deployment](#deployment) - Deployment management
- [Scripts](#scripts) - CLI interface

---

## Constants

**Purpose**: Centralized definition of all constants
**Import**: `const Constants = require('./config/Constants');`

### ENVIRONMENTS - Environment Types

```javascript
Constants.ENVIRONMENTS.DEVELOPMENT   // 'development'
Constants.ENVIRONMENTS.TESTING       // 'testing'
Constants.ENVIRONMENTS.PRODUCTION    // 'production'

// Usage example
if (process.env.NODE_ENV === Constants.ENVIRONMENTS.PRODUCTION) {
  // Production environment special handling
}
```

### LOG_LEVELS - Log Levels

```javascript
Constants.LOG_LEVELS.DEBUG    // 'debug'
Constants.LOG_LEVELS.INFO     // 'info'
Constants.LOG_LEVELS.WARN     // 'warn'
Constants.LOG_LEVELS.ERROR    // 'error'

// Usage example
logger.log(Constants.LOG_LEVELS.INFO, 'message');
```

### NPM_COMMANDS - NPM Commands

```javascript
Constants.NPM_COMMANDS.INSTALL   // 'npm install'
Constants.NPM_COMMANDS.BUILD     // 'npm run build'
Constants.NPM_COMMANDS.START     // 'npm start'
Constants.NPM_COMMANDS.DEV       // 'npm run dev'
Constants.NPM_COMMANDS.TEST      // 'npm test'

// Usage example
CommandExecutor.execute(Constants.NPM_COMMANDS.BUILD);
```

### Other Constants

```javascript
// File paths
Constants.FILE_PATHS.PACKAGE_JSON     // 'package.json'
Constants.FILE_PATHS.PACKAGE_LOCK     // 'package-lock.json'
Constants.FILE_PATHS.LOG_DIR          // './logs'

// Error messages
Constants.ERROR_MESSAGES.CONFIG_LOAD_FAILED
Constants.ERROR_MESSAGES.FILE_NOT_FOUND
// ... more

// Success messages
Constants.SUCCESS_MESSAGES.CONFIG_LOADED
Constants.SUCCESS_MESSAGES.DEPLOYMENT_SUCCESS
// ... more
```

---

## FileUtils

**Purpose**: Unified file operations
**Import**: `const FileUtils = require('./config/FileUtils');`
**Static methods**: All methods are static, call directly

### readJSON(filePath)

Read and parse JSON file

```javascript
// Basic usage
const data = FileUtils.readJSON('config.json');
console.log(data.database.url);

// Handle exceptions
try {
  const data = FileUtils.readJSON('config.json');
} catch (error) {
  console.error('Read failed:', error.message);
  // error is FileError type
}

// Parameters
// filePath (string, required) - File path
//   - Relative: './config.json'
//   - Absolute: '/path/to/config.json'

// Returns
// Object - Parsed JSON object

// Exceptions
// FileError - File not found or format error
```

### writeJSON(filePath, data)

Write data to JSON file

```javascript
// Basic usage
const data = { name: 'Hotel', rooms: 100 };
FileUtils.writeJSON('hotel.json', data);

// Handle exceptions
try {
  FileUtils.writeJSON('hotel.json', data);
} catch (error) {
  console.error('Write failed:', error.message);
}

// Parameters
// filePath (string, required) - File path
// data (Object, required) - Data to write

// Returns
// undefined

// Exceptions
// FileError - Permission denied or other write errors
```

### readFile(filePath)

Read text file

```javascript
// Basic usage
const content = FileUtils.readFile('README.md');
console.log(content);

// Parameters
// filePath (string, required) - File path

// Returns
// string - File content

// Exceptions
// FileError - File not found or no read permission
```

### writeFile(filePath, content)

Write text file

```javascript
// Basic usage
FileUtils.writeFile('output.txt', 'Hello World');

// Parameters
// filePath (string, required) - File path
// content (string, required) - File content

// Returns
// undefined
```

### appendToFile(filePath, content)

Append content to file

```javascript
// Basic usage
FileUtils.appendToFile('log.txt', 'New log line\n');

// Parameters
// filePath (string, required) - File path
// content (string, required) - Content to append

// Returns
// undefined
```

### fileExists(filePath)

Check if file exists

```javascript
// Basic usage
if (FileUtils.fileExists('config.json')) {
  console.log('Config file exists');
}

// Parameters
// filePath (string, required) - File path

// Returns
// boolean - true exists, false not exists
```

### getFileSize(filePath)

Get file size

```javascript
// Basic usage
const size = FileUtils.getFileSize('large-file.zip');
console.log(`File size: ${size} bytes`);

// Parameters
// filePath (string, required) - File path

// Returns
// number - File size in bytes

// Exceptions
// FileError - File not found
```

### ensureDirectory(dirPath)

Ensure directory exists, create if not

```javascript
// Basic usage
FileUtils.ensureDirectory('./logs');
FileUtils.ensureDirectory('./uploads/images');

// Parameters
// dirPath (string, required) - Directory path

// Returns
// undefined

// Exceptions
// FileError - Creation failed
```

### directoryExists(dirPath)

Check if directory exists

```javascript
// Basic usage
if (FileUtils.directoryExists('./logs')) {
  console.log('Log directory exists');
}

// Parameters
// dirPath (string, required) - Directory path

// Returns
// boolean - true exists, false not exists
```

### listFiles(dirPath)

List all files in directory

```javascript
// Basic usage
const files = FileUtils.listFiles('./src');
console.log('Source files:', files);
// Output: ['index.js', 'app.js', 'server.js']

// Parameters
// dirPath (string, required) - Directory path

// Returns
// string[] - Array of file names

// Exceptions
// FileError - Directory not found
```

### readPackageJSON(basePath)

Read package.json file

```javascript
// Basic usage
const pkg = FileUtils.readPackageJSON();  // Read current directory
const pkg = FileUtils.readPackageJSON('/path/to/project');

// Parameters
// basePath (string, optional) - Project directory, default current directory

// Returns
// Object - package.json content

// Exceptions
// FileError - File not found or format error
```

---

## CommandExecutor

**Purpose**: Unified command execution
**Import**: `const CommandExecutor = require('./config/CommandExecutor');`
**Static methods**: All methods are static

### execute(command, options)

Execute arbitrary system command

```javascript
// Basic usage
CommandExecutor.execute('npm install');
CommandExecutor.execute('git status');
CommandExecutor.execute('npm run build');

// With options
CommandExecutor.execute('npm install', {
  stdio: 'inherit',  // Show stdout
  timeout: 30000     // Timeout 30 seconds
});

// Parameters
// command (string, required) - Command to execute
// options (Object, optional) - Execution options
//   - stdio: 'inherit' | 'pipe' | 'ignore'
//   - timeout: milliseconds
//   - cwd: working directory

// Returns
// string - Command output

// Exceptions
// CommandError - Command execution failed
```

### executeNpm(subCommand, args)

Convenient method for NPM commands

```javascript
// Basic usage
CommandExecutor.executeNpm('install');                    // npm install
CommandExecutor.executeNpm('install', ['express']);       // npm install express
CommandExecutor.executeNpm('run', ['build']);             // npm run build
CommandExecutor.executeNpm('run', ['dev']);               // npm run dev

// Parameters
// subCommand (string, required) - NPM subcommand
// args (string[], optional) - Argument array

// Returns
// string - Command output

// Exceptions
// CommandError - Command execution failed
```

### isCommandAvailable(command)

Check if command is available

```javascript
// Basic usage
if (CommandExecutor.isCommandAvailable('git')) {
  console.log('Git is installed');
} else {
  console.log('Git not installed');
}

// Parameters
// command (string, required) - Command name

// Returns
// boolean - true available, false not available
```

### getCommandVersion(command)

Get command version

```javascript
// Basic usage
const version = CommandExecutor.getCommandVersion('node');
console.log('Node.js version:', version);  // Output: v16.13.0

const npmVersion = CommandExecutor.getCommandVersion('npm');

// Parameters
// command (string, required) - Command name

// Returns
// string - Version number

// Exceptions
// CommandError - Command not found or version unavailable
```

### executeAsync(command, options)

Asynchronous command execution

```javascript
// Basic usage
try {
  const result = await CommandExecutor.executeAsync('npm install');
  console.log('Installation complete');
} catch (error) {
  console.error('Installation failed:', error.message);
}

// Parameters
// command (string, required) - Command to execute
// options (Object, optional) - Execution options

// Returns
// Promise<string> - Command output

// Exceptions
// CommandError - Command execution failed
```

---

## AppError

**Purpose**: Unified exception handling
**Import**: `const { ConfigError, FileError, CommandError } = require('./config/AppError');`

### Exception Types

```javascript
// Base exception
AppError                 // Base class for all exceptions

// Specific exception types
ConfigError              // Config related
FileError                // File operation
CommandError             // Command execution
LogError                 // Logging related
DeploymentError           // Deployment related
DependencyError           // Dependency related
ValidationError           // Validation
EnvironmentError          // Environment related
```

### Throwing Exceptions

```javascript
// Basic usage
throw new FileError('Config file not found', {
  filePath: 'config.json',
  reason: 'FILE_NOT_FOUND'
});

throw new ConfigError('Config format error', {
  field: 'database.url',
  expected: 'string',
  received: 'undefined'
});

// Parameters
// message (string, required) - Error message
// context (Object, optional) - Error context

// Exception properties
error.message       // Error message
error.type          // Exception type name
error.context       // Error context
error.timestamp     // Occurrence time
```

### Catching Exceptions

```javascript
try {
  const config = FileUtils.readJSON('config.json');
} catch (error) {
  if (error instanceof FileError) {
    console.error('File error:', error.message);
  } else if (error instanceof ConfigError) {
    console.error('Config error:', error.message);
  } else {
    console.error('Unknown error:', error.message);
  }

  // Log to file
  console.log('Full info:', error.toLog());
  console.log('JSON format:', error.toJSON());
}
```

### toLog() Method

Return string suitable for logging

```javascript
try {
  // ...
} catch (error) {
  // Output formatted log
  logger.error(error.toLog());
  // Output example:
  // [FileError] Config file not found
  // Context: { filePath: 'config.json', reason: 'FILE_NOT_FOUND' }
  // Stack: Error: ...
}
```

---

## Logger

**Purpose**: Logging
**Import**: `const logger = require('./config/logger-refactored');`

### info(message)

Log info level

```javascript
// Basic usage
logger.info('Application started');
logger.info('User logged in');

// Output
// [INFO] Application started
// [INFO] User logged in
```

### warn(message)

Log warning level

```javascript
// Basic usage
logger.warn('Disk space low');
logger.warn('Memory usage high');

// Output
// [WARN] Disk space low
```

### error(message)

Log error level

```javascript
// Basic usage
logger.error('Database connection failed');
logger.error('Redis connection failed');

// Output
// [ERROR] Database connection failed
```

### debug(message)

Log debug level

```javascript
// Basic usage (only shown in dev environment)
logger.debug('Entering getUserById function');
logger.debug('Fetching user data:', userData);

// Output (dev environment)
// [DEBUG] Entering getUserById function
// [DEBUG] Fetching user data: { id: 1, name: 'John' }
```

### logError(error, context)

Log exception info

```javascript
// Basic usage
try {
  const config = FileUtils.readJSON('config.json');
} catch (error) {
  logger.logError(error, {
    context: 'loading configuration',
    userId: 'user123',
    timestamp: new Date()
  });
}

// Output
// [ERROR] FileError: Config file not found
// Context: { context: 'loading configuration', userId: 'user123' }
// Stack: Error: ...
```

### getLogPath()

Get log file path

```javascript
// Basic usage
const logPath = logger.getLogPath();
console.log('Log file:', logPath);
// Output: /path/to/logs/development.log
```

---

## DependencyManager

**Purpose**: Dependency management
**Create**: `const manager = new (require('./config/dependency-manager-refactored'))();`

### checkDependencies()

Check if dependencies are complete

```javascript
// Basic usage
const status = manager.checkDependencies();
console.log(status);
// Output:
// {
//   status: 'complete' | 'incomplete',
//   total: 45,
//   installed: 45,
//   missing: []
// }

// Handle missing dependencies
if (status.status === 'incomplete') {
  console.log('Missing dependencies:', status.missing);
  manager.installDependencies();
}

// Returns
// Object containing:
//   - status: 'complete' or 'incomplete'
//   - total: total dependency count
//   - installed: installed count
//   - missing: missing dependency array
```

### installDependencies()

Install all dependencies

```javascript
// Basic usage
manager.installDependencies();
console.log('Dependencies installed');

// Returns
// undefined

// Exceptions
// DependencyError - Installation failed
```

### auditDependencies()

Check security vulnerabilities

```javascript
// Basic usage
const result = manager.auditDependencies();
console.log('Audit result:', result);
// Output:
// {
//   vulnerabilities: 5,
//   severity: 'moderate'
// }

// Returns
// Object containing vulnerability statistics
```

### getDependencyInfo(packageName)

Get dependency info

```javascript
// Basic usage
const info = manager.getDependencyInfo('express');
console.log('Express version:', info.version);
console.log('Express description:', info.description);
// Output:
// {
//   version: '4.17.1',
//   description: 'Fast, unopinionated web framework',
//   dependencies: 50
// }

// Parameters
// packageName (string, required) - Package name

// Returns
// Object - Package info

// Exceptions
// DependencyError - Package not found
```

---

## Deployment

**Purpose**: Deployment management
**Create**: `const deployment = new (require('./config/deployment-refactored'))();`

### checkAll()

Execute all pre-deployment checks

```javascript
// Basic usage
deployment.checkAll();
// Output:
// ✅ Config check passed
// ✅ Logging system normal
// ✅ Dependencies installed
// ✅ Server connection normal

// Returns
// undefined

// Exceptions
// DeploymentError - Some check failed
```

### setEnvironment(env)

Set deployment environment

```javascript
// Basic usage
deployment.setEnvironment('production');
deployment.setEnvironment('testing');

// Parameters
// env (string, required) - Environment name
//   - 'development'
//   - 'testing'
//   - 'production'

// Returns
// undefined

// Exceptions
// EnvironmentError - Invalid environment
```

### deploy()

Execute deployment

```javascript
// Basic usage
deployment.setEnvironment('production');
deployment.deploy();
console.log('Deployment complete');

// Returns
// undefined

// Exceptions
// DeploymentError - Deployment failed
```

### getDeploymentStatus()

Get deployment status

```javascript
// Basic usage
const status = deployment.getDeploymentStatus();
console.log('Deployment status:', status);
// Output:
// {
//   status: 'success' | 'failed' | 'pending',
//   environment: 'production',
//   timestamp: 2026-03-18T10:30:00Z,
//   message: 'Deployment successful'
// }

// Returns
// Object containing deployment status
```

---

## Scripts

**Purpose**: CLI interface
**Execute**: `node scripts-refactored.js <command>`

### Available Commands

```bash
# View all commands
node scripts-refactored.js help

# Config related
node scripts-refactored.js config:check    # Check config
node scripts-refactored.js config:list     # List config

# System checks
node scripts-refactored.js health:check    # Health check

# Dependency related
node scripts-refactored.js dep:install     # Install dependencies
node scripts-refactored.js dep:prod         # Install production dependencies
node scripts-refactored.js dep:audit       # Security audit
node scripts-refactored.js dep:list         # List dependencies

# Deployment related
node scripts-refactored.js deploy:dev       # Deploy to dev
node scripts-refactored.js deploy:test      # Deploy to test
node scripts-refactored.js deploy:prod      # Deploy to production
node scripts-refactored.js deploy:status    # View deployment status

# Log related
node scripts-refactored.js log:clear       # Clear logs
node scripts-refactored.js log:rotate       # Rotate logs
```

### Usage Examples

```bash
# Quick start in dev environment
node scripts-refactored.js config:check
node scripts-refactored.js dep:install
node scripts-refactored.js deploy:dev

# Production deployment
node scripts-refactored.js config:check
node scripts-refactored.js health:check
node scripts-refactored.js dep:audit
node scripts-refactored.js deploy:prod
node scripts-refactored.js deploy:status

# Troubleshooting
node scripts-refactored.js health:check
node scripts-refactored.js log:list
tail -f logs/application.log
```

---

## Search by Scenario

### I want to read/write files

```javascript
const FileUtils = require('./config/FileUtils');

// Read JSON
const data = FileUtils.readJSON('config.json');

// Write JSON
FileUtils.writeJSON('output.json', data);

// Check file
FileUtils.fileExists('file.txt');

// More methods: FileUtils.readFile, FileUtils.writeFile, FileUtils.appendToFile
```

**See full API**: [FileUtils](#fileutils)

---

### I want to execute commands

```javascript
const CommandExecutor = require('./config/CommandExecutor');

// Execute NPM
CommandExecutor.executeNpm('install');

// Execute arbitrary command
CommandExecutor.execute('npm run build');

// Check command
CommandExecutor.isCommandAvailable('git');

// Get version
CommandExecutor.getCommandVersion('node');
```

**See full API**: [CommandExecutor](#commandexecutor)

---

### I want to log messages

```javascript
const logger = require('./config/logger-refactored');

logger.info('info');
logger.warn('warning');
logger.error('error');
logger.debug('debug');

logger.logError(error, { context: '...' });
```

**See full API**: [Logger](#logger)

---

### I want to handle exceptions

```javascript
const { FileError, ConfigError } = require('./config/AppError');

try {
  // ...
} catch (error) {
  if (error instanceof FileError) {
    // Handle file error
  }
  logger.error(error.toLog());
}
```

**See full API**: [AppError](#apperror)

---

### I want to use constants

```javascript
const Constants = require('./config/Constants');

// Environment
Constants.ENVIRONMENTS.PRODUCTION

// Log level
Constants.LOG_LEVELS.INFO

// NPM command
Constants.NPM_COMMANDS.BUILD
```

**See full API**: [Constants](#constants)

---

## FAQ

**Q: Are all methods static?**
A: FileUtils and CommandExecutor methods are static. Logger, DependencyManager, Deployment need to create instances first.

**Q: How to get specific parameters for a method?**
A: View JSDoc comments in code, or hover in IDE.

**Q: What to do when encountering exceptions?**
A: View TROUBLESHOOTING.md, exception messages tell you the specific issue.

**Q: Is there TypeScript support?**
A: This version is JavaScript. For TypeScript, wait for future versions.

---

**Version**: 2.0.0
**Last Updated**: March 2026
**Author**: Development Team

**Quick Links**:
- [GETTING_STARTED.md](#) - Quick start
- [TROUBLESHOOTING.md](#) - Common issues
- [TEAM_GUIDE.md](#) - Team collaboration
