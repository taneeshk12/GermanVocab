/**
 * Helper functions for tracking word learning progress
 */

import { createClient } from "@/lib/supabase/client";

export interface WordProgress {
  word_id: string;
  proficiency_level: 'learned';
  times_practiced: number;
  correct_count: number;
  last_practiced_at: string;
}

/**
 * Get learned status for multiple words (global across all practice modes)
 */
export async function getWordsMasteredStatus(wordIds: string[]): Promise<Map<string, boolean>> {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  const statusMap = new Map<string, boolean>();
  
  if (authError) {
    console.error('Auth error:', authError);
    return statusMap;
  }
  
  if (!user) {
    console.log('No user logged in, returning empty status map');
    return statusMap;
  }

  console.log(`Fetching word progress for user ${user.id}, ${wordIds.length} words`);

  // Instead of querying with all word IDs (which might be too large),
  // just get ALL learned words for this user and filter client-side
  const { data, error } = await supabase
    .from('vocabulary_progress')
    .select('word_id, proficiency_level')
    .eq('user_id', user.id)
    .eq('proficiency_level', 'learned');

  if (error) {
    console.error('Error fetching word progress:', {
      error,
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    return statusMap;
  }

  console.log(`Found ${data?.length || 0} learned word progress records`);

  if (data && data.length > 0) {
    console.log(`Sample database records:`, data.slice(0, 5));
  }

  data?.forEach((item: any) => {
    console.log(`Word progress: ${item.word_id} -> ${item.proficiency_level}`);
    // Only add to map if the word is in our requested wordIds
    if (wordIds.includes(item.word_id)) {
      statusMap.set(item.word_id, true);
    }
  });

  const learnedWords = Array.from(statusMap.entries()).filter(([, isLearned]) => isLearned);
  console.log(`Returning status map with ${statusMap.size} entries, ${learnedWords.length} learned`);
  console.log(`Learned word IDs:`, learnedWords.map(([id]) => id));
  
  return statusMap;
}

/**
 * Get all learned words for a user (global - from any practice mode)
 */
export async function getMasteredWords(): Promise<Array<{
  word_id: string;
  level: string;
  times_practiced: number;
  correct_count: number;
  last_practiced_at: string | null;
}>> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('vocabulary_progress')
    .select('word_id, level, times_practiced, correct_count, last_practiced_at')
    .eq('user_id', user.id)
    .eq('proficiency_level', 'learned')
    .order('last_practiced_at', { ascending: false });

  if (error) {
    console.error('Error fetching learned words:', error);
    return [];
  }

  return data || [];
}

/**
 * Get learning progress for a topic (count learned vs total)
 */
export async function getTopicProgress(wordIds: string[]): Promise<{ mastered: number; total: number }> {
  const statusMap = await getWordsMasteredStatus(wordIds);
  const mastered = Array.from(statusMap.values()).filter(Boolean).length;
  
  return {
    mastered,
    total: wordIds.length
  };
}
