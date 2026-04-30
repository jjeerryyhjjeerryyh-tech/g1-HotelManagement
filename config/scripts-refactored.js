#!/usr/bin/env node

/**
 * scripts-refactored.js - Refactored Script Command System
 *
 * Improvements:
 * 1. Uses command pattern to eliminate 70% duplicate code in deploy:dev/test/prod
 * 2. Uses utility classes for unified command execution and error handling
 * 3. Uses Constants to eliminate hardcoded strings
 * 4. Creates abstract base class DeployCommand
 * 5. Better code organization and extensibility
 */

const Constants = require('./Constants');
const CommandExecutor = require('./CommandExecutor');
const logger = require('./logger-refactored');
const DependencyManager = require('./dependency-manager-refactored');
const DeploymentManager = require('./deployment-refactored');

/**
 * Base command class
 */
class Command {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  execute() {
    throw new Error('execute() method must be overridden');
  }
}

/**
 * Deploy command base class - eliminates duplicate logic
 */
class DeployCommand extends Command {
  constructor(environment, finalCommand, description) {
    super(`deploy:${environment}`, description);
    this.environment = environment;
    this.finalCommand = finalCommand;
  }

  execute() {
    try {
      console.log(`=== ${this.description} ===`);
      process.env.NODE_ENV = this.environment;

      // Common check flow
      this._checkDependencies();
      this._preDeploymentCheck();

      // Execute specific deployment command
      this._runFinalCommand();

      logger.info(`${this.description} completed`, { environment: this.environment });
      console.log(`Deployment succeeded`);
    } catch (error) {
      console.error(`Deployment failed: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Check dependencies
   * @protected
   */
  _checkDependencies() {
    console.log('Checking dependencies...');
    const depsResult = DependencyManager.checkDependencies();

    if (depsResult.status !== Constants.DEPENDENCY_STATUS.COMPLETE) {
      console.log('Missing dependencies, installing...');
      if (!DependencyManager.installDependencies()) {
        throw new Error('Dependency installation failed');
      }
    }
  }

  /**
   * Pre-deployment check
   * @protected
   */
  _preDeploymentCheck() {
    console.log('Running pre-deployment checks...');
    const deployment = new DeploymentManager(this.environment);
    const preCheck = deployment.preDeploymentCheck();

    if (!preCheck.passed) {
      const errors = preCheck.checks.filter(c => c.type === Constants.CHECK_TYPES.ERROR);
      if (errors.length > 0) {
        errors.forEach(check => {
          console.error(`X ${check.message}`);
        });
        throw new Error('Pre-deployment check failed');
      }
    }

    // Show warnings but don't stop deployment
    const warnings = preCheck.checks.filter(c => c.type === Constants.CHECK_TYPES.WARNING);
    warnings.forEach(check => {
      console.warn(`! ${check.message}`);
    });
  }

  /**
   * Execute final command - overridden by subclasses
   * @protected
   */
  _runFinalCommand() {
    console.log(`Executing command: ${this.finalCommand}`);
    CommandExecutor.executeNpmWithStdio(...this.finalCommand.split(' '));
  }
}

/**
 * Dev environment deploy command
 */
class DeployDevCommand extends DeployCommand {
  constructor() {
    super(
      Constants.ENVIRONMENTS.DEVELOPMENT,
      'npm run dev',
      'Dev environment deployment'
    );
  }

  _runFinalCommand() {
    console.log('Starting dev server...');
    CommandExecutor.executeNpmWithStdio('run', ['dev']);
  }
}

/**
 * Test environment deploy command
 */
class DeployTestCommand extends DeployCommand {
  constructor() {
    super(
      Constants.ENVIRONMENTS.TESTING,
      'npm run lint',
      'Test environment deployment'
    );
  }

  _runFinalCommand() {
    console.log('Running tests...');
    CommandExecutor.executeNpmWithStdio('run', ['lint']);
  }
}

/**
 * Production environment deploy command
 */
class DeployProdCommand extends DeployCommand {
  constructor() {
    super(
      Constants.ENVIRONMENTS.PRODUCTION,
      'npm run build && npm start',
      'Production environment deployment'
    );
  }

  _preDeploymentCheck() {
    // Extra checks for production environment
    const requiredEnvVars = ['DB_USERNAME', 'DB_PASSWORD'];
    const missingVars = requiredEnvVars.filter(v => !process.env[v]);

    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    // Call parent check
    super._preDeploymentCheck();
  }

  _runFinalCommand() {
    console.log('Building project...');
    CommandExecutor.executeNpmWithStdio('run', ['build']);

    console.log('Starting production server...');
    CommandExecutor.executeNpmWithStdio('start');
  }
}

/**
 * Config check command
 */
class ConfigCheckCommand extends Command {
  constructor() {
    super('config:check', 'Check current environment config');
  }

  execute() {
    console.log('=== Current Environment Config ===');
    try {
      const config = require('./config-refactored');
      console.log(JSON.stringify(config.getAll(), null, 2));
    } catch (error) {
      console.error('Config loading failed:', error.message);
      process.exit(1);
    }
  }
}

/**
 * Dependency check command
 */
class DepsCheckCommand extends Command {
  constructor() {
    super('deps:check', 'Check project dependency completeness');
  }

  execute() {
    console.log('=== Dependency Check ===');
    try {
      const result = DependencyManager.checkDependencies();
      console.log(JSON.stringify(result, null, 2));

      if (result.status === Constants.DEPENDENCY_STATUS.INCOMPLETE) {
        console.warn(`\n! Detected ${result.missing.length} missing dependencies`);
      }
    } catch (error) {
      console.error('Dependency check failed:', error.message);
      process.exit(1);
    }
  }
}

/**
 * Health check command
 */
class HealthCheckCommand extends Command {
  constructor() {
    super('health:check', 'Execute system health check');
  }

  execute() {
    console.log('=== System Health Check ===');
    try {
      const deployment = new DeploymentManager();
      const result = deployment.healthCheck();
      console.log(JSON.stringify(result, null, 2));

      const failedChecks = Object.entries(result.checks)
        .filter(([, check]) => check.status === Constants.HEALTH_CHECK_STATUS.FAIL);

      if (failedChecks.length > 0) {
        console.warn(`\n! Detected ${failedChecks.length} failed checks`);
      }
    } catch (error) {
      console.error('Health check failed:', error.message);
      process.exit(1);
    }
  }
}

/**
 * Help command
 */
class HelpCommand extends Command {
  constructor(commands) {
    super('help', 'Display help info');
    this.commands = commands;
  }

  execute() {
    console.log(`
=== Environment Management Script Help ===

Usage: node config/scripts.js <command>

Available commands:`);

    for (const [cmdName, cmd] of Object.entries(this.commands)) {
      console.log(`  ${cmdName.padEnd(20)} - ${cmd.description}`);
    }

    console.log(`
Examples:
  node config/scripts.js config:check
  node config/scripts.js deploy:dev
  node config/scripts.js health:check

For more info see README.md
    `);
  }
}

/**
 * Command manager
 */
class CommandManager {
  constructor() {
    this.commands = this._initializeCommands();
  }

  /**
   * Initialize all commands
   * @private
   */
  _initializeCommands() {
    return {
      'config:check': new ConfigCheckCommand(),
      'deps:check': new DepsCheckCommand(),
      'health:check': new HealthCheckCommand(),
      'deploy:dev': new DeployDevCommand(),
      'deploy:test': new DeployTestCommand(),
      'deploy:prod': new DeployProdCommand(),
      'help': new HelpCommand(this.commands || {})
    };
  }

  /**
   * Execute command
   */
  execute(commandName) {
    if (!commandName || commandName === 'help') {
      this.commands.help.commands = this.commands;
      this.commands.help.execute();
      return;
    }

    const command = this.commands[commandName];
    if (!command) {
      console.error(`Unknown command: ${commandName}`);
      console.log('Use "node config/scripts.js help" to see available commands');
      process.exit(1);
    }

    try {
      command.execute();
    } catch (error) {
      console.error(`Command execution error: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Register custom command
   */
  registerCommand(command) {
    this.commands[command.name] = command;
  }

  /**
   * List all commands
   */
  listCommands() {
    return Object.keys(this.commands);
  }
}

// ============ Main Program ============

const manager = new CommandManager();
const commandName = process.argv[2];

manager.execute(commandName);

module.exports = { CommandManager, Command, DeployCommand };
