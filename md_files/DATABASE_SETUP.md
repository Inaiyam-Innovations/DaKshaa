# 🚀 Database Setup Instructions

## Quick Start (3 Steps)

### Step 1: Run the Main Setup Script

1. Open **Supabase Dashboard** → Your Project → **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire content of `database/setup_admin_modules.sql`
4. Click **Run** or press `Ctrl+Enter`

**Expected Output:**
```
✓ waitlist table exists
✓ admin_logs table exists
✓ transactions table exists
✓ cashier_sessions table exists
✓ blacklist table exists
=== Verification Complete ===

DATABASE SETUP COMPLETE!
```

### Step 2: Verify Setup

1. In SQL Editor, create a **New Query**
2. Copy and paste content from `database/verify_setup.sql`
3. Click **Run**

**Expected Output:**
```
Tables Created: 5 / 5
RLS Policies: 11
Indexes: 12+

✓ Database setup is COMPLETE and VERIFIED!
```

### Step 3: Create Super Admin User

In the same SQL Editor, run this query (replace with your email):

```sql
-- Check your current user
SELECT 
    au.email,
    p.full_name,
    p.role
FROM auth.users au
LEFT JOIN profiles p ON p.id = au.id
WHERE au.email = 'your-email@example.com';

-- Make yourself super admin
UPDATE profiles 
SET role = 'super_admin' 
WHERE id = (
    SELECT id FROM auth.users 
    WHERE email = 'your-email@example.com'
);

-- Verify the change
SELECT 
    au.email,
    p.full_name,
    p.role
FROM auth.users au
JOIN profiles p ON p.id = au.id
WHERE au.email = 'your-email@example.com';
```

Expected output should show `role: super_admin`.

---

## ✅ Verification Checklist

After running the scripts, verify:

- [ ] 5 new tables created (waitlist, admin_logs, transactions, cashier_sessions, blacklist)
- [ ] registrations table has new columns (payment_mode, amount_paid, marked_by, is_force_added)
- [ ] profiles table has new columns (is_blocked, notes, email)
- [ ] RLS policies are enabled
- [ ] At least one user has super_admin role

---

## 🧪 Test the Admin Modules

1. **Start your frontend:**
   ```bash
   cd Frontend
   npm run dev
   ```

2. **Login with super admin account**

3. **Navigate to admin pages:**
   - http://localhost:5173/admin/registrations
   - http://localhost:5173/admin/finance-module
   - http://localhost:5173/admin/crm
   - http://localhost:5173/admin/waitlist

4. **You should see:**
   - All pages load without errors
   - Navigation menu shows all 4 new modules
   - Tables are empty (no data yet)
   - All filters and search boxes work

---

## 📊 What Was Connected

### Database Tables (5 New):
1. **waitlist** - Stores users waiting for full events
2. **admin_logs** - Tracks every admin action (audit trail)
3. **transactions** - Financial transaction records
4. **cashier_sessions** - Cash collection tracking
5. **blacklist** - Blocked users/emails

### Updated Tables (2):
1. **registrations** - Added payment tracking columns
2. **profiles** - Added blocking and notes

### Frontend Services:
All 20+ functions in `Frontend/src/services/adminService.js` are now connected to:
- Supabase database via row level security
- Real-time queries
- Proper error handling

### Routing:
- `/admin/registrations` → RegistrationManagement.jsx
- `/admin/finance-module` → FinanceModule.jsx
- `/admin/crm` → ParticipantCRM.jsx
- `/admin/waitlist` → WaitlistManagement.jsx

---

## 🔒 Security Features Connected

✅ **Row Level Security (RLS):**
- Only super_admins can access these modules
- Users can only see their own waitlist entries
- All admin actions are logged

✅ **Audit Trail:**
- Every action logged in admin_logs table
- Includes: who, what, when, details (JSON)
- Cannot be deleted (only super_admin can view)

✅ **Role-Based Access:**
- super_admin: Full access
- registration_admin: Limited access
- student: No access to admin modules

---

## 🐛 Troubleshooting

### Error: "get_user_role() does not exist"
**Solution:** Run this in SQL Editor:
```sql
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Error: "permission denied for table admin_logs"
**Solution:** Your user might not have super_admin role. Run Step 3 above.

### Error: "Cannot read properties of undefined"
**Solution:** 
1. Clear browser cache
2. Hard reload (Ctrl+Shift+R)
3. Check console for specific error
4. Verify Supabase connection in supabase.js

### Tables not showing data
**Solution:** This is normal! The tables are empty initially. Try:
1. Create a test registration
2. Use "Force Add" feature
3. Data will appear in tables

---

## 📝 Sample Test Queries

Want to add test data? Run these in SQL Editor:

```sql
-- Add a test event
INSERT INTO events (event_id, category, price, capacity, is_active)
VALUES ('WORKSHOP_AI', 'technical', 200, 30, true);

-- Add a test combo
INSERT INTO combos (combo_id, name, price, is_active)
VALUES ('COMBO_TECH', 'Technical Package', 500, true);

-- Check if data was added
SELECT * FROM events WHERE event_id = 'WORKSHOP_AI';
SELECT * FROM combos WHERE combo_id = 'COMBO_TECH';
```

---

## ✨ You're All Set!

Your database is now fully connected with:
- ✅ All admin tables created
- ✅ RLS policies configured
- ✅ Indexes for performance
- ✅ Triggers for business logic
- ✅ Super admin user ready

**Next:** Start using the admin modules at `/admin` in your app!

---

**Need Help?** Check:
- Main README for feature documentation
- SETUP_GUIDE.md for detailed setup
- Supabase logs for errors
- Browser console for frontend issues
