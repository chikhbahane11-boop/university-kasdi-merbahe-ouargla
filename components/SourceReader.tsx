import React, { useState, useMemo } from 'react';
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

  // Memoize the regex generation to avoid performance cost on re-renders
  const processedContent = useMemo(() => {
    if (!content) return null;

    // 1. Collect all patterns
    const allPatterns: { key: string; pattern: string }[] = [];
    Object.entries(GLOSSARY_TERMS).forEach(([key, term]) => {
      term.patterns.forEach(pattern => {
        if (pattern && pattern.trim().length > 2) { // Only match significant words
            allPatterns.push({ key, pattern });
        }
      });
    });

    // 2. Sort by length (descending) to ensure "الشركة التجارية" matches before "الشركة"
    allPatterns.sort((a, b) => b.pattern.length - a.pattern.length);

    // 3. Function to process a single string paragraph
    const processParagraph = (text: string) => {
      if (!text) return null;

      // Create a regex that matches any of the patterns
      // We use capture groups () to include the delimiter in the result array
      const patternString = allPatterns.map(p => p.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      
      if (!patternString) return text;

      const regex = new RegExp(`(${patternString})`, 'g');
      const parts = text.split(regex);

      return parts.map((part, index) => {
        // Check if this part is a keyword
        const match = allPatterns.find(p => p.pattern === part);
        if (match) {
          return (
            <GlossaryTerm key={`${match.key}-${index}`} termKey={match.key}>
              <span className="bg-yellow-100/50 border-b-2 border-yellow-400/50 pb-0.5 cursor-help transition-colors hover:bg-yellow-200">
                {part}
              </span>
            </GlossaryTerm>
          );
        }
        return part;
      });
    };

    return content.text.map(processParagraph);
  }, [content]);

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
                {processedContent?.map((paragraph, idx) => (
                  <p key={idx} className="text-justify border-r-2 border-slate-300 pr-4 pl-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-400 flex flex-wrap justify-between items-center gap-2">
                <span>المصدر: مطبوعة محاضرات في الشركات التجارية</span>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold">نص تفاعلي: انقر على الكلمات الملونة للشرح</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SourceReader;