"use client";

import { motion } from "framer-motion";

const lineMotion = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: "easeOut" },
  }),
};

export const Greeting = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center" key="overview">
      <motion.div
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="rounded-full border border-yellow-500/30 bg-black/30 px-4 py-1.5 font-medium text-[11px] text-yellow-100 uppercase tracking-[0.28em] shadow-[0_0_28px_rgba(234,179,8,0.12)]"
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ delay: 0.1, duration: 0.45 }}
      >
        BEN.AI for MLAB
      </motion.div>

      <motion.h1
        animate="visible"
        className="mt-5 text-balance font-semibold text-3xl tracking-tight text-foreground md:text-5xl"
        custom={0.22}
        initial="hidden"
        variants={lineMotion}
      >
        Hi, I&apos;m BEN.AI.
      </motion.h1>

      <motion.p
        animate="visible"
        className="mt-4 max-w-2xl text-balance text-muted-foreground text-sm leading-6 md:text-base"
        custom={0.42}
        initial="hidden"
        variants={lineMotion}
      >
        Built from real experiences. Designed for real life. I help visitors explore MLAB across travel, relocation, learning, business, wealth and community.
      </motion.p>

      <motion.div
        animate="visible"
        className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] text-yellow-100/90 md:text-xs"
        custom={0.64}
        initial="hidden"
        variants={lineMotion}
      >
        {[
          "Travel",
          "Learning",
          "Business",
          "Wealth",
          "Community",
        ].map((item) => (
          <span
            className="rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3 py-1"
            key={item}
          >
            {item}
          </span>
        ))}
      </motion.div>

      <motion.p
        animate="visible"
        className="mt-6 font-medium text-foreground text-sm md:text-base"
        custom={0.86}
        initial="hidden"
        variants={lineMotion}
      >
        The Adventure Starts Here.
      </motion.p>
    </div>
  );
};