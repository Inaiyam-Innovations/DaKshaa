# 🎯 DaKshaa T26 - Event Management System

> A complete, production-ready event management platform for technical symposiums with real-time attendance tracking, team management, and comprehensive admin controls.

![Status](https://img.shields.io/badge/status-production%20ready-success)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Database](https://img.shields.io/badge/database-connected-green)

---

## ✨ Features

### 🎪 Event Management
- ✅ Dynamic event configuration
- ✅ Multiple event categories (Technical, Cultural, Workshop, etc.)
- ✅ Solo & team-based events
- ✅ Real-time capacity tracking
- ✅ Combo packages with custom pricing
- ✅ Waitlist management

### 👥 User System
- ✅ Secure authentication (Supabase Auth)
- ✅ Role-based access control (Student, Volunteer, Coordinator, Admin, Super Admin)
- ✅ Profile management
- ✅ Referral system with leaderboard
- ✅ Personal dashboard

### 📝 Registration
- ✅ Individual & team registration
- ✅ Combo package deals
- ✅ Payment integration ready
- ✅ QR code generation
- ✅ Registration confirmation

### 📲 Attendance System
- ✅ QR code scanning
- ✅ Real-time attendance verification
- ✅ Duplicate entry prevention
- ✅ Attendance logs & analytics
- ✅ Volunteer/coordinator scanner

### 🏆 Leaderboard & Winners
- ✅ Referral leaderboard
- ✅ Event winners showcase
- ✅ Prize distribution tracking
- ✅ Live rankings

### 🏨 Accommodation & Food
- ✅ Accommodation booking system
- ✅ Lunch reservations
- ✅ Pricing calculator
- ✅ Payment tracking

### 💰 Finance & Payments
- ✅ Centralized payment tracking
- ✅ Multiple payment methods
- ✅ Transaction history
- ✅ Revenue analytics
- ✅ Payment gateway integration ready

### 👨‍💼 Admin Panel
- ✅ Super admin dashboard
- ✅ User management
- ✅ Event configuration
- ✅ Registration management
- ✅ Role assignment
- ✅ Finance module
- ✅ CRM system
- ✅ Activity logs
- ✅ Analytics & reports

### 📊 Live Stats
- ✅ Real-time registration counter
- ✅ Attendance tracking
- ✅ Live dashboard
- ✅ Event statistics

### 🔔 Notifications
- ✅ User notifications system
- ✅ Read/unread tracking
- ✅ System alerts

### 🎨 UI/UX
- ✅ Modern, responsive design
- ✅ Cyber/tech theme
- ✅ Smooth animations (Framer Motion)
- ✅ Mobile-friendly
- ✅ Dark mode optimized

---

## 🗄️ Database Architecture

### Complete Schema Includes:
- **21 Tables** - All features covered
- **30+ RPC Functions** - Secure database operations
- **Row Level Security** - Every table protected
- **Triggers** - Auto-update mechanisms
- **Indexes** - Optimized performance

**Key Tables:**
```
profiles, events_config, registrations, attendance_logs,
teams, team_members, combos, winners, accommodation_requests,
lunch_bookings, feedback, contact_messages, referrals,
notifications, qr_codes, payment_transactions, admin_logs,
newsletter_subscriptions, event_schedule
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd "DaKshaaWeb-main v2"
```

### 2. Database Setup
```bash
# Open Supabase SQL Editor
# Run: database/complete_production_schema.sql
```

### 3. Environment Setup
```bash
# Frontend
cd Frontend
cp .env.example .env
# Update .env with your Supabase credentials
```

### 4. Install & Run
```bash
# Frontend
npm install
npm run dev

# Backend (if using separate backend)
cd ../Backend
npm install
npm start
```

### 5. Access
```
Frontend: http://localhost:5173
Backend: http://localhost:3000
```

---

## 📦 Project Structure

```
DaKshaaWeb-main v2/
├── Frontend/
│   ├── src/
│   │   ├── Pages/           # All page components
│   │   ├── services/        # API integration layer
│   │   ├── Components/      # Reusable components
│   │   ├── assets/          # Images, fonts
│   │   └── supabase.js      # Supabase client
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── server.js            # Express server
│   ├── db.js                # Database config
│   └── package.json
│
├── database/
│   ├── complete_production_schema.sql  # ⭐ Main schema
│   ├── schema.sql
│   ├── event_configuration.sql
│   ├── attendance_system.sql
│   ├── combo_packages.sql
│   ├── admin_roles_extended.sql
│   └── live_stats.sql
│
└── Documentation/
    ├── PRODUCTION_DEPLOYMENT_GUIDE.md
    ├── COMPLETE_SITE_MAP.md
    ├── ADMIN_ROLES_GUIDE.md
    └── Various feature guides
```

---

## 🎯 Core Services

All features are backed by service functions:

```javascript
// Example: Dashboard Service
import { getDashboardStats } from './services/dashboardService';

const stats = await getDashboardStats();
// Returns: registered_events, attended_events, pending_payments, etc.
```

**Available Services:**
- `adminService.js` - Admin operations
- `attendanceService.js` - Attendance tracking
- `eventConfigService.js` - Event management
- `comboService.js` - Package deals
- `feedbackService.js` - Feedback system
- `contactService.js` - Contact forms
- `accommodationService.js` - Accommodation & lunch
- `leaderboardService.js` - Rankings & winners
- `dashboardService.js` - User dashboard
- `teamService.js` - Team management

---

## 🔐 Authentication & Authorization

### Roles
1. **Student** - Basic user, can register for events
2. **Volunteer** - Can scan attendance
3. **Event Coordinator** - Manages specific events
4. **Registration Admin** - Handles registrations
5. **Super Admin** - Full system access

### Protected Routes
```javascript
<ProtectedRoute allowedRoles={['super_admin']}>
  <AdminPanel />
</ProtectedRoute>
```

---

## 🌐 API Integration

### Supabase RPC Functions
```javascript
// Example: Mark Attendance
const { data, error } = await supabase.rpc('verify_and_mark_attendance', {
  p_user_id: userId,
  p_event_id: eventId,
  p_scanned_by: volunteerId,
  p_scan_location: 'Main Gate'
});
```

### REST API (Backend)
```javascript
// Example: Submit Feedback
POST /add-feedback
{
  "username": "John Doe",
  "email_id": "john@example.com",
  "rating": 5,
  "message": "Great event!"
}
```

---

## 🎨 Tech Stack

### Frontend
- **React** 18.3.1 - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Supabase Client** - Database & auth
- **React Router** - Routing
- **Lucide React** - Icons
- **QRCode.react** - QR generation

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database (via Supabase)
- **Supabase** - BaaS platform

### Database
- **PostgreSQL** 15+
- **Row Level Security** enabled
- **Realtime** subscriptions
- **Storage** for files

---

## 📊 Database Functions

### Key RPC Functions

```sql
-- Attendance
verify_and_mark_attendance(user_id, event_id, scanned_by, location)
get_attendance_stats(event_id)

-- Events
get_events_with_stats()
check_event_availability(event_id)

-- Dashboard
get_user_dashboard_stats()
generate_user_qr_code()

-- Leaderboard
get_referral_leaderboard(limit)

-- Feedback
submit_feedback(username, email, rating, message)

-- And 20+ more...
```

---

## 🚀 Deployment

### Option 1: Automated Script
```powershell
.\deploy.ps1
```

### Option 2: Manual Deployment

**Frontend (Vercel)**
```bash
cd Frontend
npm run build
vercel --prod
```

**Backend (Railway)**
```bash
cd Backend
git push railway main
```

**Database (Supabase)**
```
Run all SQL files in database/ folder in Supabase SQL Editor
```

📖 **Full Guide:** [PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md)

---

## 🧪 Testing

### Local Testing
```bash
# Frontend
npm run dev

# Backend
npm start

# Database
# Connect to Supabase Studio for testing
```

### Production Testing
- [ ] User registration flow
- [ ] Event registration
- [ ] Team creation
- [ ] Attendance scanning
- [ ] Payment processing
- [ ] Admin operations
- [ ] Mobile responsiveness

---

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_API_URL=your_backend_url
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

### Backend (.env)
```env
DATABASE_HOST=your_host
DATABASE_PASSWORD=your_password
SUPABASE_SERVICE_KEY=your_service_key
PORT=3000
```

---

## 📚 Documentation

- [Production Deployment Guide](PRODUCTION_DEPLOYMENT_GUIDE.md)
- [Complete Site Map](COMPLETE_SITE_MAP.md)
- [Admin Roles Guide](ADMIN_ROLES_GUIDE.md)
- [Attendance System Guide](ATTENDANCE_SYSTEM_GUIDE.md)
- [Combo System Guide](COMBO_SYSTEM_GUIDE.md)
- [Live Stats Guide](LIVE_STATS_IMPLEMENTATION.md)

---

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
```
Check Supabase credentials in .env
Verify Supabase project is active
```

**RLS Policy Blocking Query**
```sql
-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'your_table';
```

**CORS Error**
```javascript
// Update backend CORS settings
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(',')
}));
```

---

## 📞 Support

For issues or questions:
1. Check documentation
2. Review Supabase logs
3. Check browser console
4. Verify environment variables

---

## 🔄 Updates & Maintenance

### Regular Tasks
- **Daily:** Monitor error logs
- **Weekly:** Database backup verification
- **Monthly:** Security audit, dependency updates

### Backup
```bash
# Supabase auto-backup enabled
# Manual backup: Export from Supabase Studio
```

---

## 📈 Performance

### Optimizations
- Database indexes on all foreign keys
- RLS policies optimized
- Frontend code splitting
- Image lazy loading
- API response caching

### Scalability
- Horizontal scaling ready
- Database connection pooling
- CDN for static assets

---

## 🔒 Security

- ✅ Row Level Security on all tables
- ✅ Secure environment variables
- ✅ HTTPS enforced
- ✅ Input validation
- ✅ SQL injection protection
- ✅ XSS prevention
- ✅ CORS configured
- ✅ Rate limiting ready

---

## 🎯 Production Checklist

Before going live:
- [ ] All database migrations run
- [ ] Environment variables configured
- [ ] Super admin created
- [ ] Payment gateway tested
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Backup system verified
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Load testing done
- [ ] Mobile testing complete

---

## 📜 License

Copyright © 2025 DaKshaa T26 - K.S.Rangasamy College of Technology

---

## 🌟 Acknowledgments

Built with modern web technologies:
- React & Vite
- Supabase
- Tailwind CSS
- Framer Motion

---

## 📊 Status

**Current Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Database:** ✅ Fully Connected  
**Features:** ✅ Complete  
**Documentation:** ✅ Comprehensive  

---

**Ready to deploy and manage your technical symposium! 🚀**

For detailed deployment instructions, see [PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md)
