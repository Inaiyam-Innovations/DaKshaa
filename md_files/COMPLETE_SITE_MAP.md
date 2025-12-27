# 🗺️ DaKshaa T26 - Complete Site Map

## 📊 Site Structure Overview

```
DaKshaa T26 Website
│
├── 🏠 Public Pages (No Auth Required)
│   ├── Home (/)
│   ├── Events (/events)
│   ├── Event Details (/event/:eventId)
│   ├── Sponsors (/sponsors)
│   ├── Teams (/teams)
│   ├── Schedule (/schedule)
│   ├── Startups (/startups)
│   ├── Accommodation (/accommodation)
│   ├── Contact (/contact)
│   ├── Feedback (/feedback)
│   ├── Leaderboard (/leaderboard)
│   ├── Live Status (/live-status)
│   └── Live Stats (/live-stats)
│
├── 🔐 Authentication
│   ├── Login (/login)
│   └── Signup (/signup)
│
├── 👤 User Dashboard (/dashboard/*)
│   ├── Overview (/dashboard)
│   ├── My Registrations (/dashboard/registrations)
│   ├── My Teams (/dashboard/teams)
│   ├── Payments (/dashboard/payments)
│   ├── Attendance QR (/dashboard/attendance-qr)
│   ├── Profile Settings (/dashboard/profile)
│   └── Event Schedule (/dashboard/schedule)
│
├── 🎯 Registration
│   ├── Register for Events (/register-events)
│   └── QR Scanner (/scan)
│
└── 👨‍💼 Admin Panel (/admin/*)
    │
    ├── 🔱 Super Admin
    │   ├── Overview (/admin)
    │   ├── Role Management (/admin/roles)
    │   ├── User Manager (/admin/users)
    │   ├── Event Configuration (/admin/event-configuration)
    │   ├── Event Controller (/admin/event-controller)
    │   ├── Combo Management (/admin/combos)
    │   ├── Registration Management (/admin/registrations)
    │   ├── Finance Manager (/admin/finance)
    │   ├── Finance Module (/admin/finance-module)
    │   ├── Participant CRM (/admin/crm)
    │   ├── Waitlist Management (/admin/waitlist)
    │   └── Accommodation Manager (/admin/accommodation)
    │
    ├── 📝 Registration Admin
    │   ├── Registration Desk (/admin/desk)
    │   └── Dashboard (/admin/desk)
    │
    ├── 🎪 Event Coordinator
    │   ├── Dashboard (/coordinator)
    │   └── Attendance Scanner (/coordinator/scanner)
    │
    └── 🔍 Volunteer
        ├── Dashboard (/volunteer)
        └── Attendance Scanner (/volunteer/scanner)
```

---

## 🗃️ Database Schema Map

### Core Tables

1. **profiles** - User information
2. **events_config** - Event metadata
3. **registrations** - Event registrations
4. **event_registrations_config** - Registration tracking
5. **attendance_logs** - Attendance records
6. **teams** - Team information
7. **team_members** - Team membership

### Supporting Tables

8. **combos** - Event package deals
9. **combo_items** - Items in combo packages
10. **winners** - Event winners
11. **accommodation_requests** - Accommodation bookings
12. **lunch_bookings** - Lunch reservations
13. **feedback** - User feedback
14. **contact_messages** - Contact form submissions
15. **referrals** - Referral tracking
16. **notifications** - User notifications
17. **qr_codes** - User QR codes
18. **payment_transactions** - Payment records
19. **admin_logs** - Admin activity logs
20. **newsletter_subscriptions** - Newsletter emails
21. **event_schedule** - Event timeline

---

## 🔌 API Endpoints Map

### Frontend Services

```javascript
// adminService.js
- getAllRegistrations(filters)
- forceAddUser(userId, eventId)
- moveUserToEvent(registrationId, newEventId)
- updatePaymentStatus(registrationId, status)
- logAdminAction(action, userId, details)

// attendanceService.js
- getActiveEvents()
- verifyAndMarkAttendance(userId, eventId, scannedBy)
- getAttendanceStats(eventId)

// eventConfigService.js
- getEventsWithStats()
- getEventById(eventId)
- checkEventAvailability(eventId)
- createEvent(eventData)
- updateEvent(eventId, data)

// comboService.js
- getCombosWithDetails()
- getActiveCombosForStudents(userId)
- createCombo(comboData)
- updateCombo(comboId, data)

// feedbackService.js (NEW)
- submitFeedback(feedbackData)
- getAllFeedback()
- getFeedbackStats()

// contactService.js (NEW)
- submitContactMessage(contactData)
- getAllContactMessages(status)
- updateContactMessageStatus(messageId, status)

// accommodationService.js (NEW)
- createAccommodationRequest(requestData)
- getUserAccommodationRequests()
- getAllAccommodationRequests()
- updateAccommodationPayment(requestId, status, paymentId)
- createLunchBooking(bookingData)
- getUserLunchBookings()
- getAccommodationStats()

// leaderboardService.js (NEW)
- getReferralLeaderboard(limit)
- getLeaderboardStats()
- getEventWinners(eventId)
- addEventWinner(winnerData)
- updateWinner(winnerId, data)
- deleteWinner(winnerId)

// dashboardService.js (NEW)
- getDashboardStats()
- getUserRegistrations()
- getUserAttendance()
- getUserTeams()
- getUserNotifications(unreadOnly)
- markNotificationAsRead(notificationId)
- markAllNotificationsAsRead()
- getUserQRCode()
- getUserTransactions()

// teamService.js (NEW)
- createTeam(teamData)
- getTeamDetails(teamId)
- addTeamMember(teamId, userId)
- removeTeamMember(teamId, userId)
- updateTeam(teamId, data)
- deleteTeam(teamId)
- searchUsersForTeam(searchQuery)
```

### Backend Routes

```javascript
// Authentication (Supabase)
POST   /auth/signup
POST   /auth/login
POST   /auth/logout
GET    /auth/user

// Events
GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id

// Registrations
GET    /api/registrations
POST   /api/registrations
PUT    /api/registrations/:id
DELETE /api/registrations/:id

// Attendance
POST   /api/attendance/mark
GET    /api/attendance/stats/:eventId
GET    /api/attendance/logs

// Payments
POST   /api/payments/create
POST   /api/payments/verify
GET    /api/payments/user

// Admin
GET    /api/admin/users
PUT    /api/admin/users/:id/role
GET    /api/admin/stats
GET    /api/admin/logs

// Feedback (Legacy - to be migrated)
POST   /add-feedback
GET    /feedbacks

// Contact (Legacy - to be migrated)
POST   /add-contact
GET    /contacts

// Accommodation (Legacy - to be migrated)
POST   /add-accommodation
GET    /accommodations
```

### RPC Functions (Supabase)

```sql
-- Authentication & Authorization
get_user_role()
is_event_coordinator(event_id)

-- Events
get_events_with_stats()
check_event_availability(event_id)
create_event_config(...)
update_event_config(...)

-- Attendance
verify_and_mark_attendance(user_id, event_id, scanned_by, location)
get_active_events_for_scanner()
get_attendance_stats(event_id)

-- Combos
get_combos_with_details()
get_active_combos_for_students(user_id)
create_combo(...)
update_combo(...)

-- Live Stats
get_live_stats()

-- Feedback & Contact
submit_feedback(username, email, rating, message)
submit_contact_message(name, email, phone, subject, message)

-- Leaderboard
get_referral_leaderboard(limit)

-- Dashboard
get_user_dashboard_stats()
generate_user_qr_code()

-- Accommodation
create_accommodation_request(...)

-- Teams
check_team_membership(team_id)
```

---

## 🔒 Role-Based Access Control

### Public Access
- Home, Events, Schedule, Teams, Sponsors
- Leaderboard, Live Status, Feedback
- Login, Signup

### Student (Authenticated)
- User Dashboard
- Event Registration
- Team Management
- View Own Data
- Submit Feedback

### Volunteer
- Attendance Scanner
- View Event Lists
- Basic Dashboard

### Event Coordinator
- Event-Specific Dashboard
- Attendance Management
- Event Participant List
- Winners Management

### Registration Admin
- Registration Desk
- Payment Verification
- User Registration Management
- Accommodation Management

### Super Admin
- Full Access to All Features
- User Role Management
- Event Configuration
- Finance Management
- System Logs
- CRM
- Analytics

---

## 📦 Feature Modules

### ✅ Completed & Database-Connected

1. **Authentication System**
   - Supabase Auth
   - Role-based access
   - Profile management

2. **Event Management**
   - Event configuration
   - Dynamic event creation
   - Capacity management
   - Category & pricing

3. **Registration System**
   - Individual registration
   - Team registration
   - Combo packages
   - Waitlist management

4. **Attendance System**
   - QR code generation
   - Scanner interface
   - Real-time verification
   - Attendance logs

5. **Payment Integration**
   - Transaction tracking
   - Payment status
   - Multiple payment methods

6. **Admin Panel**
   - Role management
   - User management
   - Event control
   - Finance dashboard
   - CRM
   - Analytics

7. **Leaderboard**
   - Referral tracking
   - Winner display
   - Stats dashboard

8. **Accommodation & Lunch**
   - Booking system
   - Payment integration
   - Admin management

9. **Feedback & Contact**
   - Feedback submission
   - Contact form
   - Admin view

10. **Live Stats**
    - Real-time registration count
    - Attendance tracking
    - Live dashboard

11. **Team Management**
    - Team creation
    - Member management
    - Team-based events

12. **Notifications**
    - User notifications
    - System alerts
    - Read/unread tracking

---

## 🌐 External Integrations

### Current
- **Supabase** - Database & Auth
- **Vercel/Netlify** - Frontend Hosting
- **Railway/Render** - Backend Hosting

### Planned/Optional
- **Razorpay** - Payment Gateway
- **SendGrid** - Email Service
- **AWS S3** - File Storage
- **Cloudinary** - Image Optimization
- **Google Analytics** - Analytics
- **Sentry** - Error Tracking

---

## 📊 Data Flow

```
User Action
    ↓
Frontend Component
    ↓
Service Function
    ↓
Supabase Client
    ↓
API/RPC Call
    ↓
Database (PostgreSQL)
    ↓
RLS Policy Check
    ↓
Query Execution
    ↓
Response
    ↓
Frontend Update
```

---

## 🎯 Production Readiness Status

### ✅ Ready for Production

- Core authentication
- Event management
- Registration system
- Attendance tracking
- Admin panel
- Payment tracking
- Database schema
- RLS policies
- API services
- Frontend components

### ⚠️ Requires Configuration

- Payment gateway keys
- Email SMTP
- Domain setup
- SSL certificates
- Environment variables
- Super admin creation

### 📝 Optional Enhancements

- Email notifications
- SMS alerts
- Certificate generation
- Advanced analytics
- Automated backups
- Load balancing

---

**Complete Site Map - Ready for Production** ✅
