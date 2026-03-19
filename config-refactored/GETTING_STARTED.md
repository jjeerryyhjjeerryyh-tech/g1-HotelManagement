# 🚀 快速开始指南

**目标**: 10 分钟内让你能使用这个系统  
**适合**: 所有开发者  
**前置条件**: Node.js 已安装

---

## ⚡ 5 分钟快速开始

### Step 1: 了解系统包含什么 (1 分钟)

```
┌─ 工具层 (必须了解)
│  ├─ Constants.js      常量定义
│  ├─ FileUtils.js      文件操作
│  ├─ CommandExecutor   命令执行
│  └─ AppError.js       异常处理
│
├─ 核心模块 (按需使用)
│  ├─ logger            日志记录
│  ├─ dependency-manager 依赖管理
│  ├─ deployment        部署管理
│  └─ scripts           命令行接口
└─ 完整文档
```

### Step 2: 复制文件到项目 (1 分钟)

```bash
# 进入你的项目目录
cd /your/hotel-management-project

# 复制工具层文件
cp /path/to/config-refactored/Constants.js config/
cp /path/to/config-refactored/AppError.js config/
cp /path/to/config-refactored/FileUtils.js config/
cp /path/to/config-refactored/CommandExecutor.js config/

# 复制你需要的模块
cp /path/to/config-refactored/logger-refactored.js config/
cp /path/to/config-refactored/dependency-manager-refactored.js config/
```

### Step 3: 第一次使用 (2 分钟)

```javascript
// 在你的代码中
const Constants = require('./config/Constants');
const FileUtils = require('./config/FileUtils');

// 读取配置
const config = FileUtils.readJSON('config.json');
console.log('当前环境:', Constants.ENVIRONMENTS.DEVELOPMENT);

// 写入数据
FileUtils.writeJSON('output.json', { status: 'ok' });
```

### Step 4: 第一个命令 (1 分钟)

```bash
# 查看所有可用命令
node config/scripts-refactored.js help

# 执行一个命令
node config/scripts-refactored.js config:check

# 查看输出
# ✅ 配置检查通过
# ✅ 日志系统正常
# ✅ 依赖已安装
```

### Step 5: 完成! (0 分钟)

你现在已经能使用这个系统了! 🎉

---

## 📚 8 个常用场景

### 场景 1: 读写文件

**场景**: 你需要读取一个 JSON 配置文件

```javascript
const FileUtils = require('./config/FileUtils');

// 读取 JSON 文件
try {
  const config = FileUtils.readJSON('config.json');
  console.log('数据库地址:', config.database.url);
  
  // 修改并保存
  config.database.url = 'new-url';
  FileUtils.writeJSON('config.json', config);
} catch (error) {
  console.error('操作失败:', error.message);
}
```

**相关 API**: 
- `FileUtils.readJSON(path)`
- `FileUtils.writeJSON(path, data)`
- `FileUtils.fileExists(path)`

---

### 场景 2: 执行命令

**场景**: 你需要执行 `npm install` 命令

```javascript
const CommandExecutor = require('./config/CommandExecutor');

try {
  // 方式 1: 执行任意命令
  CommandExecutor.execute('npm install');
  
  // 方式 2: 专门的 NPM 命令
  CommandExecutor.executeNpm('install');
  CommandExecutor.executeNpm('run', ['build']);
  
  // 方式 3: 检查命令是否可用
  if (CommandExecutor.isCommandAvailable('git')) {
    CommandExecutor.execute('git status');
  }
  
  // 方式 4: 获取版本
  const version = CommandExecutor.getCommandVersion('node');
  console.log('Node.js 版本:', version);
  
} catch (error) {
  console.error('执行失败:', error.message);
}
```

**相关 API**:
- `CommandExecutor.execute(command)`
- `CommandExecutor.executeNpm(subCommand, args)`
- `CommandExecutor.isCommandAvailable(command)`
- `CommandExecutor.getCommandVersion(command)`

---

### 场景 3: 使用常量

**场景**: 你需要检查环境是不是生产环境

```javascript
const Constants = require('./config/Constants');

// ❌ 不好的做法 - 硬编码字符串
if (process.env.NODE_ENV === 'production') {
  // ...
}

// ✅ 好的做法 - 使用常量
if (process.env.NODE_ENV === Constants.ENVIRONMENTS.PRODUCTION) {
  console.log('生产环境特殊处理');
}

// 所有可用常量:
console.log(Constants.ENVIRONMENTS);     // { DEVELOPMENT, TESTING, PRODUCTION }
console.log(Constants.LOG_LEVELS);       // { DEBUG, INFO, WARN, ERROR }
console.log(Constants.NPM_COMMANDS);     // { INSTALL, BUILD, START, ... }
```

**相关 API**:
- `Constants.ENVIRONMENTS.*`
- `Constants.LOG_LEVELS.*`
- `Constants.NPM_COMMANDS.*`
- 等等...

---

### 场景 4: 处理异常

**场景**: 配置文件不存在时，给出友好的错误提示

```javascript
const FileUtils = require('./config/FileUtils');
const { ConfigError, FileError } = require('./config/AppError');

try {
  const config = FileUtils.readJSON('config.json');
  
} catch (error) {
  // 根据错误类型处理
  if (error instanceof FileError) {
    console.error('配置文件不存在，请检查文件路径');
    console.error('详情:', error.toLog());
    
  } else if (error instanceof ConfigError) {
    console.error('配置格式错误');
    console.error('详情:', error.toLog());
    
  } else {
    console.error('未知错误:', error.message);
  }
  
  // 可以获取详细信息
  console.log('错误类型:', error.type);
  console.log('错误上下文:', error.context);
  console.log('完整日志:', error.toLog());
}
```

**异常类型**:
- `AppError` - 基础异常
- `ConfigError` - 配置相关
- `FileError` - 文件操作
- `CommandError` - 命令执行
- `LogError` - 日志相关
- `DependencyError` - 依赖相关
- 等等...

---

### 场景 5: 记录日志

**场景**: 你的应用启动时记录一些信息

```javascript
const logger = require('./config/logger-refactored');

// 不同级别的日志
logger.debug('这是调试信息，仅开发时显示');
logger.info('应用已启动，监听端口 3000');
logger.warn('数据库连接缓慢');
logger.error('数据库连接失败');

// 记录异常
try {
  // 一些可能出错的代码
  throw new Error('模拟错误');
} catch (error) {
  logger.logError(error, {
    context: 'database initialization',
    userId: 'user123'
  });
}

// 查看日志文件
// Linux/macOS: cat logs/application.log
// Windows: type logs\application.log
```

**相关 API**:
- `logger.debug(message)`
- `logger.info(message)`
- `logger.warn(message)`
- `logger.error(message)`
- `logger.logError(error, context)`

---

### 场景 6: 管理依赖

**场景**: 你需要检查依赖是否已安装

```javascript
const DependencyManager = require('./config/dependency-manager-refactored');

const manager = new DependencyManager();

// 检查依赖
const status = manager.checkDependencies();
console.log('依赖状态:', status);

if (status.status !== 'complete') {
  console.log('缺失的依赖:', status.missing);
  console.log('正在安装...');
  manager.installDependencies();
}

// 安全审计
manager.auditDependencies();

// 获取依赖信息
const express = manager.getDependencyInfo('express');
console.log('Express 版本:', express.version);
```

**相关 API**:
- `checkDependencies()`
- `installDependencies()`
- `auditDependencies()`
- `getDependencyInfo(packageName)`

---

### 场景 7: 部署应用

**场景**: 部署应用到生产环境前进行检查

```javascript
const Deployment = require('./config/deployment-refactored');

const deployment = new Deployment();

// 部署前检查所有项
deployment.checkAll();
// 检查项：
// ✅ 配置文件完整
// ✅ 日志系统正常
// ✅ 依赖已安装
// ✅ 数据库连接正常

// 设置环境
deployment.setEnvironment('production');

// 执行部署
deployment.deploy();

// 查看部署状态
const status = deployment.getDeploymentStatus();
console.log('部署状态:', status);
```

**相关 API**:
- `checkAll()`
- `setEnvironment(env)`
- `deploy()`
- `getDeploymentStatus()`

---

### 场景 8: 执行 CLI 命令

**场景**: 从命令行执行系统命令

```bash
# 查看所有命令
node config/scripts-refactored.js help

# 配置相关
node config/scripts-refactored.js config:check       # 检查配置
node config/scripts-refactored.js config:list        # 列出配置

# 系统检查
node config/scripts-refactored.js health:check       # 健康检查

# 依赖相关
node config/scripts-refactored.js dep:install        # 安装依赖
node config/scripts-refactored.js dep:audit          # 安全审计

# 部署相关
node config/scripts-refactored.js deploy:dev         # 部署到开发环境
node config/scripts-refactored.js deploy:test        # 部署到测试环境
node config/scripts-refactored.js deploy:prod        # 部署到生产环境
node config/scripts-refactored.js deploy:status      # 查看部署状态

# 日志相关
node config/scripts-refactored.js log:clear          # 清空日志
node config/scripts-refactored.js log:rotate         # 轮转日志
```

---

## 📂 文件结构

复制文件后，你的项目结构应该是:

```
your-project/
├── config/
│   ├── Constants.js                     新增
│   ├── AppError.js                      新增
│   ├── FileUtils.js                     新增
│   ├── CommandExecutor.js               新增
│   ├── logger-refactored.js             新增
│   ├── dependency-manager-refactored.js 新增
│   ├── deployment-refactored.js         新增
│   ├── scripts-refactored.js            新增
│   └── environments/
│       ├── development.json
│       ├── testing.json
│       └── production.json
├── logs/                                新建 (自动)
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

## ✅ 集成检查清单

完成以下步骤，确保集成正确:

```
□ 复制了所有 4 个工具文件
□ 复制了需要的核心模块文件
□ 在代码中导入了工具类
□ 执行了第一个命令
□ 日志文件能正常创建
□ 日志能正常写入
□ 异常能被正常捕获
□ 文件读写能正常工作
□ 所有命令都能执行
□ 测试环境验证通过
```

---

## 🔧 常见问题

### Q1: 找不到模块？

**问题**: `Cannot find module './config/Constants'`

**解决**:
```javascript
// 检查路径是否正确
// 应该是: ./config/Constants.js 或 ./config/Constants
// 确保文件真的存在在那个位置

// 正确做法:
const Constants = require('./config/Constants');
```

### Q2: 命令执行出错？

**问题**: `CommandExecutor.executeNpm is not a function`

**解决**:
```javascript
// 确保导入了 CommandExecutor
const CommandExecutor = require('./config/CommandExecutor');

// 检查方法名是否正确
// executeNpm() 还是其他名字?
// 查看 API_REFERENCE.md 确认
```

### Q3: 找不到配置文件？

**问题**: 读取配置时异常 `ENOENT: no such file or directory`

**解决**:
```javascript
// 确保文件存在
const FileUtils = require('./config/FileUtils');

// 先检查文件是否存在
if (FileUtils.fileExists('config.json')) {
  const config = FileUtils.readJSON('config.json');
} else {
  console.log('配置文件不存在');
}
```

### Q4: 日志文件在哪里？

**问题**: 看不到日志输出

**解决**:
```javascript
// 日志文件位置
// Linux/macOS:
cat logs/development.log

// Windows:
type logs\development.log

// 或者在代码中查询日志路径
const logger = require('./config/logger-refactored');
console.log('日志路径:', logger.getLogPath());
```

---

## 🎓 下一步学习

### 1. 理解各个模块 (20 分钟)

阅读 **API_REFERENCE.md**，了解:
- 每个工具类的所有方法
- 参数和返回值
- 使用示例

### 2. 了解团队协作 (10 分钟)

阅读 **TEAM_GUIDE.md**，了解:
- 谁负责什么
- 如何沟通
- 常见命令

### 3. 学习系统设计 (30 分钟)

阅读 **ARCHITECTURE.md**，了解:
- 系统如何设计
- 为什么这样设计
- 如何扩展

### 4. 查看代码注释 (随时)

打开文件，查看代码中的 JSDoc 注释:

```javascript
/**
 * 读取 JSON 文件并返回解析结果
 * @param {string} filePath - 文件路径
 * @returns {Object} 解析后的 JSON 对象
 * @throws {FileError} 当文件不存在或格式错误
 * @example
 * const config = FileUtils.readJSON('config.json');
 */
static readJSON(filePath) { }
```

---

## 📞 需要帮助？

| 问题 | 查看文档 |
|------|--------|
| API 怎么用？ | API_REFERENCE.md |
| 出错了怎么办？ | TROUBLESHOOTING.md |
| 怎么部署？ | GETTING_STARTED.md (部署章节) |
| 设计理念是什么？ | ARCHITECTURE.md |
| 团队怎么分工？ | TEAM_GUIDE.md |

---

## 🎊 总结

你现在已经:
- ✅ 了解了系统的 8 个模块
- ✅ 复制了所有文件
- ✅ 学会了 8 个常用场景
- ✅ 知道了常见问题的解决方法

**现在就开始使用吧！** 💪

---

**版本**: 2.0.0  
**最后更新**: 2026年3月  
**作者**: 开发团队

**下一步**: 
1. 复制文件到项目
2. 查看 API_REFERENCE.md 了解具体 API
3. 在代码中开始使用
4. 遇到问题查看 TROUBLESHOOTING.md