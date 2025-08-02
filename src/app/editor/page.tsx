'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getArticleById } from '@/data/articles';
import { ChatMessage } from '@/types';
import { Send, Save, Download } from 'lucide-react';

// 动态导入 markdown 编辑器以避免 SSR 问题
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

function EditorContent() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get('article');
  const [markdown, setMarkdown] = useState('# 开始您的创作\n\n在这里输入您的内容...');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (articleId) {
      const article = getArticleById(articleId);
      if (article) {
        setMarkdown(article.content);
      }
    }
  }, [articleId]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // 模拟 AI 响应
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `我理解您想要${inputMessage}。作为 AI 助手，我建议您可以：\n\n1. 考虑文章的整体结构\n2. 确保内容逻辑清晰\n3. 使用合适的标题层级\n\n需要我帮您改写或优化特定的段落吗？`,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSave = () => {
    // 实际项目中这里会保存到后端或本地存储
    console.log('保存文档:', markdown);
    alert('文档已保存！');
  };

  const handleExport = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full">
      {/* 左侧 Markdown 编辑器 */}
      <div className="flex-1 flex flex-col border-r">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Markdown 编辑器</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>
        </div>
        
        <div className="flex-1 p-4">
          <MDEditor
            value={markdown}
            onChange={(val) => setMarkdown(val || '')}
            height={600}
            data-color-mode="light"
          />
        </div>
      </div>

      {/* 右侧 AI 聊天 */}
      <div className="w-96 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">AI 助手</h2>
          <p className="text-sm text-muted-foreground mt-1">
            与 AI 协作改进您的文章
          </p>
        </div>

        {/* 聊天消息 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.length === 0 && (
            <div className="text-center text-muted-foreground">
              <p>开始与 AI 对话，获取写作建议</p>
            </div>
          )}
          
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[80%] ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-muted">
                <CardContent className="p-3">
                  <p className="text-sm">AI 正在思考...</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* 输入区域 */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="向 AI 提问或寻求建议..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="sm" onClick={handleSendMessage} disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="flex items-center justify-center h-full">加载中...</div>}>
        <EditorContent />
      </Suspense>
    </MainLayout>
  );
}