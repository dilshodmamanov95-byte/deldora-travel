'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

// Хук для управления темой оформления
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Проверяем localStorage
    const savedTheme = localStorage.getItem('deldora-theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Проверяем системные настройки
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newTheme: Theme = systemPrefersDark ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('deldora-theme', newTheme);
    }
    
    // Добавляем слушатель для изменения системной темы
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Не переключаем автоматически, если пользователь явно выбрал тему
      if (!localStorage.getItem('deldora-theme')) {
        const newTheme: Theme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Переключение темы
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('deldora-theme', newTheme);
  };

  // Системная тема
  const systemTheme = () => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  };

  return {
    theme,
    toggleTheme,
    systemTheme,
    mounted,
  };
};

export default useTheme;
