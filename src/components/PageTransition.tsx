"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="flex-1 w-full h-full"
    >
      {children}
    </motion.div>
  );
}
