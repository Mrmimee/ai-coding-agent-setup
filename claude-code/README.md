# Claude Code 配置记录

## 第三方供应商上下文窗口修复

**问题：** 第三方供应商（DeepSeek 等支持 1M 上下文的模型）被 Claude Code 默认检测为 200K。

**修复：**
```bash
export CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576
```

持久化写到 `~/.claude/settings.json`：
```json
{
  "env": {
    "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "1048576"
  }
}
```

**关联：** skill `wsl-environment-troubleshooting` §6

---

## Clawd hooks 安装

**场景：** 让 WSL 里的 Claude Code 把操作事件推送给 Windows 端的 Clawd on Desk 桌面宠物。

**步骤：**
1. 从 Clawd Windows 安装目录复制 hooks：
   ```bash
   cp -r "/mnt/c/Program Files/Clawd on Desk/resources/app.asar.unpacked/hooks" ~/.claude/hooks/
   ```

2. 以 --remote 模式运行安装（适配 WSL 场景）：
   ```bash
   node ~/.claude/hooks/install.js --remote
   ```

3. 验证连通性：
   ```bash
   curl -X POST http://127.0.0.1:23333/state -H "Content-Type: application/json" -d '{"agent":"hermes","state":"testing"}'
   # 应返回 HTTP 200 "ok"，header x-clawd-server: clawd-on-desk
   ```

**注册结果：** 14 个事件 + HTTP PermissionRequest，11 个旧路径被更新。

**坑：** Hermes 本身不通过 hooks 推送，而是通过 Hermes plugin（clawd-on-desk）直接 POST 到 Clawd。但 Hermes 在 WSL、Clawd 在 Windows，Windows 侧找不到 `.hermes/` 目录会显示 "not-installed"。

**修复 not-installed：**
```bash
# 把 Hermes 配置复制到 Windows 侧
cp ~/.hermes/config.yaml "/mnt/c/Users/mnb77/.hermes/config.yaml"
# 复制插件目录
cp -r ~/.hermes/plugins/clawd-on-desk "/mnt/c/Users/mnb77/.hermes/plugins/"
```
重启 Clawd Desktop 即可。

---

## 第三方供应商配置

### DeepSeek（环境变量方式）

```bash
export ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
export ANTHROPIC_AUTH_TOKEN="sk-your-key"
export ANTHROPIC_MODEL="deepseek-v4-flash"
export CLAUDE_CODE_MAX_CONTEXT_TOKENS="1048576"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC="1"
export API_TIMEOUT_MS="3000000"
```

### OpenRouter

```bash
export ANTHROPIC_BASE_URL="https://openrouter.ai/api"
export ANTHROPIC_AUTH_TOKEN="sk-or-your-key"
export ANTHROPIC_API_KEY=""    # 必须为空字符串，否则 401
export ANTHROPIC_MODEL="openrouter/free"
```

**关键坑：**
- 环境变量会覆盖 OAuth 登录。设了就 `/login` 无效。
- 切回官方：`unset ANTHROPIC_BASE_URL ANTHROPIC_AUTH_TOKEN ANTHROPIC_MODEL`
- `ANTHROPIC_DEFAULT_SONNET_MODEL` / `OPUS` / `HAIKU` 三个都要填同一模型，否则请求不存在的模型名
