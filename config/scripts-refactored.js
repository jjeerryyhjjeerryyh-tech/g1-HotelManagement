#!/usr/bin/env node

/**
 * scripts-refactored.js - 重构后的脚本命令系统
 * 
 * 改进点：
 * 1. 使用命令模式消除 deploy:dev/test/prod 的 70% 重复代码
 * 2. 使用工具类统一命令执行和错误处理
 * 3. 使用 Constants 消除硬编码字符串
 * 4. 创建抽象基类 DeployCommand
 * 5. 更好的代码组织和可扩展性
 */

const Constants = require('./Constants');
const CommandExecutor = require('./CommandExecutor');
const logger = require('./logger-refactored');
const DependencyManager = require('./dependency-manager-refactored');
const DeploymentManager = require('./deployment-refactored');

/**
 * 基础命令类
 */
class Command {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  execute() {
    throw new Error('execute() 方法必须被重写');
  }
}

/**
 * 部署命令基类 - 消除重复逻辑
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

      // 共同的检查流程
      this._checkDependencies();
      this._preDeploymentCheck();

      // 执行具体的部署命令
      this._runFinalCommand();

      logger.info(`${this.description} 完成`, { environment: this.environment });
      console.log(`✅ 部署成功`);
    } catch (error) {
      console.error(`❌ 部署失败: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * 检查依赖
   * @protected
   */
  _checkDependencies() {
    console.log('检查依赖...');
    const depsResult = DependencyManager.checkDependencies();

    if (depsResult.status !== Constants.DEPENDENCY_STATUS.COMPLETE) {
      console.log('缺失依赖，正在安装...');
      if (!DependencyManager.installDependencies()) {
        throw new Error('依赖安装失败');
      }
    }
  }

  /**
   * 部署前检查
   * @protected
   */
  _preDeploymentCheck() {
    console.log('执行部署前检查...');
    const deployment = new DeploymentManager(this.environment);
    const preCheck = deployment.preDeploymentCheck();

    if (!preCheck.passed) {
      const errors = preCheck.checks.filter(c => c.type === Constants.CHECK_TYPES.ERROR);
      if (errors.length > 0) {
        errors.forEach(check => {
          console.error(`❌ ${check.message}`);
        });
        throw new Error('部署前检查失败');
      }
    }

    // 显示警告但不停止部署
    const warnings = preCheck.checks.filter(c => c.type === Constants.CHECK_TYPES.WARNING);
    warnings.forEach(check => {
      console.warn(`⚠️  ${check.message}`);
    });
  }

  /**
   * 执行最终命令 - 由子类重写
   * @protected
   */
  _runFinalCommand() {
    console.log(`执行命令: ${this.finalCommand}`);
    CommandExecutor.executeNpmWithStdio(...this.finalCommand.split(' '));
  }
}

/**
 * 开发环境部署命令
 */
class DeployDevCommand extends DeployCommand {
  constructor() {
    super(
      Constants.ENVIRONMENTS.DEVELOPMENT,
      'npm run dev',
      '开发环境部署'
    );
  }

  _runFinalCommand() {
    console.log('启动开发服务器...');
    CommandExecutor.executeNpmWithStdio('run', ['dev']);
  }
}

/**
 * 测试环境部署命令
 */
class DeployTestCommand extends DeployCommand {
  constructor() {
    super(
      Constants.ENVIRONMENTS.TESTING,
      'npm run lint',
      '测试环境部署'
    );
  }

  _runFinalCommand() {
    console.log('运行测试...');
    CommandExecutor.executeNpmWithStdio('run', ['lint']);
  }
}

/**
 * 生产环境部署命令
 */
class DeployProdCommand extends DeployCommand {
  constructor() {
    super(
      Constants.ENVIRONMENTS.PRODUCTION,
      'npm run build && npm start',
      '生产环境部署'
    );
  }

  _preDeploymentCheck() {
    // 生产环境额外检查环境变量
    const requiredEnvVars = ['DB_USERNAME', 'DB_PASSWORD'];
    const missingVars = requiredEnvVars.filter(v => !process.env[v]);

    if (missingVars.length > 0) {
      throw new Error(`缺失必要的环境变量: ${missingVars.join(', ')}`);
    }

    // 调用父类的检查
    super._preDeploymentCheck();
  }

  _runFinalCommand() {
    console.log('构建项目...');
    CommandExecutor.executeNpmWithStdio('run', ['build']);

    console.log('启动生产服务器...');
    CommandExecutor.executeNpmWithStdio('start');
  }
}

/**
 * 配置检查命令
 */
class ConfigCheckCommand extends Command {
  constructor() {
    super('config:check', '检查当前环境配置');
  }

  execute() {
    console.log('=== 当前环境配置 ===');
    try {
      const config = require('./config-refactored');
      console.log(JSON.stringify(config.getAll(), null, 2));
    } catch (error) {
      console.error('配置加载失败:', error.message);
      process.exit(1);
    }
  }
}

/**
 * 依赖检查命令
 */
class DepsCheckCommand extends Command {
  constructor() {
    super('deps:check', '检查项目依赖完整性');
  }

  execute() {
    console.log('=== 依赖检查 ===');
    try {
      const result = DependencyManager.checkDependencies();
      console.log(JSON.stringify(result, null, 2));

      if (result.status === Constants.DEPENDENCY_STATUS.INCOMPLETE) {
        console.warn(`\n⚠️  检测到 ${result.missing.length} 个缺失的依赖`);
      }
    } catch (error) {
      console.error('依赖检查失败:', error.message);
      process.exit(1);
    }
  }
}

/**
 * 健康检查命令
 */
class HealthCheckCommand extends Command {
  constructor() {
    super('health:check', '执行系统健康检查');
  }

  execute() {
    console.log('=== 系统健康检查 ===');
    try {
      const deployment = new DeploymentManager();
      const result = deployment.healthCheck();
      console.log(JSON.stringify(result, null, 2));

      const failedChecks = Object.entries(result.checks)
        .filter(([, check]) => check.status === Constants.HEALTH_CHECK_STATUS.FAIL);

      if (failedChecks.length > 0) {
        console.warn(`\n⚠️  检测到 ${failedChecks.length} 个失败的检查`);
      }
    } catch (error) {
      console.error('健康检查失败:', error.message);
      process.exit(1);
    }
  }
}

/**
 * 帮助命令
 */
class HelpCommand extends Command {
  constructor(commands) {
    super('help', '显示帮助信息');
    this.commands = commands;
  }

  execute() {
    console.log(`
=== 环境管理脚本帮助 ===

使用方法: node config/scripts.js <命令>

可用命令:`);
    
    for (const [cmdName, cmd] of Object.entries(this.commands)) {
      console.log(`  ${cmdName.padEnd(20)} - ${cmd.description}`);
    }

    console.log(`
示例:
  node config/scripts.js config:check
  node config/scripts.js deploy:dev
  node config/scripts.js health:check

更多信息请查看 README.md
    `);
  }
}

/**
 * 命令管理器
 */
class CommandManager {
  constructor() {
    this.commands = this._initializeCommands();
  }

  /**
   * 初始化所有命令
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
   * 执行命令
   */
  execute(commandName) {
    if (!commandName || commandName === 'help') {
      this.commands.help.commands = this.commands;
      this.commands.help.execute();
      return;
    }

    const command = this.commands[commandName];
    if (!command) {
      console.error(`❌ 未知命令: ${commandName}`);
      console.log('使用 "node config/scripts.js help" 查看可用命令');
      process.exit(1);
    }

    try {
      command.execute();
    } catch (error) {
      console.error(`❌ 命令执行错误: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * 注册自定义命令
   */
  registerCommand(command) {
    this.commands[command.name] = command;
  }

  /**
   * 列出所有命令
   */
  listCommands() {
    return Object.keys(this.commands);
  }
}

// ============ 主程序 ============

const manager = new CommandManager();
const commandName = process.argv[2];

manager.execute(commandName);

module.exports = { CommandManager, Command, DeployCommand };
