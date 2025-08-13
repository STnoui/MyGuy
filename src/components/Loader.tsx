import { motion, Variants } from "framer-motion";
import { Logo } from "./Logo";

const loaderVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

const logoVariants: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1], // Corrected easeInOutCubic
    },
  },
};

export const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      variants={loaderVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div variants={logoVariants}>
        <Logo />
      </motion.div>
    </motion.div>
  );
};