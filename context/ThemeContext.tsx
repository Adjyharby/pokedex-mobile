import { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

// Pokémon Type Themes with Button & Gradient Colors
export const themes: Record<string, { background: [string, string, ...string[]]; text: string; button: string; border: string }> = {
    // light: { background: ['#ffffff', '#eeeeee'], text: '#000', button: '#ddd', border: '#aaa' },
    darkType: { background: ['#2C2C2C', '#1A1A1A'], text: '#fff', button: '#444', border: '#555' },
    water: { background: ['#6390F0', '#1E5FFF'], text: '#fff', button: '#4A79D3', border: '#1E5FFF' },
    fairy: { background: ['#EE99AC', '#F9C7D4'], text: '#fff', button: '#E47291', border: '#EE99AC' },
    fire: { background: ['#F08030', '#E25822'], text: '#fff', button: '#D36636', border: '#F08030' },
    grass: { background: ['#7AC74C', '#56A82A'], text: '#fff', button: '#5C9E2E', border: '#7AC74C' },
    bug: { background: ['#A6B91A', '#879C17'], text: '#fff', button: '#7C8D15', border: '#A6B91A' },
    dragon: { background: ['#6F35FC', '#4E1EBF'], text: '#fff', button: '#5A27E6', border: '#6F35FC' },
    poison: { background: ['#A33EA1', '#772A76'], text: '#fff', button: '#8A2F8C', border: '#A33EA1' },
    metal: { background: ['#B7B7CE', '#8C8CA5'], text: '#000', button: '#9B9BB5', border: '#B7B7CE' },
    rock: { background: ['#B6A136', '#8F7C26'], text: '#fff', button: '#A08730', border: '#B6A136' },
    flying: { background: ['#A98FF3', '#8165D8'], text: '#000', button: '#7C5DC3', border: '#A98FF3' },
    electric: { background: ['#F7D02C', '#C9A41F'], text: '#000', button: '#E5B923', border: '#F7D02C' },
    psychic: { background: ['#F95587', '#D6315B'], text: '#fff', button: '#E3426D', border: '#F95587' },
    ice: { background: ['#96D9D6', '#65A6A3'], text: '#000', button: '#7BBDBB', border: '#96D9D6' },
    fighting: { background: ['#C22E28', '#8D211E'], text: '#fff', button: '#A82824', border: '#C22E28' },
    ghost: { background: ['#735797', '#4F3D6F'], text: '#fff', button: '#5F4B84', border: '#735797' },
    ground: { background: ['#E2BF65', '#B39A4E'], text: '#000', button: '#C6A758', border: '#E2BF65' },
    normal: { background: ['#A8A77A', '#7D7B5C'], text: '#000', button: '#908C6D', border: '#A8A77A' },
  };
  
// Define the theme keys
type ThemeName = keyof typeof themes;

const ThemeContext = createContext({
  theme: themes.light, // Default to light theme
  setTheme: (themeName: ThemeName) => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme(); // "light" or "dark"
  
  // ✅ Corrected: Convert systemTheme to a valid key in the themes object
  const initialTheme: ThemeName = systemTheme === 'dark' ? 'darkType' : 'light';

  const [theme, setThemeState] = useState(themes[initialTheme]);

  function setTheme(themeName: ThemeName) {
    setThemeState(themes[themeName]);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}