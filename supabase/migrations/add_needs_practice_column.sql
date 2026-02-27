-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: add needs_practice flag to vocabulary_progress
-- Run this ONCE in the Supabase SQL Editor (Database → SQL Editor)
-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Add the column (safe to run multiple times — ALTER TABLE IF NOT EXISTS)
ALTER TABLE vocabulary_progress
ADD COLUMN IF NOT EXISTS needs_practice BOOLEAN NOT NULL DEFAULT FALSE;
-- 2. Create an index so the tab query is fast
CREATE INDEX IF NOT EXISTS idx_vocab_progress_needs_practice ON vocabulary_progress (user_id, needs_practice)
WHERE needs_practice = TRUE;
-- Done! No RLS changes needed — the column lives on the same table
-- that already has RLS policies for authenticated users.