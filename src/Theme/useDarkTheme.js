import { useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';

const useDarkTheme = () => {
  // Optional: Manage theme mode state for light/dark toggle
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
          contrastText: '#fff',
        },
        secondary: {
          main: '#9c27b0',
          light: '#ba68c8',
          dark: '#7b1fa2',
          contrastText: '#fff',
        },
        background: {
          default: isDarkMode ? '#1010105d' : '#ffffff',
          paper: isDarkMode ? '#1010105d' : '#f5f5f5',
        },
        text: {
          primary: isDarkMode ? '#d7d6d6' : '#000000',
          secondary: isDarkMode ? '#d7d6d6' : '#555555',
        },
      },
      shadows: [
        'none',
        '0 0px 8px #0d6dfdab',
      ],
      shape: {
        borderRadius: 12, // Global borderRadius setting
      },
    });
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return { theme, toggleTheme, isDarkMode };
};

export default useDarkTheme;
