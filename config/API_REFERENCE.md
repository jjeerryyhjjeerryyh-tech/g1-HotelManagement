# 📚 API 快速查询

**用途**: 查询所有 API 的用法、参数和示例  
**时间**: 遇到问题时按需查阅  
**格式**: 按模块组织，快速查找

---

## 📍 导航

- [Constants](#constants) - 常量定义
- [FileUtils](#fileutils) - 文件操作
- [CommandExecutor](#commandexecutor) - 命令执行
- [AppError](#apperror) - 异常处理
- [Logger](#logger) - 日志系统
- [DependencyManager](#dependencymanager) - 依赖管理
- [Deployment](#deployment) - 部署管理
- [Scripts](#scripts) - 命令行接口

---

## Constants

**用途**: 集中定义所有常量  
**导入**: `const Constants = require('./config/Constants');`

### ENVIRONMENTS - 环境类型

```javascript
Constants.ENVIRONMENTS.DEVELOPMENT   // 'development'
Constants.ENVIRONMENTS.TESTING       // 'testing'
Constants.ENVIRONMENTS.PRODUCTION    // 'production'

// 使用示例
if (process.env.NODE_ENV === Constants.ENVIRONMENTS.PRODUCTION) {
  // 生产环境特殊处理
}
```

### LOG_LEVELS - 日志级别

```javascript
Constants.LOG_LEVELS.DEBUG    // 'debug'
Constants.LOG_LEVELS.INFO     // 'info'
Constants.LOG_LEVELS.WARN     // 'warn'
Constants.LOG_LEVELS.ERROR    // 'error'

// 使用示例
logger.log(Constants.LOG_LEVELS.INFO, '消息');
```

### NPM_COMMANDS - NPM 命令

```javascript
Constants.NPM_COMMANDS.INSTALL   // 'npm install'
Constants.NPM_COMMANDS.BUILD     // 'npm run build'
Constants.NPM_COMMANDS.START     // 'npm start'
Constants.NPM_COMMANDS.DEV       // 'npm run dev'
Constants.NPM_COMMANDS.TEST      // 'npm test'

// 使用示例
CommandExecutor.execute(Constants.NPM_COMMANDS.BUILD);
```

### 其他常量

```javascript
// 文件路径
Constants.FILE_PATHS.PACKAGE_JSON     // 'package.json'
Constants.FILE_PATHS.PACKAGE_LOCK     // 'package-lock.json'
Constants.FILE_PATHS.LOG_DIR          // './logs'

// 错误消息
Constants.ERROR_MESSAGES.CONFIG_LOAD_FAILED
Constants.ERROR_MESSAGES.FILE_NOT_FOUND
// ... 更多

// 成功消息
Constants.SUCCESS_MESSAGES.CONFIG_LOADED
Constants.SUCCESS_MESSAGES.DEPLOYMENT_SUCCESS
// ... 更多
```

---

## FileUtils

**用途**: 统一的文件操作  
**导入**: `const FileUtils = require('./config/FileUtils');`  
**静态方法**: 所有方法都是静态的，直接调用

### readJSON(filePath)

读取并解析 JSON 文件

```javascript
// 基本用法
const data = FileUtils.readJSON('config.json');
console.log(data.database.url);

// 处理异常
try {
  const data = FileUtils.readJSON('config.json');
} catch (error) {
  console.error('读取失败:', error.message);
  // error 是 FileError 类型
}

// 参数
// filePath (string, 必需) - 文件路径
//   - 相对路径: './config.json'
//   - 绝对路径: '/path/to/config.json'

// 返回值
// Object - 解析后的 JSON 对象

// 异常
// FileError - 文件不存在或格式错误
```

### writeJSON(filePath, data)

写入数据到 JSON 文件

```javascript
// 基本用法
const data = { name: 'Hotel', rooms: 100 };
FileUtils.writeJSON('hotel.json', data);

// 处理异常
try {
  FileUtils.writeJSON('hotel.json', data);
} catch (error) {
  console.error('写入失败:', error.message);
}

// 参数
// filePath (string, 必需) - 文件路径
// data (Object, 必需) - 要写入的数据

// 返回值
// undefined

// 异常
// FileError - 权限不足或其他写入错误
```

### readFile(filePath)

读取文本文件

```javascript
// 基本用法
const content = FileUtils.readFile('README.md');
console.log(content);

// 参数
// filePath (string, 必需) - 文件路径

// 返回值
// string - 文件内容

// 异常
// FileError - 文件不存在或无读权限
```

### writeFile(filePath, content)

写入文本文件

```javascript
// 基本用法
FileUtils.writeFile('output.txt', 'Hello World');

// 参数
// filePath (string, 必需) - 文件路径
// content (string, 必需) - 文件内容

// 返回值
// undefined
```

### appendToFile(filePath, content)

追加内容到文件

```javascript
// 基本用法
FileUtils.appendToFile('log.txt', 'New log line\n');

// 参数
// filePath (string, 必需) - 文件路径
// content (string, 必需) - 要追加的内容

// 返回值
// undefined
```

### fileExists(filePath)

检查文件是否存在

```javascript
// 基本用法
if (FileUtils.fileExists('config.json')) {
  console.log('配置文件存在');
}

// 参数
// filePath (string, 必需) - 文件路径

// 返回值
// boolean - true 存在，false 不存在
```

### getFileSize(filePath)

获取文件大小

```javascript
// 基本用法
const size = FileUtils.getFileSize('large-file.zip');
console.log(`文件大小: ${size} 字节`);

// 参数
// filePath (string, 必需) - 文件路径

// 返回值
// number - 文件大小（字节）

// 异常
// FileError - 文件不存在
```

### ensureDirectory(dirPath)

确保目录存在，不存在则创建

```javascript
// 基本用法
FileUtils.ensureDirectory('./logs');
FileUtils.ensureDirectory('./uploads/images');

// 参数
// dirPath (string, 必需) - 目录路径

// 返回值
// undefined

// 异常
// FileError - 创建失败
```

### directoryExists(dirPath)

检查目录是否存在

```javascript
// 基本用法
if (FileUtils.directoryExists('./logs')) {
  console.log('日志目录存在');
}

// 参数
// dirPath (string, 必需) - 目录路径

// 返回值
// boolean - true 存在，false 不存在
```

### listFiles(dirPath)

列出目录中的所有文件

```javascript
// 基本用法
const files = FileUtils.listFiles('./src');
console.log('源文件:', files);
// 输出: ['index.js', 'app.js', 'server.js']

// 参数
// dirPath (string, 必需) - 目录路径

// 返回值
// string[] - 文件名数组

// 异常
// FileError - 目录不存在
```

### readPackageJSON(basePath)

读取 package.json 文件

```javascript
// 基本用法
const pkg = FileUtils.readPackageJSON();  // 读取当前目录
const pkg = FileUtils.readPackageJSON('/path/to/project');

// 参数
// basePath (string, 可选) - 项目目录，默认为当前目录

// 返回值
// Object - package.json 内容

// 异常
// FileError - 文件不存在或格式错误
```

---

## CommandExecutor

**用途**: 统一的命令执行  
**导入**: `const CommandExecutor = require('./config/CommandExecutor');`  
**静态方法**: 所有方法都是静态的

### execute(command, options)

执行任意系统命令

```javascript
// 基本用法
CommandExecutor.execute('npm install');
CommandExecutor.execute('git status');
CommandExecutor.execute('npm run build');

// 带选项
CommandExecutor.execute('npm install', {
  stdio: 'inherit',  // 显示标准输出
  timeout: 30000     // 超时 30 秒
});

// 参数
// command (string, 必需) - 要执行的命令
// options (Object, 可选) - 执行选项
//   - stdio: 'inherit' | 'pipe' | 'ignore'
//   - timeout: 毫秒数
//   - cwd: 工作目录

// 返回值
// string - 命令输出

// 异常
// CommandError - 命令执行失败
```

### executeNpm(subCommand, args)

执行 NPM 命令的便捷方法

```javascript
// 基本用法
CommandExecutor.executeNpm('install');                    // npm install
CommandExecutor.executeNpm('install', ['express']);      // npm install express
CommandExecutor.executeNpm('run', ['build']);            // npm run build
CommandExecutor.executeNpm('run', ['dev']);              // npm run dev

// 参数
// subCommand (string, 必需) - NPM 子命令
// args (string[], 可选) - 参数数组

// 返回值
// string - 命令输出

// 异常
// CommandError - 命令执行失败
```

### isCommandAvailable(command)

检查命令是否可用

```javascript
// 基本用法
if (CommandExecutor.isCommandAvailable('git')) {
  console.log('Git 已安装');
} else {
  console.log('Git 未安装');
}

// 参数
// command (string, 必需) - 命令名称

// 返回值
// boolean - true 可用，false 不可用
```

### getCommandVersion(command)

获取命令版本

```javascript
// 基本用法
const version = CommandExecutor.getCommandVersion('node');
console.log('Node.js 版本:', version);  // 输出: v16.13.0

const npmVersion = CommandExecutor.getCommandVersion('npm');

// 参数
// command (string, 必需) - 命令名称

// 返回值
// string - 版本号

// 异常
// CommandError - 命令不存在或无法获取版本
```

### executeAsync(command, options)

异步执行命令

```javascript
// 基本用法
try {
  const result = await CommandExecutor.executeAsync('npm install');
  console.log('安装完成');
} catch (error) {
  console.error('安装失败:', error.message);
}

// 参数
// command (string, 必需) - 要执行的命令
// options (Object, 可选) - 执行选项

// 返回值
// Promise<string> - 命令输出

// 异常
// CommandError - 命令执行失败
```

---

## AppError

**用途**: 统一的异常处理  
**导入**: `const { ConfigError, FileError, CommandError } = require('./config/AppError');`

### 异常类型

```javascript
// 基础异常
AppError                 // 所有异常的基类

// 具体异常类型
ConfigError              // 配置相关异常
FileError                // 文件操作异常
CommandError             // 命令执行异常
LogError                 // 日志相关异常
DeploymentError          // 部署相关异常
DependencyError          // 依赖相关异常
ValidationError          // 验证异常
EnvironmentError         // 环境相关异常
```

### 抛出异常

```javascript
// 基本用法
throw new FileError('配置文件不存在', {
  filePath: 'config.json',
  reason: 'FILE_NOT_FOUND'
});

throw new ConfigError('配置格式错误', {
  field: 'database.url',
  expected: 'string',
  received: 'undefined'
});

// 参数
// message (string, 必需) - 错误消息
// context (Object, 可选) - 错误上下文

// 异常属性
error.message       // 错误消息
error.type          // 异常类型名称
error.context       // 错误上下文
error.timestamp     // 发生时间
```

### 捕获异常

```javascript
try {
  const config = FileUtils.readJSON('config.json');
} catch (error) {
  if (error instanceof FileError) {
    console.error('文件错误:', error.message);
  } else if (error instanceof ConfigError) {
    console.error('配置错误:', error.message);
  } else {
    console.error('未知错误:', error.message);
  }
  
  // 记录到日志
  console.log('完整信息:', error.toLog());
  console.log('JSON 格式:', error.toJSON());
}
```

### toLog() 方法

返回适合记录到日志的字符串

```javascript
try {
  // ...
} catch (error) {
  // 输出格式化的日志
  logger.error(error.toLog());
  // 输出示例:
  // [FileError] 配置文件不存在
  // Context: { filePath: 'config.json', reason: 'FILE_NOT_FOUND' }
  // Stack: Error: ...
}
```

---

## Logger

**用途**: 日志记录  
**导入**: `const logger = require('./config/logger-refactored');`

### info(message)

记录信息级别日志

```javascript
// 基本用法
logger.info('应用已启动');
logger.info('用户已登录');

// 输出
// [INFO] 应用已启动
// [INFO] 用户已登录
```

### warn(message)

记录警告级别日志

```javascript
// 基本用法
logger.warn('磁盘空间不足');
logger.warn('内存使用率过高');

// 输出
// [WARN] 磁盘空间不足
```

### error(message)

记录错误级别日志

```javascript
// 基本用法
logger.error('数据库连接失败');
logger.error('Redis 连接失败');

// 输出
// [ERROR] 数据库连接失败
```

### debug(message)

记录调试级别日志

```javascript
// 基本用法 (仅在开发环境显示)
logger.debug('进入 getUserById 函数');
logger.debug('获取用户数据:', userData);

// 输出 (开发环境)
// [DEBUG] 进入 getUserById 函数
// [DEBUG] 获取用户数据: { id: 1, name: 'John' }
```

### logError(error, context)

记录异常信息

```javascript
// 基本用法
try {
  const config = FileUtils.readJSON('config.json');
} catch (error) {
  logger.logError(error, {
    context: 'loading configuration',
    userId: 'user123',
    timestamp: new Date()
  });
}

// 输出
// [ERROR] FileError: 配置文件不存在
// Context: { context: 'loading configuration', userId: 'user123' }
// Stack: Error: ...
```

### getLogPath()

获取日志文件路径

```javascript
// 基本用法
const logPath = logger.getLogPath();
console.log('日志文件:', logPath);
// 输出: /path/to/logs/development.log
```

---

## DependencyManager

**用途**: 依赖管理  
**创建**: `const manager = new (require('./config/dependency-manager-refactored'))();`

### checkDependencies()

检查依赖是否完整

```javascript
// 基本用法
const status = manager.checkDependencies();
console.log(status);
// 输出:
// {
//   status: 'complete' | 'incomplete',
//   total: 45,
//   installed: 45,
//   missing: []
// }

// 处理缺失的依赖
if (status.status === 'incomplete') {
  console.log('缺失的依赖:', status.missing);
  manager.installDependencies();
}

// 返回值
// Object 包含:
//   - status: 'complete' 或 'incomplete'
//   - total: 总依赖数
//   - installed: 已安装数
//   - missing: 缺失依赖数组
```

### installDependencies()

安装所有依赖

```javascript
// 基本用法
manager.installDependencies();
console.log('依赖安装完成');

// 返回值
// undefined

// 异常
// DependencyError - 安装失败
```

### auditDependencies()

检查安全漏洞

```javascript
// 基本用法
const result = manager.auditDependencies();
console.log('审计结果:', result);
// 输出:
// {
//   vulnerabilities: 5,
//   severity: 'moderate'
// }

// 返回值
// Object 包含漏洞统计
```

### getDependencyInfo(packageName)

获取依赖信息

```javascript
// 基本用法
const info = manager.getDependencyInfo('express');
console.log('Express 版本:', info.version);
console.log('Express 描述:', info.description);
// 输出:
// {
//   version: '4.17.1',
//   description: 'Fast, unopinionated web framework',
//   dependencies: 50
// }

// 参数
// packageName (string, 必需) - 包名

// 返回值
// Object - 包信息

// 异常
// DependencyError - 包不存在
```

---

## Deployment

**用途**: 部署管理  
**创建**: `const deployment = new (require('./config/deployment-refactored'))();`

### checkAll()

执行所有部署前检查

```javascript
// 基本用法
deployment.checkAll();
// 输出:
// ✅ 配置检查通过
// ✅ 日志系统正常
// ✅ 依赖已安装
// ✅ 服务器连接正常

// 返回值
// undefined

// 异常
// DeploymentError - 某项检查失败
```

### setEnvironment(env)

设置部署环境

```javascript
// 基本用法
deployment.setEnvironment('production');
deployment.setEnvironment('testing');

// 参数
// env (string, 必需) - 环境名称
//   - 'development'
//   - 'testing'
//   - 'production'

// 返回值
// undefined

// 异常
// EnvironmentError - 无效的环境
```

### deploy()

执行部署

```javascript
// 基本用法
deployment.setEnvironment('production');
deployment.deploy();
console.log('部署完成');

// 返回值
// undefined

// 异常
// DeploymentError - 部署失败
```

### getDeploymentStatus()

获取部署状态

```javascript
// 基本用法
const status = deployment.getDeploymentStatus();
console.log('部署状态:', status);
// 输出:
// {
//   status: 'success' | 'failed' | 'pending',
//   environment: 'production',
//   timestamp: 2026-03-18T10:30:00Z,
//   message: '部署成功'
// }

// 返回值
// Object 包含部署状态
```

---

## Scripts

**用途**: 命令行接口  
**执行**: `node scripts-refactored.js <command>`

### 可用命令

```bash
# 查看所有命令
node scripts-refactored.js help

# 配置相关
node scripts-refactored.js config:check    # 检查配置
node scripts-refactored.js config:list     # 列出配置

# 系统检查
node scripts-refactored.js health:check    # 健康检查

# 依赖相关
node scripts-refactored.js dep:install     # 安装依赖
node scripts-refactored.js dep:prod        # 安装生产依赖
node scripts-refactored.js dep:audit       # 安全审计
node scripts-refactored.js dep:list        # 列出依赖

# 部署相关
node scripts-refactored.js deploy:dev      # 部署到开发
node scripts-refactored.js deploy:test     # 部署到测试
node scripts-refactored.js deploy:prod     # 部署到生产
node scripts-refactored.js deploy:status   # 查看部署状态

# 日志相关
node scripts-refactored.js log:clear       # 清空日志
node scripts-refactored.js log:rotate      # 轮转日志
```

### 使用示例

```bash
# 开发环境快速开始
node scripts-refactored.js config:check
node scripts-refactored.js dep:install
node scripts-refactored.js deploy:dev

# 生产环境部署
node scripts-refactored.js config:check
node scripts-refactored.js health:check
node scripts-refactored.js dep:audit
node scripts-refactored.js deploy:prod
node scripts-refactored.js deploy:status

# 故障排查
node scripts-refactored.js health:check
node scripts-refactored.js log:list
tail -f logs/application.log
```

---

## 🔍 按场景查询

### 我想读写文件

```javascript
const FileUtils = require('./config/FileUtils');

// 读取 JSON
const data = FileUtils.readJSON('config.json');

// 写入 JSON
FileUtils.writeJSON('output.json', data);

// 检查文件
FileUtils.fileExists('file.txt');

// 更多方法: FileUtils.readFile, FileUtils.writeFile, FileUtils.appendToFile
```

**查看完整 API**: [FileUtils](#fileutils)

---

### 我想执行命令

```javascript
const CommandExecutor = require('./config/CommandExecutor');

// 执行 NPM
CommandExecutor.executeNpm('install');

// 执行任意命令
CommandExecutor.execute('npm run build');

// 检查命令
CommandExecutor.isCommandAvailable('git');

// 获取版本
CommandExecutor.getCommandVersion('node');
```

**查看完整 API**: [CommandExecutor](#commandexecutor)

---

### 我想记录日志

```javascript
const logger = require('./config/logger-refactored');

logger.info('信息');
logger.warn('警告');
logger.error('错误');
logger.debug('调试');

logger.logError(error, { context: '...' });
```

**查看完整 API**: [Logger](#logger)

---

### 我想处理异常

```javascript
const { FileError, ConfigError } = require('./config/AppError');

try {
  // ...
} catch (error) {
  if (error instanceof FileError) {
    // 处理文件错误
  }
  logger.error(error.toLog());
}
```

**查看完整 API**: [AppError](#apperror)

---

### 我想使用常量

```javascript
const Constants = require('./config/Constants');

// 环境
Constants.ENVIRONMENTS.PRODUCTION

// 日志级别
Constants.LOG_LEVELS.INFO

// NPM 命令
Constants.NPM_COMMANDS.BUILD
```

**查看完整 API**: [Constants](#constants)

---

## 📞 常见问题

**Q: 所有方法都是静态的吗？**  
A: FileUtils 和 CommandExecutor 的方法是静态的。Logger、DependencyManager、Deployment 需要先创建实例。

**Q: 如何获取方法的具体参数？**  
A: 查看代码中的 JSDoc 注释，或在 IDE 中悬停查看。

**Q: 遇到异常怎么办？**  
A: 查看 TROUBLESHOOTING.md，异常消息会告诉你具体问题。

**Q: 有 TypeScript 支持吗？**  
A: 本版本是 JavaScript。如需 TypeScript，请等待后续版本。

---

**版本**: 2.0.0  
**最后更新**: 2026年3月  
**作者**: 开发团队

**快速链接**:
- [GETTING_STARTED.md](#) - 快速开始
- [TROUBLESHOOTING.md](#) - 常见问题
- [TEAM_GUIDE.md](#) - 团队协作