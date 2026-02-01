"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Debug component to check Supabase data
 * Add this to any page temporarily to debug
 */
export function SupabaseDebugger() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    setResults({
      type: "Auth Check",
      user: data.user,
      error,
      userId: data.user?.id,
      email: data.user?.email
    });
    setLoading(false);
  };

  const checkVocabProgress = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setResults({ type: "Vocab Progress", error: "Not logged in" });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('vocabulary_progress')
      .select('*')
      .eq('user_id', user.id)
      .limit(10);

    setResults({
      type: "Vocab Progress",
      count: data?.length || 0,
      data,
      error,
      errorDetails: error ? {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      } : null
    });
    setLoading(false);
  };

  const checkRLS = async () => {
    setLoading(true);
    const supabase = createClient();
    
    // Try to select from vocabulary_progress without filters
    const { data, error } = await supabase
      .from('vocabulary_progress')
      .select('*')
      .limit(1);

    setResults({
      type: "RLS Check",
      canRead: !error,
      error,
      errorDetails: error ? {
        message: error.message,
        code: error.code
      } : null,
      data
    });
    setLoading(false);
  };

  const checkUserStats = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setResults({ type: "User Stats", error: "Not logged in" });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();

    setResults({
      type: "User Stats",
      data,
      error,
      errorDetails: error ? {
        message: error.message,
        details: error.details,
        code: error.code
      } : null
    });
    setLoading(false);
  };

  const testInsert = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setResults({ type: "Test Insert", error: "Not logged in" });
      setLoading(false);
      return;
    }

    const testWord = `test_word_${Date.now()}`;
    
    const { data, error } = await supabase
      .from('vocabulary_progress')
      .insert({
        user_id: user.id,
        word_id: testWord,
        level: 'a1',
        proficiency_level: 'mastered',
        times_practiced: 1,
        correct_count: 1,
        incorrect_count: 0,
        last_practiced_at: new Date().toISOString()
      })
      .select();

    setResults({
      type: "Test Insert",
      success: !error,
      data,
      error,
      errorDetails: error ? {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      } : null
    });
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-card border rounded-xl p-4 shadow-2xl max-w-md max-h-96 overflow-auto z-50">
      <h3 className="font-bold text-lg mb-3">🔍 Supabase Debugger</h3>
      
      <div className="flex flex-col gap-2 mb-4">
        <button
          onClick={checkAuth}
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          Check Auth
        </button>
        <button
          onClick={checkVocabProgress}
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-green-500 text-white text-sm hover:bg-green-600 disabled:opacity-50"
        >
          Check Vocab Progress
        </button>
        <button
          onClick={checkRLS}
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-yellow-500 text-white text-sm hover:bg-yellow-600 disabled:opacity-50"
        >
          Check RLS Policies
        </button>
        <button
          onClick={checkUserStats}
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-purple-500 text-white text-sm hover:bg-purple-600 disabled:opacity-50"
        >
          Check User Stats
        </button>
        <button
          onClick={testInsert}
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 disabled:opacity-50"
        >
          Test Insert Word
        </button>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading...</p>}

      {results && (
        <div className="mt-4 p-3 bg-secondary rounded-lg">
          <h4 className="font-semibold text-sm mb-2">{results.type}</h4>
          <pre className="text-xs overflow-auto max-h-48 whitespace-pre-wrap">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
