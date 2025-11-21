import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { LECTURE_CONTENT, GLOSSARY_TERMS } from '../constants';
import GlossaryTerm from './GlossaryTerm';

interface SourceReaderProps {
  sectionKey: string;
  defaultOpen?: boolean;
}

const SourceReader: React.FC<SourceReaderProps> = ({ sectionKey, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const content = LECTURE_CONTENT[sectionKey];

  // Helper to highlight terms in text
  const processText = (text: string) => {
    if (!text) return null;

    // 1. Collect all patterns with their keys
    const allPatterns: { key: string; pattern: string }[] = [];
    Object.entries(GLOSSARY_TERMS).forEach(([key, term]) => {
      term.patterns.forEach(pattern => {
        if (pattern) allPatterns.push({ key, pattern });
      });
    });

    // 2. Sort by length desc to match longest terms first (e.g. "الشركة التجارية" before "الشركة")
    allPatterns.sort((a, b) => b.pattern.length - a.pattern.length);

    // 3. Create Regex
    if (allPatterns.length === 0) return text;
    
    // Escape regex special chars
    const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const patternString = allPatterns.map(p => escapeRegExp(p.pattern)).join('|');
    const regex = new RegExp(`(${patternString})`, 'g');

    // 4. Split and Map
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      // Find if this part matches any pattern
      const match = allPatterns.find(p => p.pattern === part);
      if (match) {
        return (
          <GlossaryTerm key={`${match.key}-${index}`} termKey={match.key}>
            {part}
          </GlossaryTerm>
        );
      }
      return part;
    });
  };

  if (!content) return null;

  return (
    <div className="w-full my-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 border ${
          isOpen 
            ? 'bg-slate-800 text-white border-slate-800 rounded-b-none' 
            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isOpen ? 'bg-white/10' : 'bg-slate-100'}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-right">{content.title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-b-xl border border-t-0 border-slate-200 bg-slate-50/50"
          >
            <div className="p-6 font-serif text-lg leading-loose text-slate-800 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-200 rotate-180" />
              
              <div className="space-y-4 relative z-10">
                {content.text.map((paragraph, idx) => (
                  <p key={idx} className="text-justify border-r-2 border-slate-300 pr-4">
                    {processText(paragraph)}
                  </p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-400 flex flex-wrap justify-between items-center gap-2">
                <span>المصدر: مطبوعة محاضرات في الشركات التجارية - د. ضيف شعيب</span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">نص مشروح: انقر على الكلمات المظللة</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SourceReader;