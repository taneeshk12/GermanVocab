"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | ReactNode;
    description?: string | ReactNode;
    header?: ReactNode;
    icon?: ReactNode;
}) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={cn(
                "row-span-1 rounded-3xl group/bento glass-panel p-6 flex flex-col justify-between space-y-4 hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300",
                className
            )}
        >
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative">
                {header}
            </div>
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                <div className="mb-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {icon}
                </div>
                <div className="font-heading font-bold text-lg text-foreground mb-2">
                    {title}
                </div>
                <div className="font-sans font-medium text-muted-foreground text-sm leading-relaxed">
                    {description}
                </div>
            </div>
        </motion.div>
    );
};
