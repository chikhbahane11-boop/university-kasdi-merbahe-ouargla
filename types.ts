import React from 'react';

export enum Stage {
  INTRO = 'intro',
  CONCEPTS = 'concepts',
  HISTORY = 'history',
  APPLICATION = 'application',
  CONCLUSION = 'conclusion'
}

export interface TimelineEvent {
  id: string;
  year: string;
  civilization: string;
  title: string;
  description: string;
  icon: string;
  principles: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface NavItem {
  id: Stage;
  label: string;
  icon: React.ElementType;
}