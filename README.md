# My Blog — 个人博客

一个简洁的个人博客，包含**主页**、**日常随笔**、**学习笔记**、**数字炸弹游戏**四个板块。红白配色，现代风格。

## 技术栈

- **[Astro](https://astro.build)** — 静态站点生成器
- **[Tailwind CSS](https://tailwindcss.com)** — 样式框架
- **轻量自研后台**（`/admin`，GitHub Token 直连 API）
- **GitHub Pages** — 免费托管

## 本地运行

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器 → http://localhost:4321
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
npm run check        # 类型检查（astro check）
npm run lint         # ESLint 检查
npm run format       # Prettier 格式化
npm test             # 单元测试（Vitest）
```

## 如何部署到 GitHub Pages

### 1. 创建 GitHub 仓库

在 GitHub 创建一个**公开**仓库，例如 `my-blog`。

### 2. 修改配置

编辑 `astro.config.mjs`，将占位符替换为你的实际值：

```js
site: 'https://<你的GitHub用户名>.github.io',
base: '/<你的仓库名>',
```

编辑 `public/admin/index.html` 顶部的 API 地址，指向你的仓库：

```js
const API = 'https://api.github.com/repos/<你的GitHub用户名>/<你的仓库名>';
```

### 3. 推送代码

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<你的用户名>/<你的仓库名>.git
git push -u origin main
```

### 4. 启用 GitHub Pages

1. 打开仓库 → Settings → Pages
2. Source 选择 **GitHub Actions**
3. 推送后会自动触发部署

### 5. 配置后台 Token（一次性）

后台使用 GitHub 个人访问令牌（PAT）读写仓库内容。

1. 打开 [Fine-grained PAT 创建页](https://github.com/settings/personal-access-tokens/new)
2. **Repository access** 选择 **Only select repositories**，勾选博客仓库
3. 在 **Permissions** 中把 **Contents** 设为 **Read and write**
4. 有效期建议 30~90 天
5. 部署完成后，访问 `https://<你的用户名>.github.io/<仓库名>/admin`，填入 Token 登录

> Token 只保存在当前浏览器会话中（关闭标签页后需重新登录），请勿授予整个账号的 `repo` 权限。

## 如何更新内容

1. 打开 `https://<你的用户名>.github.io/<仓库名>/admin`
2. 输入 GitHub Token 登录
3. 在左侧选择"日常随笔"或"学习笔记"
4. 点击"新建"开始写作
5. 写完后点击"保存并发布"，内容会自动提交到 GitHub，CI 随即自动部署

## 项目结构

```
src/
├── components/          # 组件（Header, Footer, Layout, 等）
├── content/
│   ├── essays/          # 日常随笔（Markdown 文件）
│   └── notes/           # 学习笔记（Markdown 文件）
├── pages/
│   ├── index.astro      # 主页
│   ├── daily/           # 日常板块
│   ├── notes/           # 笔记板块
│   └── fun.astro        # 娱乐板块
├── styles/global.css    # 全局样式
├── consts.ts            # 站点常量（标题、导航等）
└── utils.ts             # 工具函数

public/
├── admin/               # 自研后台（GitHub Token 登录）
└── images/              # 图片资源
```

## License

MIT
