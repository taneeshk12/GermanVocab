"use client";

import Link from "next/link";
import { ArrowRight, Star, BookOpen, Trophy, Sparkles, BrainCircuit, GraduationCap, Languages } from "lucide-react";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { PracticePromo } from "@/components/PracticePromo";
import { FAQSection } from "@/components/FAQSection";
import Image from "next/image";

const features = [
	{
		title: "965+ A1 Words",
		description:
			"Comprehensive vocabulary covering all essential German basics. From greetings to daily life.",
		header: (
			<div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-violet-600 via-indigo-600 to-blue-600 items-center justify-center p-4 relative overflow-hidden group">
				<div className="absolute inset-0 bg-[url('/file.svg')] opacity-10 bg-repeat rotate-12 scale-150"></div>
				<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white font-bold text-lg shadow-xl group-hover:scale-110 transition-transform">
					Der Apfel
				</div>
				<div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
			</div>
		),
		icon: <BookOpen size={20} />,
		className: "md:col-span-1",
	},
	{
		title: "Interactive Practice",
		description:
			"Engagement focused exercises. Flashcards, writing, and speaking logic.",
		header: (
			<div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-blue-500 via-cyan-500 to-teal-400 items-center justify-center p-4 relative overflow-hidden group">
				<div className="flex gap-2 group-hover:-translate-y-2 transition-transform duration-500">
					<div className="w-12 h-16 bg-white/20 rounded-md border border-white/30 backdrop-blur-md transform -rotate-6"></div>
					<div className="w-12 h-16 bg-white/40 rounded-md border border-white/50 backdrop-blur-md z-10 shadow-lg flex items-center justify-center">
						<Star className="text-yellow-300 fill-yellow-300 w-6 h-6" />
					</div>
					<div className="w-12 h-16 bg-white/20 rounded-md border border-white/30 backdrop-blur-md transform rotate-6"></div>
				</div>
			</div>
		),
		icon: <Trophy size={20} />,
		className: "md:col-span-1",
	},
	{
		title: "Real Context",
		description:
			"Don't just memorize. Understand how words fit into authentic German sentences.",
		header: (
			<div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-pink-500 via-rose-500 to-orange-500 items-center justify-center p-4 relative overflow-hidden">
				<div className="w-full space-y-2">
					<div className="h-2 w-3/4 bg-white/30 rounded-full animate-pulse"></div>
					<div className="h-2 w-full bg-white/20 rounded-full"></div>
					<div className="h-2 w-5/6 bg-white/20 rounded-full"></div>
				</div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/30">
					<Languages className="text-white w-6 h-6" />
				</div>
			</div>
		),
		icon: <Sparkles size={20} />,
		className: "md:col-span-1",
	},
	{
		title: "Spaced Repetition Algorithm",
		description:
			"Our system tracks your memory decay and schedules reviews at the perfect moment.",
		header: (
			<div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-emerald-500 via-green-500 to-lime-500 items-center justify-center relative overflow-hidden p-6 group">
				<div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%,100%_100%] bg-position-[-100%_0,0_0] bg-no-repeat transition-[background-position_0s] duration-0 hover:bg-position-[200%_0,0_0] hover:duration-1500"></div>
				<div className="grid grid-cols-5 gap-2 w-full h-full place-items-center opacity-60">
					{[...Array(10)].map((_, i) => (
						<div
							key={i}
							className={`w-full h-2 rounded-full ${
								i % 3 === 0 ? "bg-white/80" : "bg-white/20"
							}`}
						></div>
					))}
				</div>
				<BrainCircuit className="absolute text-white w-16 h-16 drop-shadow-2xl group-hover:scale-110 transition-transform" />
			</div>
		),
		icon: <BrainCircuit size={20} />,
		className: "md:col-span-2",
	},
	{
		title: "CEFR Structured",
		description:
			"Aligned with European standards A1-B2. Track your progress professionally.",
		header: (
			<div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-amber-500 via-orange-500 to-red-500 items-center justify-center relative overflow-hidden">
				<div className="absolute bottom-0 left-0 w-full flex items-end justify-center px-8 gap-2 h-2/3">
					<div className="w-1/4 h-1/3 bg-white/20 rounded-t-lg"></div>
					<div className="w-1/4 h-1/2 bg-white/30 rounded-t-lg"></div>
					<div className="w-1/4 h-2/3 bg-white/50 rounded-t-lg relative">
						<div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white font-bold text-xs">
							B2
						</div>
					</div>
					<div className="w-1/4 h-full bg-white/80 rounded-t-lg shadow-lg relative group overflow-hidden">
						<div className="absolute inset-0 bg-white/20 animate-pulse"></div>
					</div>
				</div>
			</div>
		),
		icon: <GraduationCap size={20} />,
		className: "md:col-span-1",
	},
];

export function HomeClient() {
	return (
		<div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden">
			{/* Hero Section */}
			<section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
				{/* Aurora Background - Adjusted Opacity */}
				<div className="absolute inset-0 w-full h-full bg-background -z-20" />
				<div className="absolute inset-0 w-full h-full -z-10 opacity-40 blur-3xl saturate-150 pointer-events-none">
					<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse lg:animate-aurora" />
					<div
						className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000 lg:animate-aurora"
						style={{ animationDirection: "reverse" }}
					/>
					<div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-2000" />
				</div>

				{/* Background Hero Illustration */}
				<div className="absolute inset-0 w-full h-full -z-10 flex items-center justify-center pointer-events-none overflow-hidden">
					<div className="absolute inset-0 bg-background/70 z-10" />
					<Image
						src="/hero-illustration.png"
						alt="German learning hero illustration"
						width={1200}
						height={800}
						className="w-full max-w-5xl h-auto object-contain opacity-40 transform translate-y-20 scale-110 blur-[1px] sm:blur-0 sm:opacity-35"
						priority
					/>
				</div>

				<div className="container px-6 mx-auto max-w-4xl relative z-10 flex flex-col items-center text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-primary mb-8 shadow-sm transition-transform hover:scale-105 cursor-default"
					>
						<Star size={14} className="fill-primary text-primary" />
						<span>The #1  German Learning App</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6 sm:mb-8 text-foreground drop-shadow-sm leading-[1.1] max-w-3xl px-4 sm:px-0"
					>
						Master German <br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-600 to-blue-600 animate-gradient bg-300%">
							With Confidence
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-base sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-medium px-4"
					>
						Learn 5000+ German words through smart flashcards, interactive quizzes & spaced repetition.
						<span className="block mt-2 text-foreground font-bold">
							Start from zero. Master vocabulary. Completely free.
						</span>
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
					>
						<Link
							href="/a1"
							className="h-14 px-8 rounded-full bg-primary text-white font-bold text-lg flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/25 ring-4 ring-primary/10"
						>
							Start Learning Now <ArrowRight size={20} />
						</Link>
						<Link
							href="/a1/practice"
							className="h-14 px-8 rounded-full glass-panel font-bold text-lg flex items-center gap-2 text-foreground hover:text-primary transition-all hover:bg-white/80"
						>
							Practice Mode
						</Link>
						{/* Grammar Guides quick link */}
						<Link
							href="/grammar"
							className="h-14 px-6 rounded-full border border-primary/20 font-bold text-lg flex items-center gap-2 text-primary hover:bg-primary/5 transition-all"
						>
							Grammar Guides
						</Link>
					</motion.div>
				</div>
			</section>

			{/* Practice Promo Section */}
			<PracticePromo />

			{/* Features Grid */}
			<section className="py-24 bg-muted/30 border-t border-border relative">
				<div className="container px-6 mx-auto max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-extrabold text-foreground mb-4">
							Why Learn German With Us?
						</h2>
						<p className="text-muted-foreground text-lg">
							The most effective way to build your vocabulary
						</p>
					</div>

					<BentoGrid>
						{features.map((item, i) => (
							<BentoGridItem
								key={i}
								title={item.title}
								description={item.description}
								header={item.header}
								icon={item.icon}
								className={i === 3 ? "md:col-span-2" : ""}
							/>
						))}
					</BentoGrid>
				</div>
			</section>

			{/* FAQ Section - SEO Optimized */}
			<FAQSection />
		</div>
	);
}
