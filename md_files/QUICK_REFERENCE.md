# ⚡ Quick Reference - DaKshaa T26

## 🚀 5-Minute Deployment

### 1. Database (2 min)
```sql
-- Supabase SQL Editor → Paste & Run:
database/complete_production_schema.sql
```

### 2. Environment (1 min)
```bash
# Frontend/.env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

# Get from: Supabase → Settings → API
```

### 3. Deploy (2 min)
```powershell
.\deploy.ps1
# Or manually:
cd Frontend
npm install
npm run build
vercel --prod
```

---

## 📊 Database Schema Summary

### Core Tables (8)
1. **profiles** - Users
2. **events_config** - Events
3. **registrations** - Event registrations
4. **attendance_logs** - Attendance tracking
5. **teams** - Team info
6. **team_members** - Team membership
7. **combos** - Package deals
8. **winners** - Event winners

### Supporting Tables (13)
9. feedback
10. contact_messages
11. accommodation_requests
12. lunch_bookings
13. referrals
14. notifications
15. qr_codes
16. payment_transactions
17. admin_logs
18. newsletter_subscriptions
19. event_schedule
20. combo_items
21. event_registrations_config

---

## 🔑 Key RPC Functions

### Most Used
```javascript
// Attendance
verify_and_mark_attendance(user_id, event_id, scanned_by, location)
get_attendance_stats(event_id)

// Events
get_events_with_stats()
check_event_availability(event_id)

// Dashboard
get_user_dashboard_stats()
get_referral_leaderboard(limit)

// Feedback
submit_feedback(username, email, rating, message)
```

---

## 🎯 Common Tasks

### Create Super Admin
```sql
UPDATE profiles 
SET role = 'super_admin'
WHERE email = 'admin@example.com';
```

### Add Event
```sql
INSERT INTO events_config (event_key, name, price, type, capacity, is_open)
VALUES ('hackathon', 'Hackathon', 500, 'TEAM', 100, true);
```

### Check Registration Count
```sql
SELECT COUNT(*) FROM registrations WHERE event_id = 'your_event_id';
```

### View Attendance
```sql
SELECT * FROM attendance_logs 
WHERE event_id = 'your_event_id'
ORDER BY timestamp DESC;
```

---

## 🔐 User Roles

| Role | Access | Primary Use |
|------|--------|-------------|
| **student** | Dashboard, Registration | Default user |
| **volunteer** | Scanner | Attendance scanning |
| **event_coordinator** | Event management | Specific events |
| **registration_admin** | Reg desk | Payment verification |
| **super_admin** | Everything | Full control |

---

## 🌐 Routes Quick Access

### Public
- `/` - Home
- `/events` - Events list
- `/register-events` - Registration
- `/leaderboard` - Rankings

### User Dashboard
- `/dashboard` - Overview
- `/dashboard/registrations` - My events
- `/dashboard/attendance-qr` - QR code

### Admin
- `/admin` - Super admin
- `/admin/roles` - Role management
- `/admin/users` - User management
- `/admin/event-configuration` - Event setup
- `/coordinator` - Event coordinator
- `/volunteer` - Volunteer scanner

---

## 🐛 Quick Fixes

### Can't Connect to Database
```
1. Check Supabase URL in .env
2. Verify project is active
3. Check anon key is correct
```

### RLS Blocking Query
```sql
-- Check policies
SELECT tablename, policyname FROM pg_policies;

-- Temporarily disable (DEV ONLY!)
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
```

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### CORS Error
```javascript
// Backend server.js
app.use(cors({
  origin: ['http://localhost:5173', 'https://yourdomain.com']
}));
```

---

## 📞 Test Everything

### Pre-Launch Checklist
```
✅ User signup works
✅ Login works
✅ Event registration works
✅ Payment flow works
✅ QR code generates
✅ Attendance scan works
✅ Admin panel accessible
✅ Team creation works
✅ Feedback submission works
✅ Mobile responsive
```

---

## 🔄 Update Flow

### Database Changes
```sql
-- 1. Backup first
-- 2. Run migration
ALTER TABLE...
-- 3. Update RLS policies
-- 4. Test
```

### Frontend Changes
```bash
git pull
npm install
npm run build
vercel --prod
```

### Backend Changes
```bash
git pull
npm install
# Railway auto-deploys
```

---

## 📈 Monitor

### Daily Checks
```sql
-- Registration count
SELECT COUNT(*) FROM registrations;

-- Payment status
SELECT payment_status, COUNT(*) 
FROM registrations 
GROUP BY payment_status;

-- Errors
SELECT * FROM admin_logs 
WHERE created_at > NOW() - INTERVAL '1 day';
```

### Performance
```sql
-- Slow queries
SELECT query, mean_time 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 5;
```

---

## 💡 Pro Tips

1. **Always use RPC functions** - Safer than direct queries
2. **Test payments in test mode** first
3. **Backup before major changes**
4. **Monitor Supabase logs** daily
5. **Enable Realtime** on key tables
6. **Use indexes** on foreign keys
7. **Verify RLS policies** after changes
8. **Keep environment vars** secret
9. **Use transactions** for multi-step ops
10. **Document custom changes**

---

## 📦 Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Deploy Frontend
vercel --prod

# Deploy Backend
git push railway main

# Database Backup
# Export from Supabase Studio

# Check Logs
# Supabase → Logs → PostgreSQL

# Test Connection
curl https://your-api.com/health
```

---

## 🆘 Emergency Contacts

- **Supabase Issues**: support@supabase.io
- **Vercel Issues**: support@vercel.com
- **Payment Issues**: Razorpay support

---

## 📚 Full Documentation

For detailed guides, see:
- `README_COMPLETE.md` - Overview
- `PRODUCTION_DEPLOYMENT_GUIDE.md` - Deployment
- `COMPLETE_SITE_MAP.md` - All features

---

**Quick Ref v1.0 - DaKshaa T26** 🚀
