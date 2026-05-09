# 个人网站生成指南

## 项目概述

- **目标**：创建一个简洁、现代的个人网站，展示个人信息、技能、项目作品和联系方式。
- **技术栈**：
  - Vue 3 + Vite
  - TypeScript (可选)
  - Tailwind CSS
  - 部署：Vercel

- **网站风格**：
  - 极简设计，明亮配色（#f8fafc 背景, #1f2937 文字）
  - 响应式布局，支持移动端
  - 卡片式项目展示
  - 交互动画可选，平滑滚动

## 页面结构

### 1. 首页 (Hero)
- 显示姓名、职位、简短自我介绍
- CTA 按钮：
  - 查看作品 → 跳转到项目部分
  - 联系我 → 邮箱链接或表单
- 可包含头像或背景图

### 2. 关于我 (About)
- 技能栈：
  - Vue 3, TypeScript, Element Plus, VXE-Table
  - 前端工程化、组件化开发经验
- 个人简介：
  - 教育背景
  - 工作经验
  - 主要方向

### 3. 项目作品 (Projects)
- 每个项目卡片：
  - 项目名称
  - 简短描述
  - 技术栈
  - 项目链接或 Demo
- 可采用 Grid 布局

### 4. 联系方式 (Contact)
- 邮箱
- GitHub / GitLab
- LinkedIn
- 微信二维码（可选）

## UI 设计和样式

- **字体**：系统字体或 Google Fonts，例如 `Inter`  
- **颜色**：
  - 主色：#3b82f6（蓝色，用于按钮和高亮）
  - 背景色：#f8fafc
  - 文本色：#1f2937 (深灰), #6b7280 (次级灰)
- **按钮样式**：
  - 主按钮：圆角大、背景蓝色、白色文字、hover 加深蓝色
  - 边框按钮：白底灰边、hover 改变背景或边框颜色

- **布局**：
  - 最大宽度：`max-w-5xl`
  - 居中排列 `mx-auto`
  - 内边距：`px-6 py-16` 或 `py-24`

- **动画效果**：
  - hover 变色、缩放
  - 页面平滑滚动

## 组件结构 (Vue)

```text
src/
  assets/
  components/
    Hero.vue
    About.vue
    Projects.vue
    Contact.vue
  App.vue
  main.ts
```

### 示例组件 (Hero.vue)
```vue
<template>
  <section class="min-h-screen flex flex-col justify-center items-center bg-[#f8fafc] text-slate-900">
    <p class="text-sm font-medium text-blue-600">Hello, I'm</p>
    <h1 class="text-5xl font-bold">林嘉铧</h1>
    <p class="mt-6 text-lg text-slate-600 max-w-xl text-center">
      我是一名前端开发者，专注于 Vue 3、TypeScript、组件化开发和中后台系统建设。
    </p>
    <div class="mt-10 flex gap-4">
      <a href="#projects" class="rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700">查看作品</a>
      <a href="mailto:your-email@example.com" class="rounded-xl border border-slate-300 px-5 py-3 hover:bg-white">联系我</a>
    </div>
  </section>
</template>
```

## 交互行为

- 点击导航或按钮滚动到对应模块
- 项目卡片 hover 显示更多信息
- 联系方式按钮点击后打开邮箱或跳转外部链接
- 可选：添加暗黑模式切换

## 部署指南

1. 将项目推送到 GitHub
2. 登录 Vercel → New Project → 导入 GitHub 仓库
3. 配置：
   - Framework Preset：Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. 点击 Deploy
5. 可选：绑定自定义域名，Vercel 自动生成 HTTPS

## AI 使用说明

- 使用这份 Markdown 指南作为网站内容和布局说明
- AI 需要生成：
  - 完整 Vue 3 + Vite 项目文件
  - Tailwind CSS 配置
  - 页面组件 (Hero/About/Projects/Contact)
  - 简单路由 (如有多页)
- 可以进一步给 AI 提供个人信息和项目作品列表，以生成具体内容
