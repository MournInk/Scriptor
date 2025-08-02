import { Article } from '@/types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'AI 在软件开发中的应用前景',
    source: '技术博客',
    publishTime: new Date('2024-01-15T10:30:00Z'),
    content: `# AI 在软件开发中的应用前景

人工智能正在彻底改变软件开发的方式。从代码生成到自动化测试，AI 技术正在为开发者提供强大的工具。

## 主要应用领域

### 1. 代码生成与补全
AI 可以根据开发者的意图自动生成代码，大大提高开发效率。

### 2. 自动化测试
通过机器学习算法，AI 可以自动生成测试用例并发现潜在的 bug。

### 3. 代码审查
AI 可以分析代码质量，提供改进建议。

## 未来展望

随着技术的不断发展，AI 将在软件开发中发挥越来越重要的作用。`,
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: '2',
    title: 'Next.js 14 新特性详解',
    source: 'React 周刊',
    publishTime: new Date('2024-01-12T08:15:00Z'),
    content: `# Next.js 14 新特性详解

Next.js 14 带来了许多令人兴奋的新特性和改进。

## 主要更新

### 1. Turbopack 稳定版
全新的构建工具，比 Webpack 快 700 倍。

### 2. 服务器组件改进
更好的性能和开发体验。

### 3. 部分预渲染
提供更灵活的渲染策略。

这些更新将大大提升开发者的体验和应用性能。`,
    createdAt: new Date('2024-01-12T08:15:00Z'),
    updatedAt: new Date('2024-01-12T08:15:00Z'),
  },
  {
    id: '3',
    title: 'TypeScript 5.3 发布说明',
    source: 'TypeScript 官方',
    publishTime: new Date('2024-01-10T14:20:00Z'),
    content: `# TypeScript 5.3 发布说明

TypeScript 5.3 版本带来了多项重要改进。

## 新特性

### 1. 导入属性
支持新的导入语法，提供更好的模块管理。

### 2. 类型缩窄改进
更智能的类型推断和缩窄。

### 3. 性能优化
编译速度提升 10-20%。

这些改进将让 TypeScript 开发更加高效。`,
    createdAt: new Date('2024-01-10T14:20:00Z'),
    updatedAt: new Date('2024-01-10T14:20:00Z'),
  },
  {
    id: '4',
    title: 'React 18 并发特性深度解析',
    source: 'React 官方博客',
    publishTime: new Date('2024-01-08T16:45:00Z'),
    content: `# React 18 并发特性深度解析

React 18 引入了强大的并发特性，让应用更加流畅。

## 核心概念

### 1. 自动批处理
React 会自动批处理多个状态更新，减少重渲染次数。

### 2. Suspense 改进
更好的异步数据加载体验。

### 3. 并发渲染
允许 React 在后台准备新的 UI。

这些特性让 React 应用的用户体验达到新的高度。`,
    createdAt: new Date('2024-01-08T16:45:00Z'),
    updatedAt: new Date('2024-01-08T16:45:00Z'),
  },
  {
    id: '5',
    title: 'Tailwind CSS 3.4 新功能介绍',
    source: 'CSS 技术周刊',
    publishTime: new Date('2024-01-05T12:00:00Z'),
    content: `# Tailwind CSS 3.4 新功能介绍

Tailwind CSS 3.4 版本带来了许多实用的新功能。

## 重要更新

### 1. 动态颜色函数
支持更灵活的颜色处理。

### 2. 容器查询
原生支持容器查询，响应式设计更加强大。

### 3. 性能优化
构建速度提升，文件大小减少。

这些改进让 Tailwind 成为更强大的 CSS 框架。`,
    createdAt: new Date('2024-01-05T12:00:00Z'),
    updatedAt: new Date('2024-01-05T12:00:00Z'),
  },
];

// 按时间排序（最新到最旧）
export const getSortedArticles = (): Article[] => {
  return [...mockArticles].sort((a, b) => 
    new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
  );
};

export const getArticleById = (id: string): Article | undefined => {
  return mockArticles.find(article => article.id === id);
};