'use client';

import { useTheme } from '../hooks';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  // Не показываем кнопку пока не загрузились данные о теме
  if (!mounted) {
    return (
      <button
        className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-slate-100 animate-pulse"
        disabled
      >
        <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"></div>
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="hidden md:flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md bg-white/20 dark:bg-slate-800/20 border border-white/20 dark:border-slate-700/20 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-300 group"
      aria-label={`Переключить на ${isDark ? 'светлую' : 'темную'} тему`}
      title={`Переключить на ${isDark ? 'светлую' : 'темную'} тему`}
    >
      {/* Glassmorphism effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 dark:from-slate-700/10 dark:to-slate-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Glow effect container */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Sun Icon (with glow in light mode) */}
        <Sun 
          className={`absolute w-5 h-5 text-gold-400 transition-all duration-500 ${
            isDark 
              ? 'opacity-0 rotate-90 scale-50' 
              : 'opacity-100 rotate-0 scale-100'
          }`}
          style={{
            filter: isDark ? 'drop-shadow(0 0 0 rgba(212, 165, 50, 0))' : 'drop-shadow(0 0 12px rgba(212, 165, 50, 0.8))',
            transition: 'filter 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
          }}
        />
        
        {/* Moon Icon (with glow in dark mode) */}
        <Moon 
          className={`absolute w-5 h-5 text-blue-400 transition-all duration-500 ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-50'
          }`}
          style={{
            filter: isDark ? 'drop-shadow(0 0 12px rgba(96, 165, 250, 0.8))' : 'drop-shadow(0 0 0 rgba(96, 165, 250, 0))',
            transition: 'filter 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
          }}
        />
        
        {/* Glow background that pulses */}
        <div 
          className={`absolute inset-0 rounded-full bg-gradient-to-br transition-all duration-500 ${
            isDark 
              ? 'from-blue-400/20 via-purple-400/20 to-indigo-400/20' 
              : 'from-gold-400/20 via-orange-400/20 to-amber-400/20'
          }`}
          style={{
            opacity: isDark ? 0.3 : 0.3,
            transform: isDark ? 'scale(1.2)' : 'scale(1.2)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        />
      </div>
      
      {/* Status indicator dot */}
      <span className={`absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full transition-all duration-500 ${
        isDark 
          ? 'bg-blue-400 shadow-[0_0_10px_2px_rgba(96,165,250,0.6)]' 
          : 'bg-gold-400 shadow-[0_0_10px_2px_rgba(212,165,50,0.6)]'
      }`} />
    </button>
  );
};

export default ThemeToggle;
