import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t bg-slate-900 text-slate-200 mt-auto">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 mb-12">
                    <div className="col-span-2 lg:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
                            <div className="relative w-36 h-10">
                                <Image
                                    src="/app_logo.svg"
                                    alt="LangFlow Logo"
                                    fill
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Master German vocabulary through spaced repetition and interactive practice.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-white">Learn</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/levels" className="hover:text-primary transition-colors">All Levels</Link></li>
                            <li><Link href="/quiz/daily" className="hover:text-primary transition-colors">Daily Quiz</Link></li>
                            <li><Link href="/learned-words" className="hover:text-primary transition-colors">My Vocabulary</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-white">Company</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-white">Legal</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} LangFlow. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                        <span>Made with</span>
                        <Heart size={14} className="fill-red-500 text-red-500 animate-pulse" />
                        <span>for German learners</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
