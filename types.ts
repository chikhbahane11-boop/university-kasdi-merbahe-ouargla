import { LucideIcon } from 'lucide-react';

// مراحل التطبيق
export enum Stage {
  INTRO = 'INTRO',
  CONCEPTS = 'CONCEPTS',
  HISTORY = 'HISTORY',
  APPLICATION = 'APPLICATION',
  CONCLUSION = 'CONCLUSION'
}

// عنصر القائمة الجانبية
export interface NavItem {
  id: Stage;
  label: string;
  icon: LucideIcon;
}

// حدث في الخط الزمني
export interface TimelineEvent {
  id: string;
  year: string;
  civilization: string; // يمثل المرحلة القانونية هنا
  title: string;
  description: string;
  icon: 'users' | 'briefcase' | 'building'; // أسماء الأيقونات كنص
  principles: string[];
}

// سؤال الاختيار من متعدد
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
