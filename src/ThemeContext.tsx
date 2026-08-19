import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'cosmic' | 'zen';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return 'cosmic';
  });

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem('bioenerji_theme', mode);
  };

  const toggleTheme = () => {
    setTheme(theme === 'cosmic' ? 'zen' : 'cosmic');
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-zen');
    root.classList.add('theme-cosmic');
    document.body.style.backgroundColor = '#0D111D';
    document.body.style.color = '#F8FAFC';
    localStorage.setItem('bioenerji_theme', 'cosmic');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
