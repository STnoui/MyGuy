import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { NavigationBar } from "@capacitor/navigation-bar";

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
      if (resolvedTheme === "dark") {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: colors.dark });
        if (Capacitor.getPlatform() === "android") {
          await NavigationBar.setColor({ color: colors.dark, darkButtons: false });
        }
      } else {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: colors.light });
        if (Capacitor.getPlatform() === "android") {
          await NavigationBar.setColor({ color: colors.light, darkButtons: true });
        }
      }
    };

    applyTheme();
  }, [resolvedTheme]);

  return null;
};