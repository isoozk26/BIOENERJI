import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'cosmic' | 'zen';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Varsayılan ve kalıcı aktif tema: Tema 1 (Lumora Aura & Cosmic Glow)
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return 'cosmic';
  });

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem('lumora_theme', mode);
  };

  const toggleTheme = () => {
    setTheme(theme === 'cosmic' ? 'zen' : 'cosmic');
  };

  useEffect(() => {
    const root = document.documentElement;
    // Set to Tema 1 Cosmic
    root.classList.remove('theme-zen');
    root.classList.add('theme-cosmic');
    document.body.style.backgroundColor = '#07080D';
    document.body.style.color = '#F1F5F9';
    localStorage.setItem('lumora_theme', 'cosmic');
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
