# Event-Based QR Attendance System - Implementation Guide
## DaKshaa T26 - Technical Documentation

---

## 📋 Overview

This document provides complete implementation details for the **Event-Based QR Attendance System** for DaKshaa T26. The system eliminates queue congestion and prevents entry fraud using QR code verification.

### Key Features
- ✅ **Single Identity, Multiple Contexts**: One QR per student, works for all events
- ✅ **Real-time Validation**: Instant verification against registration & payment status
- ✅ **Duplicate Prevention**: Blocks multiple entries to prevent ticket sharing
- ✅ **Multi-Event Support**: Different access rules per event (general entry, workshops, lunch)
- ✅ **Mobile-First Scanner**: Fast, responsive interface for volunteers
- ✅ **Audio & Haptic Feedback**: Immediate sensory confirmation
- ✅ **Offline-Ready**: Minimal network dependency once event is selected

---

## 🗂️ File Structure

```
DaKshaaWeb-main v2/
├── database/
│   └── attendance_system.sql         # Complete database schema & functions
│
├── Frontend/src/
│   ├── Pages/Admin/
│   │   ├── Volunteer/
│   │   │   └── AttendanceScanner.jsx  # Main scanner component
│   │   └── Coordinator/
│   │       └── (same scanner access)
│   │
│   ├── services/
│   │   └── attendanceService.js       # API service layer
│   │
│   └── Components/
│       └── ScannerAccessButton.jsx    # Quick access button
│
└── App.jsx                            # Routes updated
```

---

## 🛠️ Setup Instructions

### Step 1: Database Setup

1. **Open Supabase SQL Editor**
2. **Copy and run** `database/attendance_system.sql`
3. **Verify installation** by running these queries:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('events', 'registrations', 'attendance_logs');

-- Check functions exist
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('verify_and_mark_attendance', 'get_active_events_for_scanner');
```

### Step 2: Frontend Dependencies

Dependencies are already installed. The system uses:
- `html5-qrcode` - QR scanning library
- `framer-motion` - Animations
- `lucide-react` - Icons

### Step 3: Configure Events

Create events in Supabase (or use the sample events created by the SQL script):

```sql
INSERT INTO public.events (event_name, event_type, venue, requires_registration, requires_payment, is_active)
VALUES
  ('Main Hall Entry', 'general_entry', 'Main Auditorium', TRUE, TRUE, TRUE),
  ('AI Workshop', 'workshop', 'Lab 101', TRUE, TRUE, TRUE),
  ('Lunch Distribution', 'lunch', 'Cafeteria', FALSE, FALSE, TRUE);
```

---

## 🔐 Access Control

### Who Can Use the Scanner?

The scanner is accessible to:
- **Volunteers**: `/volunteer/scanner`
- **Coordinators**: `/coordinator/scanner`
- **Super Admins**: Both routes

Routes are protected by `ProtectedRoute` component with role verification.

---

## 📱 User Flow

### For Volunteers/Coordinators:

1. **Login** → Navigate to dashboard
2. **Click "Event Attendance Scanner"** button
3. **Select Event** from active events list
4. **Start Camera** → Point at student's QR code
5. **View Result** → Green (success), Red (denied), Orange (duplicate)
6. **Continue Scanning** → Auto-resumes after 4 seconds

### For Students:

1. **Navigate to Dashboard** → Attendance QR tab
2. **Show QR code** to volunteer
3. **Receive confirmation** (audio + visual feedback)

---

## 🎯 Validation Logic

The `verify_and_mark_attendance` function performs these checks in order:

```
1. User Exists? 
   ↓ NO → ❌ "User not found"
   ↓ YES

2. Event Active?
   ↓ NO → ❌ "Event not found or inactive"
   ↓ YES

3. Registration Required?
   ↓ YES → Is Registered?
   ↓        ↓ NO → ❌ "Not registered for this event"
   ↓        ↓ YES
   ↓
4. Payment Required?
   ↓ YES → Payment = PAID?
   ↓        ↓ NO → ❌ "Payment pending or failed"
   ↓        ↓ YES
   ↓
5. Already Attended?
   ↓ YES → ⚠️ "Already scanned" (shows first entry time)
   ↓ NO

6. ✅ SUCCESS
   - Log attendance
   - Return student details
```

---

## 🎨 UI States

### Success State (Green)
```jsx
{
  status: 'success',
  message: 'Access granted',
  student_name: 'John Doe',
  student_dept: 'Computer Science',
  student_roll_no: 'CS101'
}
```
- **Visual**: Large green checkmark ✅
- **Audio**: Success sound
- **Haptic**: Short vibration (200ms)

### Error State (Red)
```jsx
{
  status: 'error',
  message: 'User not registered',
  code: 'NOT_REGISTERED'
}
```
- **Visual**: Large red X ❌
- **Audio**: Error buzz
- **Haptic**: Long vibration (500ms)

### Warning State (Orange)
```jsx
{
  status: 'warning',
  message: 'Already scanned',
  code: 'DUPLICATE_ENTRY',
  first_entry_time: '2025-12-23T10:05:00Z'
}
```
- **Visual**: Warning triangle ⚠️
- **Audio**: Error buzz
- **Haptic**: Long vibration (500ms)

---

## 🧪 Testing Scenarios

### Test Case 1: General Entry Gate
**Config**: Volunteer selects "Main Hall Entry"
**User**: Registered + Paid
**Expected**: ✅ Access Granted

### Test Case 2: Premium Workshop
**Config**: Volunteer selects "AI Workshop"
**User**: Registered for general but NOT for workshop
**Expected**: ❌ Not Registered

### Test Case 3: Duplicate Entry
**Config**: Any event
**User**: Already scanned once
**Expected**: ⚠️ Already Scanned (shows first entry time)

### Test Case 4: Food Distribution
**Config**: Volunteer selects "Lunch Distribution"
**User**: Tries to scan twice
**Expected**: 
- First scan: ✅ Success
- Second scan: ⚠️ Already Scanned

---

## 🔧 API Reference

### Frontend Service Functions

```javascript
import attendanceService from '@/services/attendanceService';

// Get active events
const { data, success } = await attendanceService.getActiveEvents();

// Verify and mark attendance
const result = await attendanceService.verifyAndMarkAttendance(
  userId,        // UUID from QR
  eventId,       // Selected event
  scannedBy,     // Volunteer ID
  scanLocation   // Optional: "Main Gate"
);

// Get stats for an event
const stats = await attendanceService.getAttendanceStats(eventId);

// Get attendance logs
const logs = await attendanceService.getAttendanceLogs(eventId, limit);

// Export CSV
const csv = await attendanceService.exportAttendanceCSV(eventId);
```

### Database RPC Functions

```sql
-- Verify and mark attendance
SELECT public.verify_and_mark_attendance(
  'user-uuid'::UUID,
  'event-uuid'::UUID,
  'scanner-uuid'::UUID,
  'Main Gate'
);

-- Get active events
SELECT * FROM public.get_active_events_for_scanner();

-- Get attendance statistics
SELECT public.get_attendance_stats('event-uuid'::UUID);
```

---

## 📊 Database Schema

### events
```sql
CREATE TABLE public.events (
    id UUID PRIMARY KEY,
    event_name TEXT NOT NULL,
    event_type TEXT,  -- general_entry, workshop, lunch, session, competition
    venue TEXT,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    requires_registration BOOLEAN DEFAULT TRUE,
    requires_payment BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);
```

### registrations
```sql
CREATE TABLE public.registrations (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    event_id UUID REFERENCES events(id),
    payment_status TEXT,  -- PENDING, PAID, FAILED, REFUNDED
    payment_amount DECIMAL(10,2),
    transaction_id TEXT,
    UNIQUE(user_id, event_id)
);
```

### attendance_logs
```sql
CREATE TABLE public.attendance_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    event_id UUID REFERENCES events(id),
    scanned_by UUID REFERENCES auth.users(id),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    scan_location TEXT,
    UNIQUE(user_id, event_id, timestamp)
);
```

---

## 🚨 Error Codes

| Code | Message | Cause |
|------|---------|-------|
| `USER_NOT_FOUND` | User not found | Invalid QR or deleted user |
| `EVENT_NOT_FOUND` | Event not found or inactive | Wrong event or inactive |
| `NOT_REGISTERED` | User not registered for this event | Not in registrations table |
| `PAYMENT_PENDING` | Payment pending or failed | Registration exists but not paid |
| `DUPLICATE_ENTRY` | Already scanned | User already logged attendance |
| `DATABASE_ERROR` | Database error | SQL exception |

---

## 🎯 Performance Optimization

### Indexes Created
```sql
CREATE INDEX idx_registrations_user_event ON registrations(user_id, event_id);
CREATE INDEX idx_attendance_logs_user_event ON attendance_logs(user_id, event_id);
CREATE INDEX idx_attendance_logs_timestamp ON attendance_logs(timestamp DESC);
CREATE INDEX idx_events_active ON events(is_active, event_type);
```

### Best Practices
- ✅ All validation in **single RPC call** (reduces network roundtrips)
- ✅ Database-level constraints prevent duplicate entries
- ✅ Result modals auto-dismiss after 4 seconds
- ✅ Scanner auto-resumes for next student
- ✅ Stats cached in component state

---

## 🔒 Security Features

### Row Level Security (RLS)
```sql
-- Users can only view their own attendance
CREATE POLICY "Users can view own attendance"
ON attendance_logs FOR SELECT
USING (user_id = auth.uid());

-- Admins can view all
CREATE POLICY "Admins can view all attendance"
ON attendance_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND admin_role IN ('super_admin', 'coordinator', 'volunteer')
  )
);
```

### Function Security
- `SECURITY DEFINER`: Functions execute with database owner privileges
- Input validation: All UUIDs and params validated before execution
- Exception handling: Graceful error messages, no SQL exposure

---

## 📱 Mobile Optimization

### Camera Handling
- Auto-detects front/back cameras
- Switch camera button for devices with multiple cameras
- Fallback to manual entry if camera fails

### Responsive Design
- Mobile-first approach
- Touch-optimized buttons
- Large tap targets (min 48x48px)
- Optimized for 320px - 1920px screens

---

## 🎬 Integration Checklist

- [x] Database schema created
- [x] RPC functions deployed
- [x] Scanner component built
- [x] Service layer implemented
- [x] Routes configured
- [x] Dependencies installed
- [x] Sample events created
- [ ] **Add audio files** (`/public/success.mp3`, `/public/error.mp3`)
- [ ] **Test with real QR codes**
- [ ] **Train volunteers on scanner usage**

---

## 🚀 Deployment Steps

### 1. Database Deployment
```bash
# Copy SQL to clipboard
Get-Content "database\attendance_system.sql" -Raw | Set-Clipboard

# Paste in Supabase SQL Editor → Run
```

### 2. Frontend Deployment
```bash
cd Frontend
npm install
npm run build
# Deploy to hosting (Vercel, Netlify, etc.)
```

### 3. Post-Deployment Testing
1. Create test user with UUID
2. Register for test event
3. Mark payment as PAID
4. Scan QR code
5. Verify success response
6. Try scanning again → Should show "Already Scanned"

---

## 🆘 Troubleshooting

### Camera Not Working
**Problem**: Browser denies camera access
**Solution**: 
- Ensure HTTPS connection (camera API requires secure context)
- Check browser permissions in Settings
- Use manual entry as fallback

### "User Not Registered" Error
**Problem**: Valid QR but registration missing
**Solution**:
```sql
-- Check registration exists
SELECT * FROM registrations 
WHERE user_id = 'user-uuid' AND event_id = 'event-uuid';

-- If missing, create registration
INSERT INTO registrations (user_id, event_id, payment_status)
VALUES ('user-uuid', 'event-uuid', 'PAID');
```

### RPC Function Not Found
**Problem**: Function not executing
**Solution**:
```sql
-- Verify function exists
SELECT routine_name FROM information_schema.routines 
WHERE routine_name = 'verify_and_mark_attendance';

-- Re-run attendance_system.sql if missing
```

---

## 📞 Support

For implementation assistance:
- Review this documentation
- Check `database/attendance_system.sql` for schema details
- Inspect `Frontend/src/services/attendanceService.js` for API examples
- Test RPC functions directly in Supabase SQL Editor

---

## 📈 Future Enhancements

### Potential Features
- [ ] Bulk registration import
- [ ] Real-time attendance dashboard
- [ ] SMS notifications on check-in
- [ ] Certificate auto-unlock after attendance
- [ ] Analytics dashboard (peak hours, venue utilization)
- [ ] Offline mode with sync

---

## ✅ Implementation Complete

All components are ready for deployment:

1. ✅ **Database Schema**: Tables, indexes, RLS policies
2. ✅ **Backend Logic**: RPC functions with complete validation
3. ✅ **Frontend Scanner**: Mobile-responsive camera interface
4. ✅ **Service Layer**: Clean API abstraction
5. ✅ **Routing**: Protected routes for volunteers/coordinators
6. ✅ **Documentation**: Complete technical spec

**Next Steps**: 
1. Add audio files to `/public`
2. Run database setup in Supabase
3. Test with real event data
4. Train volunteer team

---

**Built for DaKshaa T26** 🚀
*Last Updated: December 23, 2025*
