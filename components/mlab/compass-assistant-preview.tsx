"use client";

import { motion } from "framer-motion";
import { BEN_AI_PERSONA } from "@/lib/mlab/platform-config";

export function CompassAssistantPreview() {
  return (
    <div className="relative mx-auto flex min-h-[420px] w-full max-w-xl items-center justify-center overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-black/45 p-8 shadow-[0_0_80px_rgba(234,179,8,0.10)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(234,179,8,0.18),transparent_38%),radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.09),transparent_58%)]" />
      <div className="absolute h-72 w-72 rounded-full border border-yellow-500/15" />
      <div className="absolute h-52 w-52 rounded-full border border-yellow-500/20" />
      <div className="absolute h-32 w-32 rounded-full border border-yellow-500/30" />

      <motion.div
        animate={{ rotate: 360 }}
        className="absolute h-64 w-64 rounded-full border-yellow-400/20 border-t border-r"
        transition={{ duration: 18, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        animate={{ opacity: 1, x: 0, scale: 1 }}
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, x: -46, scale: 0.96 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          className="grid h-28 w-28 place-items-center rounded-full border border-yellow-300/50 bg-[radial-gradient(circle_at_35%_22%,#fde68a,#a16207_48%,#050505_78%)] shadow-[0_0_55px_rgba(234,179,8,0.35)]"
          transition={{ duration: 4, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="font-black text-3xl text-black tracking-[-0.12em]">B</span>
        </motion.div>

        <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-black/70 px-5 py-4 shadow-[0_22px_80px_rgba(0,0,0,0.35)] backdrop-blur">
          <p className="font-semibold text-sm text-yellow-100 uppercase tracking-[0.28em]">
            {BEN_AI_PERSONA.name}
          </p>
          <p className="mt-2 max-w-xs text-pretty text-sm text-yellow-100/70 leading-6">
            Walks into the page, settles into the compass, then opens as a concierge control panel when needed.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
