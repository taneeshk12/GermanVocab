import Link from "next/link";
import { BookOpen, Github, Twitter, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-white/50 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                                <BookOpen size={18} />
                            </div>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 font-heading tracking-tight">LinguFlow</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A free, open-source platform to master German vocabulary through spaced repetition and interactive practice.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-foreground">Learn</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/a1" className="hover:text-primary transition-colors">Level A1</Link></li>
                            <li><Link href="/a2" className="hover:text-primary transition-colors">Level A2 (Beta)</Link></li>
                            <li><Link href="/quiz/daily" className="hover:text-primary transition-colors">Daily Quiz</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-foreground">Community</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-foreground">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} LinguFlow. Open Source.
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>Made with</span>
                        <Heart size={14} className="fill-red-500 text-red-500 animate-pulse" />
                        <span>by the community</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
