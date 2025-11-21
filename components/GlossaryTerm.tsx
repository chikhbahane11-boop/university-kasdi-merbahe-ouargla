import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GLOSSARY_TERMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface GlossaryTermProps {
  termKey: string;
  children: React.ReactNode;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ termKey, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, isTop: true });
  const [arrowOffset, setArrowOffset] = useState(0);
  
  const triggerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const termData = GLOSSARY_TERMS[termKey];

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const viewportWidth = window.innerWidth;
    
    const TOOLTIP_WIDTH = 288; // equivalent to w-72
    const TOOLTIP_HEIGHT_ESTIMATE = 180; 
    const GAP = 12;
    const PADDING = 16;

    // 1. Horizontal Positioning
    const centerOfTrigger = rect.left + scrollX + (rect.width / 2);
    const idealLeft = centerOfTrigger - (TOOLTIP_WIDTH / 2);
    
    // Clamp to viewport edges
    const minLeft = scrollX + PADDING;
    const maxLeft = scrollX + viewportWidth - TOOLTIP_WIDTH - PADDING;
    const left = Math.max(minLeft, Math.min(idealLeft, maxLeft));

    // Calculate arrow position relative to the tooltip
    // The arrow should point to centerOfTrigger.
    // arrowPos is the distance from the left edge of the tooltip box.
    const rawArrowPos = centerOfTrigger - left;
    // Clamp arrow so it doesn't detach from the corners of the tooltip
    const clampedArrowPos = Math.max(12, Math.min(rawArrowPos, TOOLTIP_WIDTH - 12));

    // 2. Vertical Positioning
    // Check space above relative to viewport
    const spaceAbove = rect.top;
    const isTop = spaceAbove > TOOLTIP_HEIGHT_ESTIMATE;
    
    let top;
    if (isTop) {
        top = rect.top + scrollY - GAP;
    } else {
        top = rect.bottom + scrollY + GAP;
    }

    setCoords({ top, left, isTop });
    setArrowOffset(clampedArrowPos);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updatePosition();
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 200);
  };

  // Close on scroll or resize to prevent detached tooltips
  useEffect(() => {
    if (isVisible) {
        const handleScroll = () => setIsVisible(false);
        const handleResize = () => setIsVisible(false);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!termData) return <>{children}</>;

  return (
    <>
      <span 
        ref={triggerRef}
        className="border-b-2 border-dotted border-indigo-400 hover:bg-indigo-100 hover:text-indigo-800 transition-colors rounded px-0.5 font-medium cursor-help inline-block select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          e.stopPropagation();
          if (isVisible) setIsVisible(false);
          else { updatePosition(); setIsVisible(true); }
        }}
      >
        {children}
      </span>
      
      {createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: coords.isTop ? '-95%' : '5%' }}
              animate={{ opacity: 1, scale: 1, y: coords.isTop ? '-100%' : '0%' }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute z-[9999] w-72 p-4 bg-slate-800/95 backdrop-blur-sm text-white rounded-xl shadow-2xl text-right pointer-events-none border border-slate-700/50"
              style={{ 
                  top: coords.top,
                  left: coords.left,
                  maxWidth: 'calc(100vw - 32px)',
              }}
            >
              <div className="flex items-center gap-2 text-indigo-300 font-bold mb-2 border-b border-slate-600/50 pb-2">
                 <Info className="w-4 h-4 flex-shrink-0" />
                 <span className="font-tajawal">{termData.title}</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed font-tajawal">{termData.definition}</p>
              
              {/* Arrow Indicator */}
              <div 
                className={`absolute w-3 h-3 bg-slate-800/95 border-slate-700/50 transform rotate-45 ${
                    coords.isTop 
                    ? '-bottom-1.5 border-b border-r' 
                    : '-top-1.5 border-t border-l'
                }`}
                style={{ 
                    left: arrowOffset,
                    transform: 'translateX(-50%) rotate(45deg)'
                }}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default GlossaryTerm;