"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, href, onClick, hoverEffect = true }: GlassCardProps) {
    const Content = (
        <div
            className={cn(
                "glass-panel rounded-2xl p-6 transition-all relative overflow-hidden group",
                hoverEffect && "hover:scale-[1.02] hover:bg-white/70 hover:shadow-2xl hover:border-white/50",
                className
            )}
            onClick={onClick}
        >
            {hoverEffect && <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />}
            {children}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block w-full">
                <motion.div whileTap={{ scale: 0.98 }}>
                    {Content}
                </motion.div>
            </Link>
        );
    }

    return <motion.div whileTap={onClick ? { scale: 0.98 } : undefined}>{Content}</motion.div>;
}
