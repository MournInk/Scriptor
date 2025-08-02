'use client';

import { use } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getArticleById } from '@/data/articles';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ArrowLeft, Edit3, Clock, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { id } = use(params);
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <Button variant="outline" className="mb-4" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回列表
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {article.source}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {format(article.publishTime, 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
                  </div>
                </div>
              </div>
              
              <Button className="ml-4" asChild>
                <Link href={`/editor?article=${article.id}`}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  改写此文章
                </Link>
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="prose prose-gray max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {article.content}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}