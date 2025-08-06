import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";

// Using colors from globals.css
const colors = {
  light: "#F8F9FA", // hsl(210 17% 98%)
  dark: "#000000",   // hsl(0 0% 0%)
};

export const NativeThemeHandler = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const applyTheme = async () => {
      try {
        if (resolvedTheme === "dark") {
          await StatusBar.setStyle({ style: Style.Dark });
          await StatusBar.setBackgroundColor({ color: colors.dark });
        } else {
          await StatusBar.setStyle({ style: Style.Light });
          await StatusBar.setBackgroundColor({ color: colors.light });
        }
      } catch (error) {
        console.error("Failed to apply native theme styles:", error);
      }
    };

    applyTheme();
  }, [resolvedTheme]);

  return null;
};