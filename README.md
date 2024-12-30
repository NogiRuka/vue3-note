# Vue3 Note

一个使用 Vue 3 + TypeScript + Vite 构建的现代笔记应用。

## 特性

- 📝 简洁的笔记编辑界面
- 💾 自动保存到本地存储
- 📱 响应式设计，支持移动端和桌面端
- ⚡️ 快速的性能表现
- 🔧 PWA 支持，可离线使用
- 🎨 使用 UnoCSS 的现代化 UI

## 技术栈

- Vue 3
- TypeScript
- Vite
- Pinia
- VueUse
- UnoCSS
- PWA

## 开始使用

### 安装依赖

```bash
pnpm install
```

### 开发环境运行

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 项目结构

```
src/
├── components/        # 组件
│   ├── NoteList.vue  # 笔记列表组件
│   └── NoteEditor.vue # 笔记编辑器组件
├── stores/           # Pinia 状态管理
│   └── notes.ts      # 笔记状态管理
├── types/            # TypeScript 类型定义
│   └── note.ts       # 笔记相关类型
└── App.vue           # 根组件
```

## 功能

- 创建、编辑、删除笔记
- 自动保存
- 响应式布局
- 离线支持
- 持久化存储

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

[MIT](LICENSE)
