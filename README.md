# AI Coding Agent 配置实录

> 实测记录，不是教程。基于 WSL2 Ubuntu + Windows 11 环境。

## 目录

- [Claude Code](./claude-code/) — 上下文窗口修复、Clawd hooks、第三方供应商配置
- [Codex Desktop](./codex-desktop/) — 第三方模型 provider 配置
- [OpenCode](./opencode/) — 桌面版缓存清理、Skills 同步、浏览器调试
- [附录](./appendix/) — 相关命令速查、路径清单

---

## 背景环境

```
OS:     WSL2 Ubuntu 26.04 + Windows 11
WSL:    Hermes / Claude Code / OpenCode CLI
宿主机:  OpenCode Desktop / Codex Desktop
GPU:    RTX 3050 4GB (Windows), CUDA 12.4 (WSL)
代理:   Clash Verge :7897
```
