import React, { createContext, useContext, useEffect, useState } from "react";
import { ColorSchemeName, useColorScheme as useSystemColorScheme } from "react-native";

type ThemeContextType = {
  colorScheme: ColorSchemeName;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(systemColorScheme);

  useEffect(() => {
    if (!colorScheme) {
      setColorScheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
