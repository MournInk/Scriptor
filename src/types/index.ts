export interface Article {
  id: string;
  title: string;
  source: string;
  publishTime: Date;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  apiKey: string;
  theme: 'light' | 'dark' | 'system';
  autoSave: boolean;
  fontSize: number;
  language: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}