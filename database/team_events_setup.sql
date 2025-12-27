-- Team Event Configuration Setup
-- Run this in Supabase SQL Editor to ensure events support teams

-- Add team-related columns to events table if they don't exist
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS is_team_event BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS min_team_size INTEGER DEFAULT 2,
ADD COLUMN IF NOT EXISTS max_team_size INTEGER DEFAULT 4;

-- Example: Mark some events as team events
-- UPDATE events SET is_team_event = true, min_team_size = 2, max_team_size = 4 
-- WHERE id IN ('hackathon', 'project_expo', 'paper_presentation');

-- Verify teams table structure
-- Ensure teams table has the correct columns
DO $$ 
BEGIN
    -- Check if teams table exists with correct structure
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'teams'
    ) THEN
        CREATE TABLE teams (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            team_name TEXT NOT NULL,
            event_id TEXT REFERENCES events(id) ON DELETE CASCADE,
            leader_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
            max_members INTEGER DEFAULT 4,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    END IF;

    -- Check if team_members table exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'team_members'
    ) THEN
        CREATE TABLE team_members (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
            user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
            role TEXT DEFAULT 'member' CHECK (role IN ('leader', 'member')),
            status TEXT DEFAULT 'active' CHECK (status IN ('active', 'left', 'removed')),
            joined_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE(team_id, user_id)
        );
    END IF;
END $$;

-- Enable RLS on teams and team_members if not already enabled
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view teams" ON teams;
DROP POLICY IF EXISTS "Authenticated users can create teams" ON teams;
DROP POLICY IF EXISTS "Team leaders can update their teams" ON teams;
DROP POLICY IF EXISTS "Anyone can view team members" ON team_members;
DROP POLICY IF EXISTS "Team leaders can manage members" ON team_members;
DROP POLICY IF EXISTS "Users can join teams" ON team_members;

-- Create RLS policies for teams
CREATE POLICY "Anyone can view teams" 
  ON teams FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can create teams" 
  ON teams FOR INSERT 
  WITH CHECK (auth.uid() = leader_id);

CREATE POLICY "Team leaders can update their teams" 
  ON teams FOR UPDATE 
  USING (auth.uid() = leader_id);

-- Create RLS policies for team_members
CREATE POLICY "Anyone can view team members" 
  ON team_members FOR SELECT 
  USING (true);

CREATE POLICY "Team leaders can manage members" 
  ON team_members FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM teams 
      WHERE teams.id = team_members.team_id 
      AND teams.leader_id = auth.uid()
    )
  );

CREATE POLICY "Users can join teams" 
  ON team_members FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_teams_event_id ON teams(event_id);
CREATE INDEX IF NOT EXISTS idx_teams_leader_id ON teams(leader_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for teams table
DROP TRIGGER IF EXISTS update_teams_updated_at ON teams;
CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Example query to mark events as team events
-- Uncomment and modify as needed:
/*
UPDATE events 
SET 
  is_team_event = true,
  min_team_size = 2,
  max_team_size = 4
WHERE id IN (
  'hackathon',
  'project_expo', 
  'paper_presentation',
  'web_development',
  'app_development'
);
*/

-- Verify setup
SELECT 'Setup complete! 🎉' as status;
SELECT 'Total team-enabled events: ' || COUNT(*) as team_events FROM events WHERE is_team_event = true;
