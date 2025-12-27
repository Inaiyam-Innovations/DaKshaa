# 🎯 COMPLETE DATABASE CONNECTION GUIDE

## ✅ Status Check

Run this command to verify everything is in place:
```powershell
cd "DaKshaaWeb-main v2"
node verify-db-connection.js
```

---

## 📝 Step-by-Step Connection Process

### **STEP 1: Create .env File**

1. Navigate to Frontend folder:
```powershell
cd "DaKshaaWeb-main v2\Frontend"
```

2. Copy the example file:
```powershell
Copy-Item .env.example .env
```

3. Open `.env` file and add your Supabase credentials:

**Where to find these?**
- Go to: https://app.supabase.com
- Select your project
- Click **Settings** (gear icon) → **API**
- Copy:
  - **Project URL** → `VITE_SUPABASE_URL`
  - **anon public** key → `VITE_SUPABASE_ANON_KEY`

Your `.env` should look like:
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

### **STEP 2: Run Database Setup in Supabase**

1. **Open Supabase Dashboard:**
   - Go to: https://app.supabase.com
   - Select your project
   - Click **SQL Editor** (in left sidebar)

2. **Execute Setup Script:**
   - Click **New Query**
   - Open file: `DaKshaaWeb-main v2/database/setup_admin_modules.sql`
   - Copy ALL content
   - Paste in Supabase SQL Editor
   - Click **Run** (or press Ctrl+Enter)
   
   **Expected Output:**
   ```
   ✓ waitlist table exists
   ✓ admin_logs table exists
   ✓ transactions table exists
   DATABASE SETUP COMPLETE!
   ```

3. **Verify Setup:**
   - Click **New Query** again
   - Open file: `DaKshaaWeb-main v2/database/verify_setup.sql`
   - Copy and paste content
   - Click **Run**
   
   **Expected Output:**
   ```
   Tables Created: 5 / 5
   ✓ Database setup is COMPLETE and VERIFIED!
   ```

---

### **STEP 3: Create Super Admin User**

In Supabase SQL Editor, run this (replace email with yours):

```sql
-- Check your user
SELECT 
    au.email,
    p.full_name,
    p.role
FROM auth.users au
LEFT JOIN profiles p ON p.id = au.id
WHERE au.email = 'YOUR_EMAIL@example.com';

-- Make super admin
UPDATE profiles 
SET role = 'super_admin' 
WHERE id = (
    SELECT id FROM auth.users 
    WHERE email = 'YOUR_EMAIL@example.com'
);

-- Verify
SELECT 
    au.email,
    p.role as current_role
FROM auth.users au
JOIN profiles p ON p.id = au.id
WHERE au.email = 'YOUR_EMAIL@example.com';
```

You should see: `current_role: super_admin`

---

### **STEP 4: Start Your Application**

```powershell
# Navigate to Frontend
cd "DaKshaaWeb-main v2\Frontend"

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### **STEP 5: Test Admin Modules**

1. **Open browser:** http://localhost:5173/login

2. **Login** with your super admin email

3. **Navigate to Admin Dashboard:**
   - Should redirect to: http://localhost:5173/admin
   - You'll see new menu items:
     - 📊 Registration Management
     - 💰 Finance Module
     - ✉️ Participant CRM
     - ⏰ Waitlist

4. **Test Each Module:**

   **Registration Management** (`/admin/registrations`):
   - Click "Force Add User"
   - Search for a user
   - Select event and add
   
   **Finance Module** (`/admin/finance-module`):
   - View Cashier Logs tab
   - Check Reconciliation tab
   
   **Participant CRM** (`/admin/crm`):
   - Search for a user
   - Edit their profile
   - Check Activity Log tab
   
   **Waitlist** (`/admin/waitlist`):
   - View empty waitlist (normal at start)
   - Try filtering by event

---

## 🔍 Verification Commands

### Check Database Connection
```powershell
cd "DaKshaaWeb-main v2"
node verify-db-connection.js
```

### Check if Frontend is configured
```powershell
cd Frontend
Get-Content .env
```

### Check if tables exist (run in Supabase SQL Editor)
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('waitlist', 'admin_logs', 'transactions')
ORDER BY table_name;
```

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot connect to Supabase"
**Fix:**
1. Check `.env` file exists in `Frontend` folder
2. Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
3. Restart dev server: `npm run dev`

### Issue: "get_user_role() does not exist"
**Fix:** Run this in Supabase SQL Editor:
```sql
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Issue: "Permission denied"
**Fix:**
1. Make sure you're logged in as super_admin
2. Run Step 3 again to verify role
3. Logout and login again

### Issue: "Tables not loading"
**Fix:**
1. Open browser console (F12)
2. Check for errors
3. Verify Supabase credentials in .env
4. Hard refresh (Ctrl+Shift+R)

---

## ✅ Connection Checklist

Before testing, verify:

- [ ] `.env` file exists in `Frontend` folder
- [ ] Supabase URL and Anon Key are correct
- [ ] Database setup script ran successfully (5 tables created)
- [ ] At least one user has `super_admin` role
- [ ] Frontend dev server is running
- [ ] Can login to the application
- [ ] Can access `/admin` route
- [ ] See all 4 new menu items in admin sidebar

---

## 📊 What's Connected Now

### Database ↔️ Frontend Connection:
```
Supabase Database
    ↓
.env credentials
    ↓
supabase.js client
    ↓
adminService.js (20+ functions)
    ↓
Admin Components (UI)
    ↓
Your Browser
```

### Data Flow Example:
```
1. User clicks "Force Add" button
   ↓
2. RegistrationManagement.jsx calls forceAddUser()
   ↓
3. adminService.js → supabase.from('registrations').insert()
   ↓
4. Supabase receives request, checks RLS
   ↓
5. Data inserted, admin_logs entry created
   ↓
6. Success response back to UI
   ↓
7. Table refreshes with new data
```

---

## 🎉 Success!

If you've completed all steps:

✅ Database is set up with 5 new tables  
✅ Frontend is connected to Supabase  
✅ Admin modules are accessible  
✅ You have super_admin access  
✅ All features are working  

**You can now manage:**
- Registrations (force add, move, upgrade)
- Finances (cashier logs, refunds, reconciliation)
- Participants (edit profiles, bulk email, activity logs)
- Waitlists (view, promote users)

---

## 📚 Additional Resources

- **Detailed Feature Docs:** See `ADMIN_MODULES_README.md`
- **Setup Guide:** See `SETUP_GUIDE.md`
- **Database Details:** See `DATABASE_SETUP.md`
- **Supabase Docs:** https://supabase.com/docs

---

**Need Help?** 
1. Check browser console for errors
2. Check Supabase logs in dashboard
3. Review the troubleshooting section above
4. Verify all checklist items are complete
