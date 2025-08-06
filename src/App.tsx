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
import { useI18n } from "./hooks/use-i18n";
import { CallToAction } from "./components/CallToAction";
import { MobileNav } from "./components/MobileNav";
import { SettingsMenu } from "./components/SettingsMenu";
import { AnimatePresence, motion } from "framer-motion";

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
  const showCallToAction = location.pathname === "/";

  return (
    <div className="flex flex-col h-screen bg-background">
      <MobileNav />
      <SettingsMenu />
      <main className="flex-1 h-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${location.pathname}-${language}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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