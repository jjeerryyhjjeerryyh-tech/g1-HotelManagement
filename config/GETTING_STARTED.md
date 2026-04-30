# Quick Start Guide

**Goal**: Get you using this system within 10 minutes
**Best for**: All developers
**Prerequisites**: Node.js installed

---

## 5-Minute Quick Start

### Step 1: Understand What's Included (1 minute)

```
Tools (must understand)
|
├- Constants.js      - Constant definitions
├- FileUtils.js      - File operations
├- CommandExecutor   - Command execution
└- AppError.js       - Exception handling
|
Core modules (use as needed)
|
├- logger            - Log recording
├- dependency-manager - Dependency management
├- deployment        - Deployment management
└- scripts           - CLI interface
└- Complete documentation
```

### Step 2: Copy Files to Project (1 minute)

```bash
# Enter your project directory
cd /your/hotel-management-project

# Copy utility layer files
cp /path/to/config-refactored/Constants.js config/
cp /path/to/config-refactored/AppError.js config/
cp /path/to/config-refactored/FileUtils.js config/
cp /path/to/config-refactored/CommandExecutor.js config/

# Copy modules you need
cp /path/to/config-refactored/logger-refactored.js config/
cp /path/to/config-refactored/dependency-manager-refactored.js config/
```

### Step 3: First Usage (2 minutes)

```javascript
// In your code
const Constants = require('./config/Constants');
const FileUtils = require('./config/FileUtils');

// Read config
const config = FileUtils.readJSON('config.json');
console.log('Current environment:', Constants.ENVIRONMENTS.DEVELOPMENT);

// Write data
FileUtils.writeJSON('output.json', { status: 'ok' });
```

### Step 4: First Command (1 minute)

```bash
# View all available commands
node config/scripts-refactored.js help

# Execute a command
node config/scripts-refactored.js config:check

# View output
# ✅ Config check passed
# ✅ Logging system normal
# ✅ Dependencies installed
```

### Step 5: Done! (0 minutes)

You can now use this system! 🎉

---

## 8 Common Scenarios

### Scenario 1: File Read/Write

**Scenario**: You need to read a JSON config file

```javascript
const FileUtils = require('./config/FileUtils');

// Read JSON file
try {
  const config = FileUtils.readJSON('config.json');
  console.log('Database URL:', config.database.url);

  // Modify and save
  config.database.url = 'new-url';
  FileUtils.writeJSON('config.json', config);
} catch (error) {
  console.error('Operation failed:', error.message);
}
```

**Related APIs**:
- `FileUtils.readJSON(path)`
- `FileUtils.writeJSON(path, data)`
- `FileUtils.fileExists(path)`

---

### Scenario 2: Execute Commands

**Scenario**: You need to execute `npm install`

```javascript
const CommandExecutor = require('./config/CommandExecutor');

try {
  // Method 1: Execute arbitrary command
  CommandExecutor.execute('npm install');

  // Method 2: Dedicated NPM command
  CommandExecutor.executeNpm('install');
  CommandExecutor.executeNpm('run', ['build']);

  // Method 3: Check if command is available
  if (CommandExecutor.isCommandAvailable('git')) {
    CommandExecutor.execute('git status');
  }

  // Method 4: Get version
  const version = CommandExecutor.getCommandVersion('node');
  console.log('Node.js version:', version);

} catch (error) {
  console.error('Execution failed:', error.message);
}
```

**Related APIs**:
- `CommandExecutor.execute(command)`
- `CommandExecutor.executeNpm(subCommand, args)`
- `CommandExecutor.isCommandAvailable(command)`
- `CommandExecutor.getCommandVersion(command)`

---

### Scenario 3: Use Constants

**Scenario**: You need to check if the environment is production

```javascript
const Constants = require('./config/Constants');

// Bad practice - hardcoded string
if (process.env.NODE_ENV === 'production') {
  // ...
}

// Good practice - use constants
if (process.env.NODE_ENV === Constants.ENVIRONMENTS.PRODUCTION) {
  console.log('Production environment special handling');
}

// All available constants:
console.log(Constants.ENVIRONMENTS);     // { DEVELOPMENT, TESTING, PRODUCTION }
console.log(Constants.LOG_LEVELS);       // { DEBUG, INFO, WARN, ERROR }
console.log(Constants.NPM_COMMANDS);     // { INSTALL, BUILD, START, ... }
```

**Related APIs**:
- `Constants.ENVIRONMENTS.*`
- `Constants.LOG_LEVELS.*`
- `Constants.NPM_COMMANDS.*`
- And more...

---

### Scenario 4: Handle Exceptions

**Scenario**: When config file doesn't exist, give a friendly error message

```javascript
const FileUtils = require('./config/FileUtils');
const { ConfigError, FileError } = require('./config/AppError');

try {
  const config = FileUtils.readJSON('config.json');

} catch (error) {
  // Handle by error type
  if (error instanceof FileError) {
    console.error('Config file not found, please check file path');
    console.error('Details:', error.toLog());

  } else if (error instanceof ConfigError) {
    console.error('Config format error');
    console.error('Details:', error.toLog());

  } else {
    console.error('Unknown error:', error.message);
  }

  // Can get detailed information
  console.log('Error type:', error.type);
  console.log('Error context:', error.context);
  console.log('Full log:', error.toLog());
}
```

**Exception types**:
- `AppError` - Base exception
- `ConfigError` - Config related
- `FileError` - File operations
- `CommandError` - Command execution
- `LogError` - Logging related
- `DependencyError` - Dependency related
- And more...

---

### Scenario 5: Log Messages

**Scenario**: Your application logs some info when starting

```javascript
const logger = require('./config/logger-refactored');

// Different level logs
logger.debug('This is debug info, only shown during development');
logger.info('Application started, listening on port 3000');
logger.warn('Database connection slow');
logger.error('Database connection failed');

// Log exceptions
try {
  // Some code that might error
  throw new Error('Simulated error');
} catch (error) {
  logger.logError(error, {
    context: 'database initialization',
    userId: 'user123'
  });
}

// View log file
// Linux/macOS: cat logs/application.log
// Windows: type logs\application.log
```

**Related APIs**:
- `logger.debug(message)`
- `logger.info(message)`
- `logger.warn(message)`
- `logger.error(message)`
- `logger.logError(error, context)`

---

### Scenario 6: Manage Dependencies

**Scenario**: You need to check if dependencies are installed

```javascript
const DependencyManager = require('./config/dependency-manager-refactored');

const manager = new DependencyManager();

// Check dependencies
const status = manager.checkDependencies();
console.log('Dependency status:', status);

if (status.status !== 'complete') {
  console.log('Missing dependencies:', status.missing);
  console.log('Installing...');
  manager.installDependencies();
}

// Security audit
manager.auditDependencies();

// Get dependency info
const express = manager.getDependencyInfo('express');
console.log('Express version:', express.version);
```

**Related APIs**:
- `checkDependencies()`
- `installDependencies()`
- `auditDependencies()`
- `getDependencyInfo(packageName)`

---

### Scenario 7: Deploy Application

**Scenario**: Check before deploying to production

```javascript
const Deployment = require('./config/deployment-refactored');

const deployment = new Deployment();

// Pre-deployment check
deployment.checkAll();
// Checks:
  // ✅ Config file complete
  // ✅ Logging system normal
  // ✅ Dependencies installed
  // ✅ Database connection normal

// Set environment
deployment.setEnvironment('production');

// Execute deployment
deployment.deploy();

// View deployment status
const status = deployment.getDeploymentStatus();
console.log('Deployment status:', status);
```

**Related APIs**:
- `checkAll()`
- `setEnvironment(env)`
- `deploy()`
- `getDeploymentStatus()`

---

### Scenario 8: Execute CLI Commands

**Scenario**: Execute system commands from command line

```bash
# View all commands
node config/scripts-refactored.js help

# Config related
node config/scripts-refactored.js config:check       # Check config
node config/scripts-refactored.js config:list        # List config

# System checks
node config/scripts-refactored.js health:check        # Health check

# Dependency related
node config/scripts-refactored.js dep:install         # Install dependencies
node config/scripts-refactored.js dep:audit          # Security audit

# Deployment related
node config/scripts-refactored.js deploy:dev          # Deploy to dev
node config/scripts-refactored.js deploy:test         # Deploy to test
node config/scripts-refactored.js deploy:prod         # Deploy to prod
node config/scripts-refactored.js deploy:status       # View deployment status

# Log related
node config/scripts-refactored.js log:clear           # Clear logs
node config/scripts-refactored.js log:rotate          # Rotate logs
```

---

## File Structure

After copying files, your project structure should be:

```
your-project/
├── config/
│   ├── Constants.js                     new
│   ├── AppError.js                      new
│   ├── FileUtils.js                     new
│   ├── CommandExecutor.js               new
│   ├── logger-refactored.js            new
│   ├── dependency-manager-refactored.js new
│   ├── deployment-refactored.js        new
│   ├── scripts-refactored.js           new
│   └── environments/
│       ├── development.json
│       ├── testing.json
│       └── production.json
├── logs/                                auto-created
│   ├── development.log
│   ├── testing.log
│   └── production.log
├── src/
│   ├── app.js
│   ├── server.js
│   └── ...
├── package.json
└── README.md
```

---

## Integration Checklist

After completing these steps, verify the integration is correct:

```
□ Copied all 4 utility files
□ Copied required core module files
□ Imported utility classes in code
□ Executed first command
□ Log files can be created normally
□ Logs can be written normally
□ Exceptions can be caught normally
□ File read/write works normally
□ All commands can be executed
□ Test environment verification passed
```

---

## Common Questions

### Q1: Module not found?

**Problem**: `Cannot find module './config/Constants'`

**Solution**:
```javascript
// Check if path is correct
// Should be: ./config/Constants.js or ./config/Constants
// Make sure file exists at that location

// Correct usage:
const Constants = require('./config/Constants');
```

### Q2: Command execution error?

**Problem**: `CommandExecutor.executeNpm is not a function`

**Solution**:
```javascript
// Make sure CommandExecutor is imported
const CommandExecutor = require('./config/CommandExecutor');

// Check if method name is correct
// Is it executeNpm() or something else?
// Check API_REFERENCE.md for confirmation
```

### Q3: Config file not found?

**Problem**: Error `ENOENT: no such file or directory` when reading config

**Solution**:
```javascript
// Make sure file exists
const FileUtils = require('./config/FileUtils');

// Check if file exists first
if (FileUtils.fileExists('config.json')) {
  const config = FileUtils.readJSON('config.json');
} else {
  console.log('Config file does not exist');
}
```

### Q4: Where are the log files?

**Problem**: Cannot see log output

**Solution**:
```javascript
// Log file location
// Linux/macOS:
cat logs/development.log

// Windows:
type logs\development.log

// Or query log path in code
const logger = require('./config/logger-refactored');
console.log('Log path:', logger.getLogPath());
```

---

## Next Steps

### 1. Understand Each Module (20 minutes)

Read **API_REFERENCE.md** to learn:
- All methods for each utility class
- Parameters and return values
- Usage examples

### 2. Learn Team Collaboration (10 minutes)

Read **TEAM_GUIDE.md** to learn:
- Who is responsible for what
- How to communicate
- Common commands

### 3. Learn System Design (30 minutes)

Read **ARCHITECTURE.md** to learn:
- How the system is designed
- Why it was designed this way
- How to extend

### 4. View Code Comments (Anytime)

Open files and view JSDoc comments in the code:

```javascript
/**
 * Read JSON file and return parsed result
 * @param {string} filePath - File path
 * @returns {Object} Parsed JSON object
 * @throws {FileError} Thrown when file doesn't exist or format is wrong
 * @example
 * const config = FileUtils.readJSON('config.json');
 */
static readJSON(filePath) { }
```

---

## Need Help?

| Question | View Document |
|----------|---------------|
| How to use API? | API_REFERENCE.md |
| What to do when error occurs? | TROUBLESHOOTING.md |
| How to deploy? | GETTING_STARTED.md (deployment section) |
| What is the design philosophy? | ARCHITECTURE.md |
| How is the team divided? | TEAM_GUIDE.md |

---

## Summary

You now have:
- ✅ Understood the 8 modules of the system
- ✅ Copied all files
- ✅ Learned 8 common scenarios
- ✅ Know how to solve common problems

**Start using now!** 💪

---

**Version**: 2.0.0
**Last Updated**: March 2026
**Author**: Development Team

**Next Steps**:
1. Copy files to project
2. View API_REFERENCE.md to learn specific APIs
3. Start using in code
4. View TROUBLESHOOTING.md when encountering problems
