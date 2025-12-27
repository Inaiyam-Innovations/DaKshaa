# 📊 Live Stats Dashboard - Setup Guide

## Overview

The **Live Stats Dashboard** (`/live-stats`) is a public, real-time display showing:
- **Total Students Onboarded** (from `profiles` table)
- **Total Event Registrations** (from `registrations` table)

This page is designed for **large screens** (projectors, monitors at venues) and uses **Supabase Realtime** to update instantly when new data arrives.

---

## 🚀 Quick Setup

### Step 1: Deploy Database Functions

1. Open **Supabase Dashboard** → SQL Editor
2. Copy and paste the contents of `database/live_stats.sql`
3. Click **Run**

This will create:
- ✅ `get_live_stats()` RPC function (secure public access)
- ✅ `live_stats_cache` materialized view (for high traffic)
- ✅ Auto-refresh triggers

### Step 2: Enable Realtime on Tables

1. In Supabase Dashboard, go to **Database** → **Replication**
2. Enable realtime for these tables:
   - ✅ `profiles`
   - ✅ `registrations`

### Step 3: Access the Page

Navigate to: **`http://localhost:5173/live-stats`**

Or on production: **`https://yourdomain.com/live-stats`**

---

## 📋 Features

### 🔴 Real-Time Updates
- Live subscriptions to `profiles` and `registrations` tables
- Numbers increment instantly when new data arrives
- Visual "LIVE" indicator pulses when updating

### 🎨 Visual Design
- Dark mode with gradient backgrounds
- Animated particles and grid patterns
- Odometer-style number animations (using `react-countup`)
- Glowing hover effects on stat cards
- Responsive layout (mobile to 4K displays)

### 🔒 Security
- **Public access** (no authentication required)
- Uses **RPC function** to return only aggregate counts
- **No user data exposed** - only total numbers
- Row Level Security (RLS) compatible

---

## 🛠️ Technical Implementation

### Frontend Architecture

**File:** `Frontend/src/Pages/LiveStatus/LiveStats.jsx`

```javascript
// Initial data fetch
const { data } = await supabase.rpc('get_live_stats');

// Real-time subscription
const channel = supabase.channel('live-stats');

channel.on('postgres_changes', 
  { event: 'INSERT', schema: 'public', table: 'profiles' },
  (payload) => {
    setStats(prev => ({ ...prev, users: prev.users + 1 }));
  }
);
```

### Database Functions

**Function:** `get_live_stats()`
- **Type:** RPC (Remote Procedure Call)
- **Returns:** JSON `{ users: 500, registrations: 1200, last_updated: "..." }`
- **Security:** `SECURITY DEFINER` with `anon` access granted
- **Performance:** Direct count queries (suitable for <10,000 records)

**Materialized View:** `live_stats_cache`
- For **high traffic** scenarios (>5,000 users)
- Auto-refreshes via triggers on INSERT
- Extremely fast queries (pre-computed results)

---

## 📊 Performance Considerations

### For < 5,000 Users (Default)
✅ Use direct RPC function: `get_live_stats()`
- Simple implementation
- Real-time accuracy
- No additional setup

### For > 5,000 Users (Scale Mode)
🚀 Switch to materialized view:

1. Update frontend to query `live_stats_cache`:
```javascript
const { data } = await supabase
  .from('live_stats_cache')
  .select('*')
  .single();
```

2. The cache auto-refreshes on every new insert via triggers
3. Much faster queries, lower database load

---

## 🎯 Use Cases

### 1. Venue Display
- **Setup:** Connect laptop to projector
- **Browser:** Chrome in fullscreen mode (F11)
- **URL:** `/live-stats`
- **Refresh:** Not needed - auto-updates in real-time

### 2. Social Media Sharing
- **Screenshot:** High-resolution capture of the page
- **Share:** "500+ students already registered! Join now!"
- **Hype Builder:** Numbers jumping up creates FOMO

### 3. Event Monitoring
- **Staff Dashboard:** Keep tab open to monitor live sign-ups
- **Decision Making:** Real-time seat availability tracking

---

## 🔧 Customization

### Change Displayed Metrics

Edit `database/live_stats.sql`:

```sql
CREATE OR REPLACE FUNCTION get_live_stats()
RETURNS json AS $$
DECLARE
  user_count int;
  reg_count int;
  workshop_count int;  -- NEW METRIC
BEGIN
  SELECT count(*) INTO user_count FROM profiles;
  SELECT count(*) INTO reg_count FROM registrations;
  SELECT count(*) INTO workshop_count FROM registrations WHERE event_type = 'workshop';  -- NEW
  
  RETURN json_build_object(
    'users', user_count,
    'registrations', reg_count,
    'workshops', workshop_count  -- NEW
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

Then update `LiveStats.jsx` to display the new metric.

### Change Visual Theme

Edit `Frontend/src/Pages/LiveStatus/LiveStats.jsx`:

```javascript
// Colors
className="text-secondary"  // Orange
className="text-primary"    // Purple

// Fonts
className="text-9xl"  // Massive numbers
className="font-black"  // Ultra-bold

// Animations
<CountUp end={stats.users} duration={2} />  // Adjust duration
```

---

## 🐛 Troubleshooting

### Issue: Numbers Not Updating in Real-Time

**Solution:**
1. Check Supabase Realtime is enabled:
   - Dashboard → Database → Replication
   - Enable for `profiles` and `registrations`

2. Check browser console for errors:
   - Should see: "✅ Realtime subscriptions active"

3. Verify RPC function exists:
   ```sql
   SELECT get_live_stats();
   ```

### Issue: "RPC function not found"

**Solution:**
1. Run `database/live_stats.sql` in Supabase SQL Editor
2. Grant permissions:
   ```sql
   GRANT EXECUTE ON FUNCTION get_live_stats() TO anon;
   ```

### Issue: Slow Performance

**Solution:**
1. Switch to materialized view (see Performance section above)
2. Add database indexes:
   ```sql
   CREATE INDEX idx_profiles_created_at ON profiles(created_at);
   CREATE INDEX idx_registrations_created_at ON registrations(created_at);
   ```

---

## 📱 Mobile Optimization

The page is **fully responsive**:
- **Desktop:** Horizontal split (side-by-side cards)
- **Mobile:** Vertical stack (cards on top of each other)
- **Tablet:** Adaptive layout based on screen width

---

## 🔐 Security Checklist

✅ **No user data exposed** - only aggregate counts
✅ **Public access** via RPC function with `anon` role
✅ **Row Level Security** compatible
✅ **SECURITY DEFINER** prevents direct table access
✅ **No API keys** needed in client code (uses public anon key)

---

## 📦 Dependencies

All dependencies are already installed:
- ✅ `react-countup` - Odometer animation
- ✅ `framer-motion` - Smooth animations
- ✅ `lucide-react` - Icons
- ✅ `@supabase/supabase-js` - Database & Realtime

---

## 🎉 Launch Checklist

Before going live:

- [ ] Deploy `database/live_stats.sql` to production Supabase
- [ ] Enable Realtime on `profiles` and `registrations` tables
- [ ] Test on large screen (projector/monitor)
- [ ] Verify real-time updates (make test registration)
- [ ] Check mobile responsiveness
- [ ] Set browser to fullscreen mode (F11)
- [ ] Disable screen sleep/screensaver on display device

---

## 🚀 Advanced Features (Optional)

### Add Sound Effects
When numbers update, play a "ding" sound:

```javascript
const audio = new Audio('/sounds/ding.mp3');

channel.on('postgres_changes', ..., (payload) => {
  setStats(prev => ({ ...prev, users: prev.users + 1 }));
  audio.play();  // SOUND EFFECT
});
```

### Add Milestone Celebrations
Show confetti when reaching certain numbers:

```javascript
if (stats.users === 500) {
  // Trigger confetti animation
}
```

### Add Live Event Feed
Show latest registrations scrolling at bottom (without exposing names):

```javascript
"User from Computer Science just registered!"
"Workshop ticket sold!"
```

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review `database/live_stats.sql` comments
3. Inspect browser console for errors
4. Test with: `SELECT get_live_stats();` in Supabase SQL Editor

---

**Built with ❤️ for DAKSHAA 2025**
