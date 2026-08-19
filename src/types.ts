export interface IssueItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  actionText: string;
  quote: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  summary: string;
  details: string[];
  benefits: string[];
  sessionDuration: string;
  glowColor: string;
  image?: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  subtitle: string;
  url: string;
  thumbnail?: string;
  category: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    text: string;
    chakraHint?: string;
  }[];
}
