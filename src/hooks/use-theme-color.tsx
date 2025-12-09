import { useState, useEffect, createContext, useContext, ReactNode } from "react";

export interface ThemeColor {
  name: string;
  primary: string; // HSL values like "217 91% 50%"
  primaryGlow: string;
  primaryDark: string;
}

export const themeColors: ThemeColor[] = [
  // Blues & Purples
  { 
    name: "Sky", 
    primary: "217 91% 50%", 
    primaryGlow: "217 91% 65%",
    primaryDark: "217 91% 40%"
  },
  { 
    name: "Royal Blue", 
    primary: "221 83% 53%", 
    primaryGlow: "221 83% 65%",
    primaryDark: "221 83% 43%"
  },
  { 
    name: "Indigo", 
    primary: "239 84% 67%", 
    primaryGlow: "239 84% 75%",
    primaryDark: "239 84% 55%"
  },
  { 
    name: "Violet", 
    primary: "270 91% 65%", 
    primaryGlow: "270 91% 75%",
    primaryDark: "270 91% 50%"
  },
  { 
    name: "Purple", 
    primary: "280 80% 55%", 
    primaryGlow: "280 80% 68%",
    primaryDark: "280 80% 45%"
  },
  { 
    name: "Fuchsia", 
    primary: "292 84% 61%", 
    primaryGlow: "292 84% 72%",
    primaryDark: "292 84% 50%"
  },
  // Pinks & Reds
  { 
    name: "Rose", 
    primary: "330 80% 60%", 
    primaryGlow: "330 80% 72%",
    primaryDark: "330 80% 48%"
  },
  { 
    name: "Coral", 
    primary: "16 90% 65%", 
    primaryGlow: "16 90% 75%",
    primaryDark: "16 90% 52%"
  },
  { 
    name: "Red", 
    primary: "0 84% 60%", 
    primaryGlow: "0 84% 70%",
    primaryDark: "0 84% 50%"
  },
  // Oranges & Yellows
  { 
    name: "Orange", 
    primary: "25 95% 53%", 
    primaryGlow: "25 95% 65%",
    primaryDark: "25 95% 45%"
  },
  { 
    name: "Amber", 
    primary: "38 92% 50%", 
    primaryGlow: "38 92% 62%",
    primaryDark: "38 92% 40%"
  },
  { 
    name: "Gold", 
    primary: "45 93% 47%", 
    primaryGlow: "45 93% 60%",
    primaryDark: "45 93% 38%"
  },
  // Greens & Teals
  { 
    name: "Lime", 
    primary: "84 81% 44%", 
    primaryGlow: "84 81% 56%",
    primaryDark: "84 81% 36%"
  },
  { 
    name: "Emerald", 
    primary: "142 76% 36%", 
    primaryGlow: "142 76% 50%",
    primaryDark: "142 76% 28%"
  },
  { 
    name: "Teal", 
    primary: "166 76% 42%", 
    primaryGlow: "166 76% 54%",
    primaryDark: "166 76% 32%"
  },
  { 
    name: "Cyan", 
    primary: "187 85% 43%", 
    primaryGlow: "187 85% 55%",
    primaryDark: "187 85% 35%"
  },
  // Neutrals & Special
  { 
    name: "Slate", 
    primary: "215 25% 45%", 
    primaryGlow: "215 25% 58%",
    primaryDark: "215 25% 35%"
  },
  { 
    name: "Graphite", 
    primary: "220 15% 35%", 
    primaryGlow: "220 15% 48%",
    primaryDark: "220 15% 25%"
  },
];

interface ThemeColorContextType {
  currentTheme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
}

const ThemeColorContext = createContext<ThemeColorContextType | null>(null);

const THEME_STORAGE_KEY = "app-theme-color";

export function ThemeColorProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return themeColors[0];
      }
    }
    return themeColors[0];
  });

  const applyTheme = (theme: ThemeColor) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--primary-glow", theme.primaryGlow);
    root.style.setProperty("--primary-dark", theme.primaryDark);
    root.style.setProperty("--accent", theme.primary);
    root.style.setProperty("--ring", theme.primary);
  };

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: ThemeColor) => {
    setCurrentTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    applyTheme(theme);
  };

  return (
    <ThemeColorContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext);
  if (!context) {
    throw new Error("useThemeColor must be used within a ThemeColorProvider");
  }
  return context;
}
