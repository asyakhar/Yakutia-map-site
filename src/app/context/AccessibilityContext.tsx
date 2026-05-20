import { createContext, useContext, useState, ReactNode } from "react";

type AccessibilitySettings = {
  highContrast: boolean;
  fontSize: "normal" | "large" | "extra-large";
  dyslexicFont: boolean;
  userProfile: string;
};

type AccessibilityContextType = {
  settings: AccessibilitySettings;
  updateSettings: (settings: Partial<AccessibilitySettings>) => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: "normal",
    dyslexicFont: false,
    userProfile: "",
  });

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings }}>
      <div
        className={`
          ${settings.highContrast ? "high-contrast" : ""}
          ${settings.fontSize === "large" ? "text-lg" : ""}
          ${settings.fontSize === "extra-large" ? "text-xl" : ""}
          ${settings.dyslexicFont ? "font-mono" : ""}
        `}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}
