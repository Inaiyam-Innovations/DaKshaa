# 🚀 DaKshaa Admin Roles - Quick Setup Guide

## ⚡ Quick Start (5 Minutes)

### Step 1: Run Database Scripts
Open Supabase SQL Editor and run in order:

```sql
-- 1. Extended role features
-- Copy and paste: database/admin_roles_extended.sql

-- 2. Assign roles to users
-- Copy and paste: database/assign_admin_roles.sql
```

### Step 2: Install Frontend Dependencies
```bash
cd "DaKshaaWeb-main v2/Frontend"
npm install html5-qrcode
```

### Step 3: Assign Your First Admin
```sql
-- Make yourself a super admin
UPDATE profiles 
SET role = 'super_admin' 
WHERE email = 'your-email@example.com';
```

---

## 🎭 Three Admin Roles

### 1️⃣ Registration Admin
- **URL**: `/admin/desk`
- **Device**: Laptop/Desktop
- **Main Job**: Approve cash payments, on-spot registration

**Quick Test**:
```sql
UPDATE profiles SET role = 'registration_admin' WHERE email = 'test@example.com';
```

### 2️⃣ Event Coordinator
- **URL**: `/coordinator`
- **Device**: Mobile (PWA)
- **Main Job**: Scan QR codes, mark attendance, select winners

**Quick Test**:
```sql
-- Set role
UPDATE profiles SET role = 'event_coordinator' WHERE email = 'test@example.com';

-- Assign to event
INSERT INTO event_coordinators (user_id, event_id, assigned_by)
VALUES (
  (SELECT id FROM profiles WHERE email = 'test@example.com'),
  'paper_presentation',
  (SELECT id FROM profiles WHERE role = 'super_admin' LIMIT 1)
);
```

### 3️⃣ Volunteer
- **URL**: `/volunteer`
- **Device**: Mobile (PWA)
- **Main Job**: Verify gate pass, distribute kits, guide students

**Quick Test**:
```sql
UPDATE profiles SET role = 'volunteer' WHERE email = 'test@example.com';
```

---

## 📊 Access Matrix

| Action | Reg Admin | Coordinator | Volunteer |
|--------|-----------|-------------|-----------|
| Approve Cash | ✅ | ❌ | ❌ |
| Mark Attendance | ❌ | ✅ | ⚠️ Read |
| Select Winners | ❌ | ✅ | ❌ |
| Distribute Kits | ❌ | ⚠️ View | ✅ |
| View Revenue | ⚠️ Own | ❌ | ❌ |

---

## 🗄️ Key Database Tables

### Created by admin_roles_extended.sql:
- `attendance` - QR scans & manual marks
- `event_coordinators` - Assignment table
- `event_winners` - Results (1st, 2nd, 3rd)
- `kit_distribution` - Kit tracking
- `event_venues` - Room/hall info
- `transactions` - Payment audit trail

### Updated Columns:
**registrations**:
- `payment_mode` (cash/online)
- `approved_by` (admin ID)
- `approved_at` (timestamp)

**profiles**:
- `kit_delivered` (boolean)

---

## 🎯 Testing Checklist

### Registration Admin
- [ ] Login → Navigate to `/admin/desk`
- [ ] See 3 stat cards (Cash in Hand, Pending, Processed)
- [ ] Try "On-Spot Registration" tab
- [ ] Try "User Search" tab

### Event Coordinator
- [ ] Login → Navigate to `/coordinator`
- [ ] See assigned events dropdown
- [ ] Click "Start Scanning" on QR Scanner tab
- [ ] Camera should open
- [ ] Try Manual Attendance tab

### Volunteer
- [ ] Login → Navigate to `/volunteer`
- [ ] See 3 tabs (Gate Pass, Kit Distribution, Venue Guide)
- [ ] Try Gate Pass scanner
- [ ] Check Venue Guide list

---

## 🔧 Troubleshooting

### "No events assigned" for Coordinator
```sql
-- Check assignments
SELECT * FROM event_coordinators WHERE user_id = (SELECT id FROM profiles WHERE email = 'coord@test.com');

-- Add assignment
INSERT INTO event_coordinators (user_id, event_id, assigned_by)
VALUES (
  (SELECT id FROM profiles WHERE email = 'coord@test.com'),
  'paper_presentation',
  (SELECT id FROM profiles WHERE role = 'super_admin' LIMIT 1)
);
```

### Camera not working
- Check browser permissions (Allow camera access)
- HTTPS required for camera API
- Use localhost or deployed HTTPS site

### Can't see admin menu
```sql
-- Verify role
SELECT email, role FROM profiles WHERE email = 'your-email@example.com';

-- Should return: registration_admin, event_coordinator, volunteer, or super_admin
```

---

## 📱 URLs Cheat Sheet

| Role | URL | Device |
|------|-----|--------|
| Super Admin | `/admin` | Desktop |
| Registration Admin | `/admin/desk` | Desktop |
| Event Coordinator | `/coordinator` | Mobile |
| Volunteer | `/volunteer` | Mobile |

---

## 🎨 UI Features

### Registration Admin Dashboard
- ✨ Desktop-optimized layout
- 📊 Live stats cards
- 🔍 Advanced search
- 💵 Cash queue management
- ➕ Fast on-spot registration
- 🔧 Troubleshooting tools

### Event Coordinator Dashboard
- 📱 Mobile-first design
- 📷 Large QR scanner
- 🔊 Audio feedback (ting/buzz)
- ✅ Green/red visual feedback
- 🏆 Winner selection UI
- 📋 Manual backup options

### Volunteer Dashboard
- 📱 Mobile-only interface
- 🛡️ Read-only access notice
- 🎁 Kit type selection
- 🗺️ Searchable venue guide
- 🚪 Gate pass verification

---

## 🚨 Important Notes

1. **Camera Permissions**: Users must allow camera access on first scan
2. **HTTPS Required**: Camera API only works on HTTPS or localhost
3. **Role Assignment**: Users can only have ONE role at a time
4. **Coordinator Events**: Must assign coordinators to specific events
5. **RLS Policies**: All tables protected by Row Level Security

---

## 📞 Quick Commands

### View all admins:
```sql
SELECT email, full_name, role FROM profiles 
WHERE role != 'student' 
ORDER BY role;
```

### Reset user to student:
```sql
UPDATE profiles SET role = 'student' WHERE email = 'user@example.com';
```

### Check what permissions user has:
```sql
SELECT p.email, p.role, 
       ARRAY_AGG(ec.event_id) as assigned_events
FROM profiles p
LEFT JOIN event_coordinators ec ON ec.user_id = p.id
WHERE p.email = 'user@example.com'
GROUP BY p.id, p.email, p.role;
```

---

## ✅ Setup Verification

Run this query to verify everything is set up:

```sql
-- Should return all tables
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'attendance', 'event_coordinators', 'event_winners',
  'kit_distribution', 'event_venues', 'transactions'
)
ORDER BY table_name;

-- Should return 6 rows
```

---

## 🎉 You're Ready!

Once setup is complete:
1. Create test users for each role
2. Login with different roles to test
3. Try scanning QR codes with coordinator/volunteer
4. Process a cash payment with registration admin

**Full Documentation**: See `ADMIN_ROLES_GUIDE.md`

---

**Version**: 1.0 | **Last Updated**: Dec 2025
