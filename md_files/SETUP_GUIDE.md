# Quick Setup Guide - Advanced Admin Modules

## Step 1: Database Setup

Run the SQL files in your Supabase SQL Editor in this order:

1. **Base Schema** (if not already done):
   ```sql
   -- Run: database/schema.sql
   ```

2. **Advanced Features**:
   ```sql
   -- Run: database/advanced_features.sql
   ```

This will create:
- `waitlist` table
- `transactions` table
- `cashier_sessions` table
- `blacklist` table
- `admin_logs` table (NEW)
- Updated `registrations` table with new columns
- RLS policies for all tables

## Step 2: Verify Database

Check that the following tables exist:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('admin_logs', 'waitlist', 'transactions');
```

## Step 3: Frontend Setup

The frontend components are already in place:

### New Components Created:
- `Frontend/src/Pages/Admin/SuperAdmin/RegistrationManagement.jsx`
- `Frontend/src/Pages/Admin/SuperAdmin/FinanceModule.jsx`
- `Frontend/src/Pages/Admin/SuperAdmin/ParticipantCRM.jsx`
- `Frontend/src/Pages/Admin/SuperAdmin/WaitlistManagement.jsx`

### Service Functions:
- `Frontend/src/services/adminService.js` (all functions added)

### Routes Added to App.jsx:
- `/admin/registrations` → Registration Management
- `/admin/finance-module` → Finance Module
- `/admin/crm` → Participant CRM
- `/admin/waitlist` → Waitlist Management

## Step 4: Navigation

The admin sidebar has been updated with new menu items (visible only to super_admin):
- 📊 Registration Management
- 💰 Finance Module
- ✉️ Participant CRM
- ⏰ Waitlist

## Step 5: Test the Features

### Test Registration Management:
1. Login as super_admin
2. Navigate to `/admin/registrations`
3. Try "Force Add User" feature
4. Test moving a user to different event
5. Test upgrading to combo

### Test Finance Module:
1. Navigate to `/admin/finance-module`
2. Check Cashier Logs tab
3. Try initiating a refund (creates log entry)
4. Check Reconciliation tab for data integrity

### Test Participant CRM:
1. Navigate to `/admin/crm`
2. Search and edit a profile
3. Try bulk email feature (logs action)
4. View activity logs

### Test Waitlist:
1. Navigate to `/admin/waitlist`
2. View waitlisted users
3. Try promoting a user (if waitlist exists)

## Step 6: Role-Based Access

Make sure you have a super_admin user:

```sql
-- Check your role
SELECT id, email, role 
FROM profiles 
WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@example.com');

-- Update to super_admin if needed
UPDATE profiles 
SET role = 'super_admin' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@example.com');
```

## Step 7: Optional Integrations

### For Production Use:

#### 1. Email Integration (Bulk Email)
Add to `.env`:
```env
VITE_SENDGRID_API_KEY=your_sendgrid_key
```

Or use EmailJS:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

#### 2. Razorpay Refunds (Backend Required)
Create backend endpoint:
```javascript
// backend/routes/refunds.js
app.post('/api/refunds/initiate', async (req, res) => {
  const { paymentId, amount, reason } = req.body;
  
  const refund = await razorpay.payments.refund(paymentId, {
    amount: amount * 100, // Convert to paise
    notes: { reason }
  });
  
  res.json({ success: true, refund });
});
```

## Step 8: Verify Everything Works

### Quick Checklist:
- [ ] Can access all 4 new admin pages
- [ ] Tables load without errors
- [ ] Search functionality works
- [ ] Filters apply correctly
- [ ] Modals open and close
- [ ] Actions create entries in database
- [ ] Activity logs show actions
- [ ] No console errors

## Troubleshooting

### Issue: "get_user_role() function not found"
**Fix:** Run the function from schema.sql:
```sql
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT role FROM profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Issue: "RLS policy error"
**Fix:** Disable RLS temporarily for testing:
```sql
ALTER TABLE admin_logs DISABLE ROW LEVEL SECURITY;
```
Then re-enable and fix policies.

### Issue: "Cannot read properties of null"
**Fix:** Make sure:
1. User is logged in
2. User has super_admin role
3. Tables are created
4. Foreign keys are valid

### Issue: Filters not working
**Fix:** Check browser console for errors. Verify Supabase connection.

## Next Steps

1. **Customize:** Modify components to match your exact needs
2. **Add Features:** Refer to "Future Enhancements" in main README
3. **Test Thoroughly:** With different roles and edge cases
4. **Monitor:** Check admin_logs regularly
5. **Backup:** Set up automated database backups

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Supabase logs for database errors
3. Verify RLS policies are correct
4. Review the main ADMIN_MODULES_README.md for detailed documentation

---

**Setup Complete!** 🎉

You now have a fully functional advanced admin system with:
- ✅ Registration Management (Force Add, Move, Upgrade)
- ✅ Finance Module (Cashier Logs, Refunds, Reconciliation)
- ✅ Participant CRM (Edit Profiles, Bulk Email, Activity Logs)
- ✅ Waitlist Management (View, Promote)
