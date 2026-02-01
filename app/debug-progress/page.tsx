"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getWordsMasteredStatus } from "@/lib/word-progress";

export default function DebugProgressPage() {
  const [user, setUser] = useState<any>(null);
  const [allProgress, setAllProgress] = useState<any[]>([]);
  const [testResult, setTestResult] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkEverything() {
      const supabase = createClient();
      
      // 1. Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      console.log("User:", user);
      console.log("Auth error:", authError);
      setUser(user);

      if (!user) {
        setTestResult("❌ Not logged in");
        setLoading(false);
        return;
      }

      // 2. Check if vocabulary_progress table exists and we can query it
      const { data: progressData, error: progressError } = await supabase
        .from('vocabulary_progress')
        .select('*')
        .eq('user_id', user.id);

      console.log("All progress data:", progressData);
      console.log("Progress error:", progressError);

      if (progressError) {
        setTestResult(`❌ Database error: ${progressError.message}`);
        setLoading(false);
        return;
      }

      setAllProgress(progressData || []);

      // 3. Test the getWordsMasteredStatus function
      const testWordIds = ['der-apfel', 'die-katze', 'das-haus']; // Some example IDs
      const statusMap = await getWordsMasteredStatus(testWordIds);
      
      const result = `
✅ Logged in as: ${user.email}
📊 Total progress records: ${progressData?.length || 0}
🎯 Learned words: ${progressData?.filter((p: any) => p.proficiency_level === 'learned').length || 0}
🧪 Test query result: ${statusMap.size} words found
      `;
      
      setTestResult(result);
      setLoading(false);
    }

    checkEverything();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Loading debug info...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">🔍 Progress Debug Page</h1>
      
      <div className="bg-card border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">User Info</h2>
        <pre className="bg-muted p-4 rounded overflow-auto text-sm">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="bg-card border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Test Results</h2>
        <pre className="bg-muted p-4 rounded whitespace-pre-wrap text-sm">
          {testResult}
        </pre>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">All Your Progress Records ({allProgress.length})</h2>
        {allProgress.length === 0 ? (
          <p className="text-muted-foreground">No progress records found. Try marking some words as learned first!</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Word ID</th>
                  <th className="text-left p-2">Level</th>
                  <th className="text-left p-2">Topic</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Times Practiced</th>
                  <th className="text-left p-2">Last Practiced</th>
                </tr>
              </thead>
              <tbody>
                {allProgress.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2 font-mono text-xs">{item.word_id}</td>
                    <td className="p-2">{item.level}</td>
                    <td className="p-2">{item.topic}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        item.proficiency_level === 'learned' 
                          ? 'bg-green-500/20 text-green-700' 
                          : 'bg-yellow-500/20 text-yellow-700'
                      }`}>
                        {item.proficiency_level}
                      </span>
                    </td>
                    <td className="p-2">{item.times_practiced}</td>
                    <td className="p-2 text-xs">{item.last_practiced_at ? new Date(item.last_practiced_at).toLocaleString() : 'Never'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <h3 className="font-bold mb-2">💡 What to do if you see 0 learned words:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Go to any topic page (e.g., /a1/basics)</li>
          <li>Click the checkmark/star icon on a few words to mark them as "learned"</li>
          <li>Come back to this page and refresh</li>
          <li>You should see the words appear in the table above</li>
          <li>Then go to /a1 and the progress bars should show percentages</li>
        </ol>
      </div>
    </div>
  );
}
