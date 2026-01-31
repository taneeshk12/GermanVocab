import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-') // Replace spaces, non-word chars and dashes with a single dash
        .replace(/^-+/, '')        // Trim dashes from start
        .replace(/-+$/, '');       // Trim dashes from end
}
