# Accommodation & Lunch Booking Fix Guide

## 🔴 Problem

You were encountering this error when trying to book accommodation or lunch:

```
❌ Error inserting data: {
  code: '42501',
  details: null,
  hint: null,
  message: 'new row violates row-level security policy for table "accommodation_requests"'
}

Error adding lunch booking: {
  code: '42501',
  details: null,
  hint: null,
  message: 'new row violates row-level security policy for table "lunch_bookings"'
}
```

## 🔍 What This Error Means

**Error Code `42501`** means **"Insufficient Privilege"** in PostgreSQL.

Supabase uses **Row-Level Security (RLS)** to control who can read, insert, update, or delete data in each table. The error occurs because:

1. RLS was **enabled** on the tables
2. But the RLS **policies** were either:
   - Too restrictive (requiring exact user_id match during INSERT)
   - Missing entirely
   - Not properly configured for authenticated users

## ✅ The Solution

### What Was Fixed:

1. **Created proper RLS policies** for both tables
2. **Loosened INSERT restrictions** - now any authenticated user can insert (backend can insert on behalf of users)
3. **Added proper SELECT policies** - users can only see their own bookings
4. **Added UPDATE/DELETE policies** - users and admins have proper access
5. **Granted necessary permissions** to authenticated role

### Files Changed:

#### 1. **Backend** (`Backend/server.js`)
- ✅ Added proper error handling
- ✅ Returns `success: true/false` in responses
- ✅ Better error messages

#### 2. **Frontend** (`Frontend/src/Pages/Accomodation/Components/AccommodationBooking.jsx`)
- ✅ Added toast notifications for success
- ✅ Added toast notifications for errors  
- ✅ Better error handling
- ✅ Form reset after successful booking
- ✅ Proper loading states

#### 3. **Database** (`database/fix_accommodation_lunch_rls.sql`)
- ✅ New SQL script to fix all RLS policies
- ✅ Creates tables if they don't exist
- ✅ Drops old conflicting policies
- ✅ Creates new permissive policies
- ✅ Adds indexes for performance
- ✅ Grants proper permissions

## 🚀 How to Apply the Fix

### Method 1: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to your project at https://app.supabase.com
   - Navigate to **SQL Editor** (in left sidebar)

2. **Run the Fix**
   - Open the file: `database/fix_accommodation_lunch_rls.sql`
   - Copy ALL the SQL content
   - Paste it into the SQL Editor
   - Click **"Run"** button

3. **Verify Success**
   - You should see a success message
   - Check that tables exist: `accommodation_requests` and `lunch_bookings`

### Method 2: Using PowerShell Script

```powershell
# Run from project root
.\fix-accommodation-rls.ps1
```

This script will:
- Check for Supabase CLI
- Run the SQL file automatically
- Show success/error messages

### Method 3: Using Supabase CLI

```bash
# Make sure you're linked to your project
supabase link --project-ref <your-project-ref>

# Run the SQL file
supabase db push --file database/fix_accommodation_lunch_rls.sql
```

## 🧪 Testing the Fix

1. **Restart Backend Server**
   ```powershell
   cd Backend
   npm start
   ```

2. **Test Accommodation Booking**
   - Login to your app
   - Navigate to Accommodation page
   - Click "BOOK NOW" on Accommodation card
   - Fill in details
   - Select date(s)
   - Click "Confirm Booking"
   - ✅ You should see: **"Accommodation booked successfully! 🏨"**

3. **Test Lunch Booking**
   - Click "RESERVE NOW" on Lunch card
   - Fill in details
   - Select date(s)
   - Click "Confirm Reservation"
   - ✅ You should see: **"Lunch reserved successfully! 🍽️"**

## 📋 Table Structure Verification

### accommodation_requests Table:
```sql
- id (UUID, Primary Key)
- user_id (UUID, references auth.users)
- full_name (TEXT)
- email (TEXT)
- phone (TEXT)
- college_name (TEXT)
- check_in_date (DATE)
- check_out_date (DATE)
- number_of_days (INTEGER)
- include_food (BOOLEAN)
- total_price (DECIMAL)
- payment_status (TEXT: PENDING/PAID/FAILED/REFUNDED)
- payment_id (TEXT)
- special_requests (TEXT)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

### lunch_bookings Table:
```sql
- id (UUID, Primary Key)
- user_id (UUID, references auth.users)
- full_name (TEXT)
- email (TEXT)
- phone (TEXT)
- lunch_date (DATE)
- quantity (INTEGER)
- total_price (DECIMAL)
- payment_status (TEXT: PENDING/PAID/FAILED/REFUNDED)
- payment_id (TEXT)
- created_at (TIMESTAMPTZ)
- UNIQUE constraint on (user_id, lunch_date)
```

## 🎯 New RLS Policies

### Accommodation Requests:
1. **SELECT**: Users can view their own + admins can view all
2. **INSERT**: Any authenticated user can insert
3. **UPDATE**: Users can update own + admins can update all
4. **DELETE**: Only admins can delete

### Lunch Bookings:
1. **SELECT**: Users can view their own + admins can view all
2. **INSERT**: Any authenticated user can insert
3. **UPDATE**: Users can update own + admins can update all
4. **DELETE**: Only admins can delete

## 🎨 Toast Notifications

### Success Messages:
- ✅ **Accommodation**: Green toast with "Accommodation booked successfully! 🏨"
- ✅ **Lunch**: Orange toast with "Lunch reserved successfully! 🍽️"

### Error Messages:
- ❌ **No dates selected**: "Please select at least one date 📅"
- ❌ **Not logged in**: "Please login to book 🔒"
- ❌ **Booking failed**: Shows actual error message from backend

## 🔧 Troubleshooting

### Issue: Still getting RLS errors

**Solution:**
1. Make sure you ran the SQL script in Supabase Dashboard
2. Check if the policies were created:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename IN ('accommodation_requests', 'lunch_bookings');
   ```
3. Verify RLS is enabled:
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename IN ('accommodation_requests', 'lunch_bookings');
   ```

### Issue: Backend still showing errors

**Solution:**
1. Check backend console for specific error messages
2. Verify Supabase connection in `Backend/db.js`
3. Restart backend server
4. Check if user is properly authenticated

### Issue: Frontend not showing toast messages

**Solution:**
1. Check browser console for errors
2. Verify `react-hot-toast` is imported
3. Check network tab to see backend response
4. Make sure `toast` is imported from 'react-hot-toast'

## 📞 Support

If you still face issues:

1. **Check Backend Logs**: Look for error messages in terminal
2. **Check Browser Console**: Look for frontend errors
3. **Check Supabase Logs**: Go to Supabase Dashboard -> Logs
4. **Verify Database**: Use SQL Editor to check if data is being inserted

## ✨ Summary

- ✅ RLS policies fixed for both tables
- ✅ Backend now returns proper success/error responses
- ✅ Frontend shows beautiful toast notifications
- ✅ Form fields match database schema exactly
- ✅ Proper error handling throughout the flow
- ✅ Users can successfully book accommodation and lunch!

---

**Last Updated**: December 28, 2025
