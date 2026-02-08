"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Lock, Sparkles, TrendingUp, Award } from "lucide-react";

interface AuthGateProps {
  currentIndex: number;
  freeLimit?: number;
  featureName?: string;
  children: React.ReactNode;
}

export function AuthGate({ 
  currentIndex, 
  freeLimit = 1, 
  featureName = "flashcards",
  children 
}: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    
    checkAuth();
  }, []);

  // If still checking auth, don't show anything
  if (isAuthenticated === null) {
    return <>{children}</>;
  }

  // If authenticated, show content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated and exceeded free limit, show auth gate
  if (currentIndex >= freeLimit) {
    return (
      <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto py-6 sm:py-0">
        <div className="bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full mx-4 my-6 sm:my-0 shadow-2xl transform animate-in zoom-in duration-300">
          {/* Lock Icon with Glow Effect */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
              <div className="relative bg-primary/10 p-4 sm:p-6 rounded-full border-2 border-primary/30">
                <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Unlock Full Access
          </h2>
          
          <p className="text-center text-sm sm:text-base text-muted-foreground mb-6">
            You&apos;ve tried your first {featureName}! Sign up to continue learning and unlock everything.
          </p>

          {/* Benefits List */}
          <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
            <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-primary/5 border border-primary/10">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-xs sm:text-sm">5,000+ Words</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Full A1-B2 vocabulary access</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-primary/5 border border-primary/10">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-xs sm:text-sm">Track Your Progress</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Save & sync across devices</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-primary/5 border border-primary/10">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-xs sm:text-sm">Achievements & Streaks</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Compete on leaderboard</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2.5 sm:space-y-3">
            <button
              onClick={() => router.push('/login?signup=true')}
              className="w-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
            >
              Sign Up Free - It&apos;s Really Free!
            </button>
            
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-card border-2 border-border text-foreground font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl hover:bg-accent transition-all duration-300 text-sm sm:text-base"
            >
              Already have an account? Log In
            </button>
          </div>

          {/* Trust Badge */}
          <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-4 sm:mt-6">
            ✨ 100% Free • Join 10,000+ Learners
          </p>
        </div>
      </div>
    );
  }

  // Show content for free attempts
  return <>{children}</>;
}
