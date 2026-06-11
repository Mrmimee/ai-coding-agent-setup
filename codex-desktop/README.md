# Codex Desktop 配置记录

## 第三方模型配置（config.toml 方式）

**关键事实：** 与 Claude Code 不同，Codex Desktop **不读环境变量**，全部在 `config.toml` 配。

**路径：**
```
%USERPROFILE%\.codex\config.toml
# 在 WSL 中访问：
/mnt/c/Users/mnb77/.codex/config.toml
```

### 配置结构

```toml
model = "模型名"
model_provider = "供应商代号"

[model_providers.供应商代号]
name = "显示名称"
base_url = "API 地址"
env_key = "环境变量名"      # Windows 用户环境变量
wire_api = "chat|responses" # 协议类型
```

### 已实测：OpenRouter + Responses API

Codex Desktop 当前在用 OpenRouter，`wire_api = "responses"`，模型 `openrouter/owl-alpha`。

### 示例：加 DeepSeek

```toml
model = "deepseek-chat"
model_provider = "deepseek"

[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com/v1"
env_key = "DEEPSEEK_API_KEY"
wire_api = "chat"
```

然后在 Windows 用户环境变量里设 `DEEPSEEK_API_KEY=sk-xxx...`。

**注意：**
- DeepSeek 只支持 Chat Completions（`wire_api = "chat"`），不支持 Responses
- Chat 模式可能缺部分高级功能
- Codex Desktop 有 ~258K token 硬 cap，模型支持 1M 也没用

### Codex CLI

Codex Desktop 自带 CLI（`codex.exe` 在 `%LOCALAPPDATA%\OpenAI\Codex\bin\`），**和桌面版共用一个 config.toml**，改配置两边都生效。
