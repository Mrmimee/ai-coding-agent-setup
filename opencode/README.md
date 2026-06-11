# OpenCode 配置记录

## 环境

```
WSL CLI:   /home/mnb77/.config/opencode/opencode.jsonc
桌面版:     C:\Users\mnb77\.config\opencode\opencode.jsonc
            C:\Users\mnb77\AppData\Local\Programs\@opencode-aidesktop\OpenCode.exe
```

**重点：** 桌面版和 WSL CLI 的配置文件各自独立，互不共享。

---

## 桌面版缓存彻底清理

**场景：** 桌面版模型/API Key 配乱了，或者卡住想重置。

**清理内容：**

| 文件/目录 | 路径 | 说明 |
|-----------|------|------|
| cache | `C:\Users\mnb77\.cache\opencode\` | 运行时缓存 |
| DB | `C:\Users\mnb77\.local\share\opencode\opencode.db` | 会话数据（~175MB） |
| account | `C:\Users\mnb77\.local\share\opencode\account.json` | 账户信息 |
| auth | `C:\Users\mnb77\.local\share\opencode\auth.json` | 认证令牌 |
| global.dat | `C:\Users\mnb77\AppData\Roaming\ai.opencode.desktop\opencode.global.dat` | 全局配置 |

**执行清理（从 WSL）：**
```bash
rm -rf /mnt/c/Users/mnb77/.cache/opencode/
rm -f /mnt/c/Users/mnb77/.local/share/opencode/account.json
rm -f /mnt/c/Users/mnb77/.local/share/opencode/auth.json
rm -f /mnt/c/Users/mnb77/.local/share/opencode/opencode.db
rm -f "/mnt/c/Users/mnb77/AppData/Roaming/ai.opencode.desktop/opencode.global.dat"
```

**保留：** 键盘映射等用户偏好（`opencode.settings` 文件不动）。

清完后桌面版下次启动会像第一次一样引导你配置模型和 API Key。

---

## Skills 配置

从 WSL CLI 同步 skills 到桌面版 OpenCode（Windows）：

```bash
# 复制 skills 目录
cp -r ~/.opencode/skills/* /mnt/c/Users/mnb77/.opencode/skills/
```

注意：桌面版的 MCP 在 Windows 上跑，需要 Windows 有 Node.js。

---

## WSL OpenCode CLI 操作 Windows Chrome

**方案：** Chrome DevTools Protocol (CDP) 端口转发

```
Windows Chrome ←[CDP:9222]→ host.docker.internal:9222 → WSL OpenCode
```

Windows 端启动 Chrome 调试端口：
```bash
# Chrome
chrome.exe --remote-debugging-port=9222 --user-data-dir="C:\Users\mnb77\AppData\Local\Temp\chrome-debug"

# Edge（理论上也可用，但 CDP 稳定性不如 Chrome）
msedge.exe --remote-debugging-port=9222 --user-data-dir="C:\Users\mnb77\AppData\Local\Temp\edge-debug"
```

WSL 端连 `host.docker.internal:9222`。

**坑：** 官方 `chrome-devtools-mcp` 只声明支持 Chrome，Edge 有兼容性问题。

---

## 相关 GitHub 项目

| 项目 | 方向 | 推荐理由 |
|------|------|----------|
| kalil0321/reverse-api-engineer | Web API 逆向 | 自动抓网页请求生成 API 客户端 |
| zhaoxuya520/reverse-skill | 逆向全栈 | 中文，AI 自动路由 + 工具链自举 |
