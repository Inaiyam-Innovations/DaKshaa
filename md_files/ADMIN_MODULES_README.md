# Advanced Admin Modules - Documentation

## Overview
This document describes the three advanced admin modules added to the Super Admin Dashboard: Registration Management, Finance Module, and Participant CRM.

---

## 1. Registration Management Module

**Route:** `/admin/registrations`

### Features

#### Table View with Filters
- **Display All Registrations:** Shows complete registration data with user details, event info, and payment status
- **Search:** Find registrations by user name, email, or event ID
- **Filters:**
  - Event filter (dropdown)
  - Status filter (completed/pending/failed)
  - Date range filter

#### Statistics Dashboard
- Total registrations count
- Completed registrations
- Pending registrations
- Failed registrations

#### Admin Actions

##### 1. Force Add User
```javascript
forceAddUser(userId, eventId)
```
- **Purpose:** Add a user to an event bypassing capacity restrictions
- **Use Case:** VIP registrations, special cases, manual overrides
- **Process:**
  1. Search for user by name/email/phone
  2. Select event from dropdown
  3. Confirm action
  4. Registration created with `is_force_added = true` flag
- **Database Impact:** Bypasses capacity check trigger
- **Logged:** Yes, in admin_logs table

##### 2. Move User to Event
```javascript
moveUserToEvent(registrationId, newEventId)
```
- **Purpose:** Transfer user's registration from one event to another
- **Use Case:** Event changes, conflicts, rescheduling
- **Process:**
  1. Select registration from table
  2. Choose new event from dropdown
  3. Confirm transfer
  4. Updates `event_id` in registrations table
- **Logged:** Yes, with old and new event IDs

##### 3. Upgrade to Combo
```javascript
upgradeToCombo(registrationId, comboId)
```
- **Purpose:** Link an existing single event registration to a combo package
- **Use Case:** User wants to upgrade from individual to combo
- **Process:**
  1. Select registration from table
  2. Choose combo package
  3. Confirm upgrade
  4. Updates `combo_id` in registrations table
- **Logged:** Yes, with combo details

### Waitlist Management

**Route:** `/admin/waitlist`

#### Features
- View all waitlisted users (FIFO order)
- Filter by event
- Show position in queue
- Display event capacity

#### Promote from Waitlist
```javascript
promoteWaitlistUser(waitlistId)
```
- **Process:**
  1. Select user from waitlist
  2. Click "Promote" button
  3. User moved from `waitlist` table to `registrations` table
  4. Waitlist status updated to 'promoted'
- **Logged:** Yes, with waitlist ID and event details

---

## 2. Finance Module

**Route:** `/admin/finance-module`

### Tab 1: Cashier Logs

#### Purpose
Track cash payments collected by different admins/volunteers

#### Features
- **Group by Admin:** Shows total cash held by each cashier
- **Statistics per Admin:**
  - Total cash collected
  - Number of transactions
  - Average transaction amount
- **Date Range Filter:** View logs for specific time periods

#### Database Query
```sql
SELECT * FROM registrations 
WHERE payment_mode = 'cash' 
  AND payment_status = 'completed'
GROUP BY marked_by
```

#### Use Cases
- End-of-day cash reconciliation
- Audit trail for cash payments
- Identify cashiers who need to deposit money

### Tab 2: Refunds

#### Purpose
Initiate refunds for online payments through Razorpay

#### Features
```javascript
initiateRefund(paymentId, amount, reason)
```

#### Process
1. Enter Razorpay Payment ID
2. Specify refund amount
3. Provide reason for refund
4. Submit request
5. Creates entry in `transactions` table with type='refund'

#### Important Notes
- Currently logs the refund request
- **Production:** Should call backend API → Razorpay Refunds API
- Refunds take 5-7 business days
- All refunds are logged in admin activity

#### Integration Required
```javascript
// Backend API endpoint needed
POST /api/refunds
{
  "paymentId": "pay_xxxxx",
  "amount": 500,
  "reason": "Event cancelled"
}
```

### Tab 3: Reconciliation

#### Purpose
Find orphan payments and registrations (data integrity check)

#### Features

##### Orphan Transactions
- **Definition:** Payments received but no matching registration
- **Query Logic:**
  ```javascript
  transactions.filter(tx => 
    !registrations.some(reg => reg.payment_id === tx.provider_id)
  )
  ```
- **Display:** Table showing payment ID, amount, date, status

##### Orphan Registrations
- **Definition:** Registrations marked complete but no payment record
- **Query Logic:**
  ```javascript
  registrations.filter(reg => 
    reg.payment_mode === 'online' && 
    !transactions.some(tx => tx.provider_id === reg.payment_id)
  )
  ```
- **Display:** Table showing registration ID, payment ID, date, status

#### Use Cases
- Daily/weekly reconciliation
- Identify payment gateway issues
- Find stuck/pending payments
- Audit financial records

---

## 3. Participant CRM

**Route:** `/admin/crm`

### Tab 1: Edit Profile

#### Purpose
Update participant information (fix typos, update details)

#### Features
```javascript
updateUserProfile(userId, updates)
```

#### Process
1. Search for participant by name/email/phone
2. Select from search results
3. Edit form fields:
   - Full Name
   - College Name
   - Department
   - Mobile Number
   - Roll Number
   - Email (read-only)
4. Save changes

#### Use Cases
- Fix certificate name typos
- Update contact information
- Correct college/department details

#### Important
- All changes are logged in `admin_logs` table
- Includes old and new values for audit
- Email cannot be changed (auth constraint)

### Tab 2: Bulk Email

#### Purpose
Send announcements/notifications to all participants of an event

#### Features
```javascript
sendBulkEmail(eventId, subject, message)
```

#### Process
1. Select event from dropdown
2. System shows recipient count
3. Enter email subject
4. Type message body
5. Confirm and send

#### Current Status
- **Logged:** Yes, action is recorded
- **Integration Required:** Email service provider

#### Integration Options

##### Option 1: SendGrid
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: emails, // array of participant emails
  from: 'noreply@dakshaa.com',
  subject: subject,
  text: message,
};
await sgMail.sendMultiple(msg);
```

##### Option 2: EmailJS (Client-side)
```javascript
emailjs.send(
  'service_id',
  'template_id',
  {
    to_email: email,
    subject: subject,
    message: message
  }
);
```

##### Option 3: Backend API + Nodemailer
```javascript
// Backend endpoint
POST /api/bulk-email
{
  "eventId": "event_id",
  "subject": "Subject",
  "message": "Message body"
}
```

### Tab 3: Activity Log

#### Purpose
View all admin actions for audit and compliance

#### Features
- **Display All Logs:** Chronological timeline of admin actions
- **Filters:**
  - Action type (force_add, move_user, edit_profile, etc.)
  - Date range
  - Admin ID
- **Details Displayed:**
  - Admin name and role
  - Action type (color-coded)
  - Target user (if applicable)
  - Timestamp
  - Detailed JSON of changes

#### Action Types Tracked
1. `force_add` - Force adding users to events
2. `move_user` - Moving users between events
3. `upgrade_combo` - Upgrading to combo packages
4. `edit_profile` - Profile modifications
5. `initiate_refund` - Refund requests
6. `promote_waitlist` - Waitlist promotions
7. `bulk_email` - Mass email sends

#### Example Log Entry
```json
{
  "id": "uuid",
  "admin_id": "admin_uuid",
  "action_type": "edit_profile",
  "target_user_id": "user_uuid",
  "details": {
    "old_values": {
      "full_name": "John Doe",
      "college_name": "ABC College"
    },
    "new_values": {
      "full_name": "John David Doe",
      "college_name": "ABC Engineering College"
    }
  },
  "created_at": "2025-12-23T10:30:00Z"
}
```

---

## Database Schema Changes

### New Tables

#### 1. admin_logs
```sql
CREATE TABLE admin_logs (
    id UUID PRIMARY KEY,
    admin_id UUID REFERENCES profiles(id),
    action_type TEXT NOT NULL,
    target_user_id UUID REFERENCES profiles(id),
    target_registration_id UUID REFERENCES registrations(id),
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. waitlist (Already exists)
```sql
CREATE TABLE waitlist (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES profiles(id),
    event_id TEXT REFERENCES events(event_id),
    status TEXT DEFAULT 'waiting',
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);
```

### Modified Tables

#### registrations
New columns added:
- `payment_mode` TEXT DEFAULT 'online' ('cash' or 'online')
- `amount_paid` DECIMAL DEFAULT 0
- `marked_by` UUID REFERENCES profiles(id) (admin who processed it)
- `is_force_added` BOOLEAN DEFAULT false

---

## Service Functions (adminService.js)

### Registration Management
- `getAllRegistrations(filters)` - Get registrations with filters
- `forceAddUser(userId, eventId)` - Force add bypassing capacity
- `moveUserToEvent(regId, newEventId)` - Transfer to different event
- `upgradeToCombo(regId, comboId)` - Link to combo package

### Waitlist
- `getWaitlist(eventId)` - Get waitlist entries
- `promoteWaitlistUser(waitlistId)` - Promote to registration

### Finance
- `getCashierLogs(dateRange)` - Get cash payments by admin
- `getPaymentReconciliation()` - Find orphan payments
- `initiateRefund(paymentId, amount, reason)` - Start refund process

### CRM
- `updateUserProfile(userId, updates)` - Update participant data
- `getUsersByEvent(eventId)` - Get all participants of event
- `sendBulkEmail(eventId, subject, message)` - Send mass email
- `getAdminLogs(filters)` - Get activity logs

### Utility
- `searchUsers(searchTerm)` - Search participants
- `getAllEvents()` - Get all events
- `getAllCombos()` - Get all combo packages
- `logAdminAction(type, userId, regId, details)` - Log admin action

---

## Security & Permissions

### Row Level Security (RLS)
All new tables have RLS enabled:

```sql
-- Admin Logs
CREATE POLICY "Admins can view logs" ON admin_logs
    FOR SELECT USING (get_user_role() IN ('super_admin', 'registration_admin'));

-- Waitlist
CREATE POLICY "Admins can manage waitlist" ON waitlist
    FOR ALL USING (get_user_role() IN ('super_admin', 'registration_admin'));
```

### Role-Based Access
- **Super Admin:** Full access to all modules
- **Registration Admin:** Can view, limited modifications
- **Coordinator:** Read-only access to logs
- **Volunteer:** No access to these modules

---

## UI Components

### Key UI Elements

#### Stats Cards
```jsx
<StatsCard 
  icon={Users}
  label="Total Registrations"
  value={stats.total}
  color="blue"
/>
```

#### Action Modals
- Force Add Modal
- Move User Modal
- Upgrade to Combo Modal
- Refund Modal

#### Data Tables
- Sortable columns
- Hover effects
- Action buttons per row
- Pagination (if needed)

#### Filters
- Event dropdown
- Status dropdown
- Date range picker
- Search input

---

## Future Enhancements

### Registration Management
1. Bulk operations (move multiple users)
2. Import/Export registrations (CSV)
3. Advanced filtering (college, department)
4. Registration analytics dashboard

### Finance Module
1. **Razorpay Integration:** Real refund processing
2. Payment gateway webhooks
3. Revenue reports and charts
4. Tax/GST calculations
5. Export financial reports (PDF/Excel)

### Participant CRM
1. **Email Integration:** SendGrid/Mailgun setup
2. Email templates
3. SMS notifications
4. Bulk actions (assign roles, block users)
5. Certificate generation from profiles
6. Advanced search with filters

### Activity Logs
1. Export logs to CSV
2. Advanced filtering (IP address, date range)
3. Log retention policies
4. Alert on suspicious activities

---

## Testing Checklist

### Registration Management
- [ ] Force add user bypasses capacity
- [ ] Move user updates event correctly
- [ ] Upgrade to combo links properly
- [ ] All actions are logged
- [ ] Filters work correctly

### Finance Module
- [ ] Cashier logs group correctly
- [ ] Date filters work
- [ ] Refund creates transaction record
- [ ] Reconciliation finds orphans
- [ ] Totals calculate accurately

### Participant CRM
- [ ] Profile updates save correctly
- [ ] Bulk email counts recipients
- [ ] Activity log displays all actions
- [ ] Search finds users
- [ ] Old/new values logged

### Database
- [ ] All tables created
- [ ] RLS policies active
- [ ] Foreign keys work
- [ ] Triggers function correctly

---

## Troubleshooting

### Common Issues

#### "Event capacity reached" error even with force add
**Solution:** Check that `is_force_added = true` is being set in the insert query

#### Orphan payments appearing incorrectly
**Solution:** Verify that `payment_id` in registrations matches `provider_id` in transactions

#### Bulk email not sending
**Solution:** Email service needs backend integration (currently only logs action)

#### Activity logs not showing
**Solution:** Check RLS policies and user role

#### Waitlist promotion fails
**Solution:** Ensure event has available capacity

---

## Support & Maintenance

### Monitoring
- Check admin_logs regularly for unusual activity
- Monitor orphan count in reconciliation
- Review cashier totals daily

### Backups
- Backup `admin_logs` table weekly
- Keep transaction records indefinitely
- Archive old logs after 1 year

### Updates
- Update RLS policies when adding roles
- Add new action types to activity log
- Document all schema changes

---

## API Endpoints Needed (Backend)

### For Production Deployment

#### Refunds
```
POST /api/refunds/initiate
POST /api/refunds/status/:id
```

#### Bulk Email
```
POST /api/email/bulk
GET /api/email/templates
```

#### Webhooks
```
POST /api/webhooks/razorpay
POST /api/webhooks/email-status
```

---

## Contact

For questions or issues with the admin modules:
- Technical Lead: [Name]
- Email: admin@dakshaa.com
- Documentation: See project README

---

**Last Updated:** December 23, 2025
**Version:** 1.0.0
