# DAKSHAA Admin Roles Implementation Guide

## Overview
This document outlines the three admin role types implemented for the DaKshaa event management system, their features, and access controls.

---

## 📋 Table of Contents
1. [Registration Admin (Help Desk & Cashier)](#registration-admin)
2. [Event Coordinator (Manager)](#event-coordinator)
3. [Volunteer (Helper)](#volunteer)
4. [Database Schema](#database-schema)
5. [Setup Instructions](#setup-instructions)
6. [Access Control Matrix](#access-control-matrix)

---

## 1. Registration Admin (Help Desk & Cashier) {#registration-admin}

### **Role**: `registration_admin`
### **Primary Location**: Stationary desk with laptop
### **Dashboard**: Desktop-optimized

### **Key Features**

#### A. **Live Queue - Cash Payment Approval**
- **Scenario**: Student registers online, selects "Pay by Cash", walks to desk
- **Workflow**:
  1. Student provides name/roll number
  2. Admin searches in live queue
  3. Admin verifies student identity
  4. Admin collects cash
  5. Admin clicks "Approve & Print"
  6. System updates `payment_status` to `completed`
  7. Transaction recorded in `transactions` table

**Stats Displayed**:
- **Cash in Hand**: Total cash collected by this admin today
- **Pending Approvals**: Number of students in queue
- **Processed Today**: Total tickets issued today

#### B. **On-Spot Registration (Fast Track)**
- **Scenario**: Student has no internet or dead phone battery
- **Features**:
  - Simplified quick form (no fancy graphics)
  - Fields: Name, Mobile, Email, College, Department, Year, Event Selection
  - Admin fills details → Collects cash → Clicks "Register & Approve"
  - System auto-generates ticket and shows QR code
  - Student can photograph QR from admin's screen OR receive SMS

#### C. **Ticket Troubleshooting**
- **Scenario**: "I paid online but didn't get a ticket"
- **Functions**:
  - Search by Transaction ID, Email, or Mobile
  - **Re-verify Payment**: Calls Razorpay API to check status
  - **Force Sync**: If Razorpay says "Success" but DB says "Pending", admin can force sync

**Database Tables Used**:
- `registrations` - Payment status updates
- `transactions` - Cash collection audit trail
- `cashier_sessions` - Session tracking (optional)

**Files**:
- Component: `Frontend/src/Pages/Admin/RegAdmin/RegistrationAdminDashboard.jsx`
- Route: `/admin/desk`
- Required Role: `registration_admin` or `super_admin`

---

## 2. Event Coordinator (Manager) {#event-coordinator}

### **Role**: `event_coordinator`
### **Primary Location**: Mobile (standing at venue door)
### **Dashboard**: Mobile-first PWA (looks like an app)

### **Key Features**

#### A. **QR Scanner (Primary Tool)**
- **UI**: Large camera window (60% of screen)
- **Logic**:
  1. Scan student's QR code
  2. Validate ticket for this specific event
  3. **Feedback**:
     - ✅ **Valid**: Green screen + "TING" sound + Display student name
     - ❌ **Invalid**: Red screen + "BUZZ" sound + Error message
       - "Wrong Event"
       - "Already Used"
       - "Payment Not Completed"

**Stats Displayed**:
- **Registered**: Total registered for event
- **Checked In**: Total attendance marked
- **Remaining**: Students yet to arrive

#### B. **Manual Attendance (Backup)**
- **Scenario**: Student's phone screen broken or QR won't scan
- **Workflow**:
  1. Search student name
  2. Click "Mark Present"
  3. System records as "Manual Override"
  4. Logs include `mark_type: 'manual'`

#### C. **Winner Selection (Post-Event)**
- **Scenario**: Event finished, judges decided results
- **UI**: List of only students who were marked "Present"
- **Workflow**:
  1. Select user from dropdown
  2. Assign position (Winner / Runner / 3rd Place)
  3. Click "Submit Results"
  4. Backend updates `event_winners` table
  5. Unlocks "Merit Certificate" for winners

**Database Tables Used**:
- `event_coordinators` - Assignment table
- `attendance` - QR scans and manual marks
- `event_winners` - Results tracking

**Files**:
- Component: `Frontend/src/Pages/Admin/Coordinator/EventCoordinatorDashboard.jsx`
- Route: `/coordinator`
- Required Role: `event_coordinator` or `super_admin`

---

## 3. Volunteer (Helper) {#volunteer}

### **Role**: `volunteer`
### **Primary Location**: Mobile only
### **Dashboard**: Mobile PWA with restricted/read-only access

### **Key Features**

#### A. **Global Gate Pass Scanner (Main Gate)**
- **Scenario**: Checking if student allowed to enter campus/fest area
- **Logic**:
  - Scans any valid DaKshaa QR code
  - ✅ **Green**: "Valid Registration" (Shows Name + College)
  - ❌ **Red**: "Fake/Invalid Code"
- **Note**: Does NOT mark attendance for specific events; just verifies "Is this a registered user?"

#### B. **Food/Kit Distribution**
- **Scenario**: Handing out Welcome Kits, Lunch, Snacks
- **Workflow**:
  1. Select kit type (Welcome Kit, Lunch, Snacks, Merchandise)
  2. Scan student's QR
  3. System checks: `kit_delivered == false`
  4. If true: Updates `kit_delivered = true` and shows "Deliver Kit"
  5. If false: Shows "ALREADY TAKEN" (prevents double claiming)

#### C. **Room/Hall Guide (Venue Information)**
- **UI**: Simple searchable list of "Event vs. Venue"
- **Use**: If student asks "Where is Robot Race?", volunteer can quickly search
- **Response**: "It's in EEE Block, Room 204, Floor 2"

**Database Tables Used**:
- `kit_distribution` - Tracking distributed items
- `event_venues` - Venue information

**Files**:
- Component: `Frontend/src/Pages/Admin/Volunteer/VolunteerDashboard.jsx`
- Route: `/volunteer`
- Required Role: `volunteer` or `super_admin`

---

## 4. Database Schema {#database-schema}

### **Required Tables**

Run the SQL script to create all necessary tables:
```bash
database/admin_roles_extended.sql
```

**Key Tables**:

1. **`attendance`**
   - Tracks event check-ins
   - Links: user_id, event_id, marked_by
   - Mark types: 'qr_scan', 'manual'

2. **`event_coordinators`**
   - Assigns coordinators to events
   - Links: user_id, event_id

3. **`event_winners`**
   - Stores event results
   - Position: 1 (Winner), 2 (Runner), 3 (Third)

4. **`kit_distribution`**
   - Tracks kit deliveries
   - Kit types: welcome_kit, lunch, snacks, merchandise

5. **`event_venues`**
   - Venue information
   - Fields: building, room_number, floor, capacity, notes

6. **`transactions`**
   - Payment audit trail
   - Methods: cash, online
   - Types: payment, refund, adjustment

### **Updated Columns**

**`registrations` table**:
- `payment_mode` (cash/online)
- `amount_paid`
- `approved_by` (admin user ID)
- `approved_at` (timestamp)

**`profiles` table**:
- `kit_delivered` (boolean)

---

## 5. Setup Instructions {#setup-instructions}

### **Step 1: Database Setup**

Run in Supabase SQL Editor:

```sql
-- 1. First run the base admin tables
\i database/setup_admin_modules.sql

-- 2. Then run the extended role features
\i database/admin_roles_extended.sql
```

Or copy and paste the contents of these files directly.

### **Step 2: Assign Roles to Users**

Update user roles in `profiles` table:

```sql
-- Make user a Registration Admin
UPDATE profiles 
SET role = 'registration_admin' 
WHERE email = 'admin@example.com';

-- Make user an Event Coordinator and assign to event
UPDATE profiles 
SET role = 'event_coordinator' 
WHERE email = 'coordinator@example.com';

INSERT INTO event_coordinators (user_id, event_id, assigned_by)
VALUES (
  (SELECT id FROM profiles WHERE email = 'coordinator@example.com'),
  'paper_presentation',
  (SELECT id FROM profiles WHERE role = 'super_admin' LIMIT 1)
);

-- Make user a Volunteer
UPDATE profiles 
SET role = 'volunteer' 
WHERE email = 'volunteer@example.com';
```

### **Step 3: Insert Venue Data (Optional)**

```sql
INSERT INTO event_venues (event_id, building, room_number, floor, capacity, notes)
VALUES 
  ('paper_presentation', 'CSE Block', '201', 2, 100, 'Seminar Hall with projector'),
  ('project_expo', 'Main Block', 'Auditorium', 1, 300, 'Main auditorium'),
  ('robot_race', 'EEE Block', '204', 2, 50, 'Lab with open space')
ON CONFLICT (event_id) DO NOTHING;
```

### **Step 4: Frontend Dependencies**

Install required packages:

```bash
cd Frontend
npm install html5-qrcode qrcode.react
```

### **Step 5: Test the Dashboards**

1. **Registration Admin**: Login and navigate to `/admin/desk`
2. **Event Coordinator**: Login and navigate to `/coordinator`
3. **Volunteer**: Login and navigate to `/volunteer`

---

## 6. Access Control Matrix {#access-control-matrix}

| Feature | Registration Admin | Event Coordinator | Volunteer |
|---------|-------------------|-------------------|-----------|
| **Cash Handling** | ✅ Full Access (Approve) | ❌ No Access | ❌ No Access |
| **Attendance** | ⚠️ View Only | ✅ Scan & Mark (Own Event) | ⚠️ Scan (Global Check) |
| **Modify User Details** | ✅ Edit Name/Details | ❌ Read Only | ❌ Read Only |
| **View Revenue** | ⚠️ Own Collection Only | ❌ No Access | ❌ No Access |
| **Winner Selection** | ❌ No Access | ✅ Select Winners | ❌ No Access |
| **Kit Distribution** | ❌ No Access | ⚠️ Can View | ✅ Full Access |
| **Venue Information** | ⚠️ Can View | ⚠️ Can View | ✅ Full Access |
| **Force Add Users** | ✅ Yes | ❌ No | ❌ No |
| **Event Swap** | ✅ Yes | ❌ No | ❌ No |
| **Transaction Logs** | ✅ Can Create | ❌ Read Only | ❌ No Access |

**Legend**:
- ✅ Full Access
- ⚠️ Limited/Read-Only Access
- ❌ No Access

---

## 🎯 Key Implementation Highlights

### **1. Mobile-First for Coordinators & Volunteers**
- Responsive design with large touch targets
- Camera scanning optimized for mobile
- PWA-ready with offline capabilities

### **2. Desktop-Optimized for Registration Admin**
- Multi-tab workflow for efficiency
- Bulk operations (select multiple, approve all)
- Advanced search and troubleshooting tools

### **3. Real-Time Updates**
- Live queue updates via Supabase Realtime
- Stats refresh after each action
- Instant feedback for QR scans

### **4. Audit Trail**
- All actions logged in `admin_logs`
- Transaction history in `transactions`
- Manual overrides clearly marked

### **5. Error Handling**
- Duplicate prevention (attendance, kit distribution)
- Payment status validation
- Clear error messages with sound feedback

---

## 📱 QR Code Scanner Implementation

Uses `html5-qrcode` library for cross-browser compatibility:

```javascript
const scanner = new Html5QrcodeScanner(
  "qr-reader",
  { fps: 10, qrbox: { width: 250, height: 250 } },
  false
);

scanner.render(onScanSuccess, onScanError);
```

**QR Code Format**: User ID (UUID) from profiles table

---

## 🔒 Security Considerations

1. **Row Level Security (RLS)**: All tables have policies restricting access by role
2. **Role Validation**: ProtectedRoute component checks user role before rendering
3. **API Permissions**: Supabase policies enforce backend restrictions
4. **Transaction Integrity**: All cash approvals create audit trail
5. **Read-Only Volunteer**: Cannot modify any data, only read and scan

---

## 🚀 Future Enhancements

- **Push Notifications**: Alert coordinators when students arrive
- **Offline Mode**: Cache data for areas with poor connectivity
- **SMS Integration**: Auto-send QR codes for on-spot registrations
- **Razorpay Integration**: Real-time payment verification API
- **Biometric Verification**: Optional fingerprint scan for high-value kits
- **Analytics Dashboard**: Real-time event statistics for coordinators

---

## 📞 Support

For issues or questions:
- Check database logs: `SELECT * FROM admin_logs ORDER BY created_at DESC LIMIT 50;`
- Verify user role: `SELECT email, role FROM profiles WHERE id = auth.uid();`
- Test RLS policies: Run queries as different user roles

---

**Created**: December 2025  
**Version**: 1.0  
**System**: DaKshaa Event Management Platform
