import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { ThemeProvider } from "./components/ThemeProvider";
import { I18nProvider } from "./contexts/I18nProvider";
import { CallToAction } from "./components/CallToAction";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useI18n } from "./hooks/use-i18n";
import { MobileNav } from "./components/MobileNav";
import { SettingsMenu } from "./components/SettingsMenu";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

const AppContent = () => {
  const location = useLocation();
  const { language } = useI18n();
  const { theme } = useTheme();

  const showCallToAction = location.pathname === "/";

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <MobileNav />
      <SettingsMenu />
      <main className="flex flex-col flex-grow pt-16 pb-28 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + language + (theme || "system")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {showCallToAction && <CallToAction />}
    </div>
  );
};

export default App;