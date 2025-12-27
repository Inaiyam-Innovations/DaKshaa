# 🚀 DaKshaa T26 - Production Deployment Guide

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Database Setup](#database-setup)
3. [Environment Configuration](#environment-configuration)
4. [Frontend Deployment](#frontend-deployment)
5. [Backend Deployment](#backend-deployment)
6. [Post-Deployment](#post-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## ✅ Pre-Deployment Checklist

### Required Accounts & Services
- [ ] **Supabase Account** - Database & Authentication
- [ ] **Vercel/Netlify Account** - Frontend Hosting
- [ ] **Railway/Render Account** - Backend Hosting (if needed)
- [ ] **Domain Name** - Custom domain (optional)
- [ ] **Payment Gateway** - Razorpay account
- [ ] **Email Service** - SMTP credentials (for notifications)

### Code Preparation
- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Database schema finalized
- [ ] API endpoints tested
- [ ] Frontend build successful
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Cross-browser compatibility

---

## 🗄️ Database Setup

### Step 1: Supabase Project Setup

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com
   # Click "New Project"
   # Choose organization and region (ap-south-1 for India)
   # Set database password (SAVE THIS!)
   ```

2. **Run Database Migrations**
   
   Navigate to Supabase SQL Editor and run these files **in order**:
   
   ```sql
   -- 1. Base Schema
   database/schema.sql
   
   -- 2. Complete Production Schema
   database/complete_production_schema.sql
   
   -- 3. Event Configuration
   database/event_configuration.sql
   
   -- 4. Attendance System
   database/attendance_system.sql
   
   -- 5. Live Stats
   database/live_stats.sql
   
   -- 6. Combo Packages
   database/combo_packages.sql
   
   -- 7. Admin Roles
   database/admin_roles_extended.sql
   database/setup_admin_modules.sql
   
   -- 8. Master Admin Protection
   database/master_admin_protection.sql
   ```

3. **Enable Realtime**
   ```
   Go to Database > Replication
   Enable Realtime for:
   - registrations
   - attendance_logs
   - live_stats_registrations
   - live_stats_attendance
   - notifications
   ```

4. **Configure Storage Buckets** (for file uploads)
   ```
   Go to Storage
   Create buckets:
   - certificates
   - profile-pictures
   - event-images
   ```

### Step 2: Verify Database

Run verification script:
```sql
-- In Supabase SQL Editor
SELECT * FROM database/verify_setup.sql;
```

Expected output: All tables created, all RPC functions available

---

## ⚙️ Environment Configuration

### Frontend (.env)

1. Copy `.env.example` to `.env`:
   ```bash
   cd Frontend
   cp .env.example .env
   ```

2. Update with your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_API_URL=https://your-backend-url.com
   VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx
   ```

3. Get Supabase credentials:
   ```
   Supabase Dashboard > Settings > API
   - Project URL → VITE_SUPABASE_URL
   - anon public → VITE_SUPABASE_ANON_KEY
   ```

### Backend (.env)

1. Copy `.env.example` to `.env`:
   ```bash
   cd Backend
   cp .env.example .env
   ```

2. Update with your credentials:
   ```env
   DATABASE_HOST=db.your-project.supabase.co
   DATABASE_PORT=5432
   DATABASE_NAME=postgres
   DATABASE_USER=postgres
   DATABASE_PASSWORD=your-db-password
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your-service-role-key
   ```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Build & Deploy**
   ```bash
   cd Frontend
   npm install
   npm run build
   vercel --prod
   ```

3. **Configure Environment Variables**
   ```bash
   # In Vercel Dashboard
   Settings > Environment Variables
   Add all VITE_* variables from .env
   ```

4. **Set Build Settings**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Node Version: 18.x
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build & Deploy**
   ```bash
   cd Frontend
   npm install
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Configure**
   ```
   Site settings > Build & deploy
   Build command: npm run build
   Publish directory: dist
   Add environment variables
   ```

### Option 3: Manual Build

```bash
cd Frontend
npm install
npm run build

# Upload dist/ folder to your hosting provider
# Configure nginx/apache to serve static files
```

---

## 🔧 Backend Deployment

### Option 1: Railway (Recommended)

1. **Create Railway Project**
   ```
   Visit https://railway.app
   New Project > Deploy from GitHub
   Select your repository
   ```

2. **Configure**
   ```
   Add environment variables from .env
   Add PostgreSQL service (optional, using Supabase)
   Set start command: npm start
   ```

3. **Deploy**
   ```
   Railway auto-deploys on git push
   ```

### Option 2: Render

1. **Create Web Service**
   ```
   Visit https://render.com
   New > Web Service
   Connect GitHub repository
   ```

2. **Configure**
   ```
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Add environment variables
   ```

### Option 3: VPS (DigitalOcean/AWS)

```bash
# SSH into server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo-url
cd Backend

# Install dependencies
npm install

# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name dakshaa-backend
pm2 save
pm2 startup

# Setup nginx reverse proxy
sudo nano /etc/nginx/sites-available/dakshaa
```

nginx configuration:
```nginx
server {
    listen 80;
    server_name api.dakshaa.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🎯 Post-Deployment

### 1. DNS Configuration

```
A Record:    dakshaa.com → Your_Server_IP
CNAME:       www → dakshaa.com
CNAME:       api → your-backend.railway.app
```

### 2. SSL Certificate

**For Vercel/Netlify**: Automatic

**For VPS**:
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d dakshaa.com -d www.dakshaa.com
```

### 3. Create Super Admin

Run in Supabase SQL Editor:
```sql
-- Replace with your email
UPDATE profiles 
SET role = 'super_admin'
WHERE email = 'your-admin@email.com';
```

### 4. Seed Event Data

```sql
-- Insert events
INSERT INTO events_config (event_key, name, category, price, type, capacity, is_open)
VALUES 
  ('hackathon', 'Hackathon', 'Technical', 500, 'TEAM', 100, true),
  ('codeathon', 'Codeathon', 'Technical', 300, 'TEAM', 80, true),
  ('workshop1', 'AI Workshop', 'Workshop', 200, 'SOLO', 50, true);
```

### 5. Configure Payment Gateway

1. **Razorpay Setup**
   ```
   Login to Razorpay Dashboard
   Settings > API Keys
   Generate Live Keys
   Add to environment variables
   ```

2. **Test Payment Flow**
   - Make test registration
   - Complete payment
   - Verify webhook
   - Check database update

### 6. Enable Notifications

```sql
-- Set up notification triggers
-- Already in complete_production_schema.sql
```

---

## 📊 Monitoring & Maintenance

### 1. Error Tracking

**Frontend (Sentry)**:
```bash
npm install @sentry/react
```

```javascript
// Add to main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

**Backend**:
```bash
npm install @sentry/node
```

### 2. Database Backups

**Automated Supabase Backups**: Already enabled

**Manual Backup**:
```sql
-- In Supabase SQL Editor
SELECT * FROM your_table;
-- Export as CSV
```

### 3. Performance Monitoring

```sql
-- Check slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Monitor table sizes
SELECT schemaname, tablename,
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 4. Health Check Endpoints

Add to backend:
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/status', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ database: 'connected', status: 'healthy' });
  } catch (error) {
    res.status(500).json({ database: 'disconnected', status: 'unhealthy' });
  }
});
```

### 5. Regular Maintenance Tasks

**Daily**:
- [ ] Check error logs
- [ ] Monitor registration count
- [ ] Verify payment transactions

**Weekly**:
- [ ] Database backup verification
- [ ] Performance metrics review
- [ ] User feedback analysis

**Monthly**:
- [ ] Security audit
- [ ] Dependency updates
- [ ] Database optimization

---

## 🔐 Security Checklist

- [ ] All environment variables are secret
- [ ] RLS policies enabled on all tables
- [ ] CORS configured correctly
- [ ] Rate limiting implemented
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection
- [ ] HTTPS enabled
- [ ] Secure cookie settings
- [ ] Admin routes protected
- [ ] File upload validation

---

## 📞 Support & Troubleshooting

### Common Issues

**1. Database Connection Failed**
```
Check Supabase URL and credentials
Verify network/firewall settings
Check database password
```

**2. Build Fails**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

**3. RLS Policy Blocking Queries**
```sql
-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'your_table';

-- Temporarily disable for testing (NOT for production!)
ALTER TABLE your_table DISABLE ROW LEVEL SECURITY;
```

**4. CORS Errors**
```javascript
// Update backend CORS config
app.use(cors({
  origin: ['https://dakshaa.com', 'https://www.dakshaa.com'],
  credentials: true
}));
```

### Emergency Contacts
- Database: Supabase Support
- Hosting: Vercel/Netlify Support
- Payment: Razorpay Support

---

## 📝 Deployment Checklist

Final checks before going live:

- [ ] Database schema deployed
- [ ] All tables have data
- [ ] Admin account created
- [ ] Payment gateway tested
- [ ] Email notifications working
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] All environment variables set
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Backup system verified
- [ ] Load testing completed
- [ ] Mobile testing done
- [ ] Cross-browser testing done
- [ ] Documentation updated
- [ ] Team trained
- [ ] Support system ready

---

## 🎉 Launch!

Once all checks pass:

1. **Soft Launch** - Share with limited users (10-20)
2. **Monitor** - Watch for errors (24 hours)
3. **Fix Issues** - Address any problems
4. **Full Launch** - Public announcement
5. **Scale** - Monitor and optimize as needed

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

**Last Updated**: December 2025
**Version**: 1.0
**Status**: Production Ready ✅
