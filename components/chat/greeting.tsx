"use client";

import { motion } from "framer-motion";

const typeLine = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: { duration: 1.4, ease: "easeInOut" },
  },
};

export const Greeting = () => {
  return (
    <div className="flex flex-col items-center px-4" key="overview">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-semibold text-2xl tracking-tight text-foreground md:text-3xl"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        BEN.AI
      </motion.div>

      <div className="mt-3 flex flex-col items-center gap-1 text-center text-muted-foreground/80 text-sm">
        <motion.div
          className="overflow-hidden whitespace-nowrap"
          initial="hidden"
          animate="visible"
          variants={typeLine}
        >
          The AI-powered operating system for MyLifeAsBen (MLAB).
        </motion.div>

        <motion.div
          className="overflow-hidden whitespace-nowrap"
          initial="hidden"
          animate="visible"
          variants={typeLine}
          transition={{ delay: 1.3 }}
        >
          Travel • Business • Learning • Wealth • Community
        </motion.div>

        <motion.div
          className="mt-3 overflow-hidden whitespace-nowrap font-medium text-foreground"
          initial="hidden"
          animate="visible"
          variants={typeLine}
          transition={{ delay: 2.4 }}
        >
          The Adventure Starts Here.
        </motion.div>
      </div>
    </div>
  );
}