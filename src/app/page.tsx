'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSortedArticles } from '@/data/articles';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import Link from 'next/link';
import { Edit3, Clock, ExternalLink } from 'lucide-react';

export default function Home() {
  const articles = getSortedArticles();

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">文章列表</h1>
          <p className="text-muted-foreground mt-2">
            管理您的文章内容，点击文章查看详情或进行改写
          </p>
        </div>

        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl">
                  <Link 
                    href={`/article/${article.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                </CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/editor?article=${article.id}`}>
                    <Edit3 className="h-4 w-4 mr-1" />
                    改写
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {article.source}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDistanceToNow(article.publishTime, { 
                        addSuffix: true, 
                        locale: zhCN 
                      })}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm line-clamp-2">
                  {article.content.replace(/#+\s/g, '').slice(0, 120)}...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
