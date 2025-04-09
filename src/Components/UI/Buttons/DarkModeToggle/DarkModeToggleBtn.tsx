import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react'; // Optional: install with `npm i lucide-react`

const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  // Apply stored or system preference on mount
  useEffect(() => {
    const storedPref = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = storedPref === 'dark' || (!storedPref && prefersDark);

    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex h-8 p-1 mx-1 items-center gap-1 self-center"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span className="hidden sm:inline">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default DarkModeToggle;

