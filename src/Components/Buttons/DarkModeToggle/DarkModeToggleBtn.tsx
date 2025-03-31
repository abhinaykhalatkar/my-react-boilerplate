// DarkModeToggle.tsx
import React from 'react';

const DarkModeToggle: React.FC = () => {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded transition-colors duration-300"
    >
      Toggle Dark Mode
    </button>
  );
};

export default DarkModeToggle;
