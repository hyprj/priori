import React, { createContext, useState } from "react";

export const THEMES = ["light", "dark"] as const;

type Theme = (typeof THEMES)[number];

type ThemeContextType = {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "light",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    let theme = window.localStorage.getItem("theme");
    if (theme && THEMES.includes(theme as Theme)) {
      document.body.classList.add(theme);
      return theme as Theme;
    }
    const isDarkPrefered = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    theme = isDarkPrefered ? "dark" : "light";
    document.body.classList.add(theme);
    return theme as Theme;
  });

  const setTheme = (theme: Theme) => {
    document.body.classList.remove(currentTheme);
    document.body.classList.add(theme);
    window.localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
