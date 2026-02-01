"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description: string;
    children?: ReactNode;
    className?: string;
    imageSrc?: string;
}

export function PageHeader({ title, description, children, className, imageSrc }: PageHeaderProps) {
    return (
        <div className={cn("relative pt-32 pb-12 sm:pt-40 sm:pb-20 overflow-hidden", className)}>
            {/* Aurora Background (Subtle) */}
            <div className="absolute inset-0 w-full h-full bg-background -z-20" />
            <div className="absolute inset-0 w-full h-full -z-10 opacity-30 blur-3xl saturate-150 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse lg:animate-aurora" />
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000 lg:animate-aurora" style={{ animationDirection: 'reverse' }} />
            </div>

            {/* Background Image (If provided) */}
            {imageSrc && (
                <div className="absolute inset-0 w-full h-full -z-10 flex items-center justify-center pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-background/60 z-10" /> {/* Overlay for readability */}
                    <img
                        src={imageSrc}
                        alt=""
                        className="w-full max-w-4xl h-auto object-contain opacity-50 transform scale-110 blur-sm sm:blur-0 sm:opacity-40 sm:scale-125"
                    />
                </div>
            )}

            <div className="container px-6 mx-auto max-w-4xl relative z-20 flex flex-col items-center text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 sm:mb-6 text-foreground leading-[1.1]"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto font-medium"
                >
                    {description}
                </motion.p>

                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
