# Team Creation Feature - Student Guide

## 🎯 Overview
Students can now create and manage teams for team-based events directly from their dashboard.

---

## ✅ What's Implemented

### **1. Create Team Modal**
- Modern, animated modal interface
- Real-time event selection
- Automatic team size detection
- Form validation
- Success/error feedback

### **2. Team Management Dashboard**
- View all your teams
- See team members
- Track team status
- Manage team invitations

---

## 📋 Features

### **Student Can:**
✅ Create new teams for team events  
✅ Select from available team events  
✅ Name their team  
✅ Become team leader automatically  
✅ Add members after creation (up to max size)  
✅ View all teams they're part of  
✅ See team registration status  

### **Restrictions:**
❌ Can only create teams for events marked as "team events"  
❌ Cannot exceed max team size set by event  
❌ Cannot create duplicate teams for same event  

---

## 🚀 How to Use

### **Step 1: Access Dashboard**
```
Login → Click Dashboard → Go to "My Teams" tab
```

### **Step 2: Create Team**
1. Click **"Create New Team"** button (orange button, top-right)
2. Modal opens with form

### **Step 3: Fill Details**
- **Team Name**: Enter a unique, creative name
- **Select Event**: Choose from dropdown (only shows team events)
- System automatically sets max team size based on event

### **Step 4: Submit**
- Click **"Create Team"** button
- Wait for confirmation
- Success message shows
- Team appears in your list

### **Step 5: Add Members** (Coming Soon)
- Click "Manage Team" on your team card
- Search for users
- Send invitations
- Members accept and join

---

## 🗄️ Database Setup

### **Required Tables:**

**1. `teams` table:**
```sql
id UUID PRIMARY KEY
team_name TEXT NOT NULL
event_id TEXT (references events)
leader_id UUID (references profiles)
max_members INTEGER DEFAULT 4
is_active BOOLEAN DEFAULT true
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

**2. `team_members` table:**
```sql
id UUID PRIMARY KEY
team_id UUID (references teams)
user_id UUID (references profiles)
role TEXT ('leader' or 'member')
status TEXT ('active', 'left', 'removed')
joined_at TIMESTAMPTZ
```

**3. `events` table additions:**
```sql
is_team_event BOOLEAN DEFAULT false
min_team_size INTEGER DEFAULT 2
max_team_size INTEGER DEFAULT 4
```

### **Setup Script:**
Run this in Supabase SQL Editor:
```bash
database/team_events_setup.sql
```

### **Mark Events as Team Events:**
```sql
UPDATE events 
SET 
  is_team_event = true,
  min_team_size = 2,
  max_team_size = 4
WHERE id IN (
  'hackathon',
  'project_expo',
  'paper_presentation',
  'web_development'
);
```

---

## 📁 Files Created/Modified

### **New Files:**
- `Frontend/src/Pages/Dashboard/Components/CreateTeamModal.jsx` - Team creation modal
- `database/team_events_setup.sql` - Database setup script

### **Modified Files:**
- `Frontend/src/Pages/Dashboard/Components/MyTeams.jsx` - Added modal integration

### **Existing Files Used:**
- `Frontend/src/services/teamService.js` - Team CRUD operations
- `Frontend/src/services/supabaseService.js` - Database queries

---

## 🎨 UI/UX Features

### **Modal Design:**
- ✨ Smooth animations (Framer Motion)
- 🎯 Click outside to close
- 🔒 Prevents closing during submission
- ⚡ Real-time validation
- 🎨 Modern glassmorphism design
- 📱 Fully responsive

### **Form Features:**
- ✅ Required field indicators
- 🔍 Dynamic event loading
- 📊 Team size info display
- ⚠️ Error messages
- ✅ Success feedback
- 🔄 Loading states

---

## 🔐 Security & Permissions

### **RLS Policies:**

**Teams:**
- Anyone can view teams
- Only authenticated users can create
- Only leaders can update their teams

**Team Members:**
- Anyone can view members
- Leaders can manage their team members
- Users can only join as themselves

### **Validation:**
- User must be authenticated
- Team name required
- Event must be selected
- Event must allow teams (`is_team_event = true`)
- Cannot exceed max team size

---

## 🧪 Testing Checklist

### **Database Setup:**
- [ ] Run `team_events_setup.sql` in Supabase
- [ ] Mark at least one event as team event
- [ ] Verify tables created: `teams`, `team_members`
- [ ] Check RLS policies enabled

### **Create Team Flow:**
- [ ] Login as student
- [ ] Navigate to Dashboard → My Teams
- [ ] Click "Create New Team"
- [ ] Modal opens
- [ ] Events load in dropdown
- [ ] Fill team name
- [ ] Select event
- [ ] Max team size shows
- [ ] Submit form
- [ ] Success message appears
- [ ] Modal closes
- [ ] Team appears in list

### **Validations:**
- [ ] Cannot submit without team name
- [ ] Cannot submit without event selection
- [ ] Shows error for failed creation
- [ ] Cannot create team if not logged in
- [ ] Only shows team-enabled events

### **UI/UX:**
- [ ] Modal animations smooth
- [ ] Click outside closes modal
- [ ] Loading states show properly
- [ ] Success/error messages display
- [ ] Responsive on mobile
- [ ] Button disabled during loading

---

## 🐛 Troubleshooting

### **Issue: No events in dropdown**
**Solution:** 
```sql
-- Mark events as team events
UPDATE events SET is_team_event = true WHERE id = 'your_event_id';
```

### **Issue: "Failed to create team"**
**Check:**
1. User is authenticated
2. `teams` table exists
3. RLS policies are correct
4. Event ID is valid

### **Issue: Modal doesn't close**
**Cause:** Form is submitting
**Wait:** Let submission complete or show error

### **Issue: Team not appearing in list**
**Solution:** Refresh page or check `getUserTeams()` function

---

## 📊 Database Queries

### **Get user's teams:**
```javascript
const { data } = await supabase
  .from('teams')
  .select(`
    *,
    event:events(title, max_team_size),
    members:team_members(
      *,
      profile:profiles(full_name, email)
    )
  `)
  .eq('leader_id', userId)
  .eq('is_active', true);
```

### **Create team:**
```javascript
const { data: team } = await supabase
  .from('teams')
  .insert({
    team_name: 'Team Name',
    event_id: 'event123',
    leader_id: userId,
    max_members: 4
  })
  .select()
  .single();
```

---

## 🚧 Future Enhancements

### **Phase 2: Member Management**
- [ ] Search users to add
- [ ] Send team invitations
- [ ] Accept/reject invitations
- [ ] Remove team members
- [ ] Transfer leadership

### **Phase 3: Team Features**
- [ ] Team chat
- [ ] File sharing
- [ ] Team QR code
- [ ] Team certificates
- [ ] Team leaderboard

### **Phase 4: Admin Features**
- [ ] View all teams
- [ ] Verify teams
- [ ] Disqualify teams
- [ ] Merge teams

---

## ✅ Current Status

**Implemented:**
- ✅ Create Team Modal UI
- ✅ Event selection
- ✅ Form validation
- ✅ Database integration
- ✅ Success/error handling
- ✅ Team list display
- ✅ RLS policies
- ✅ Database schema

**Next Steps:**
1. Test with real events
2. Add member invitation system
3. Implement team management
4. Add team registration flow

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify database setup
3. Confirm user authentication
4. Check Supabase logs

---

**Feature Status:** ✅ Ready for Testing  
**Last Updated:** December 27, 2025  
**Version:** 1.0.0
