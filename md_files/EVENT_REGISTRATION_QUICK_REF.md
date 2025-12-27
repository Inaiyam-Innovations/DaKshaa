# Event Registration - Quick Reference Card

## 🎯 Access URL
```
http://localhost:5173/register-events
```

## 📦 Key Components

### 1. EventCard.jsx
**Purpose**: Individual event display card  
**Props**:
- `event` - Event object from database
- `onSelect(event)` - Click handler
- `isSelected` - Boolean
- `isDisabled` - Boolean (already registered)

**Features**:
- Real-time capacity visualization
- Color-coded availability status
- Premium event badges
- Animated hover effects

### 2. ComboCard.jsx
**Purpose**: Combo package display card  
**Props**:
- `combo` - Combo object from database
- `onSelect(combo)` - Click handler
- `isSelected` - Boolean
- `userPurchasedCombos` - Array of purchased IDs

**Features**:
- Discount percentage calculation
- Category quota display
- Purchase status indicators
- Best value badges

### 3. RegistrationForm.jsx
**Purpose**: Main registration wizard  
**States**: 4 steps with progress tracking  
**Modes**: Individual or Combo  

**Key Functions**:
- `fetchInitialData()` - Load events, combos, user data
- `handleEventSelect(event)` - Toggle event selection with quota checks
- `handlePayment()` - Process payment via Razorpay
- `calculateTotal()` - Compute total price
- `isSelectionValid()` - Validate selection before payment

## 🗄️ Database Tables

### events_config
```sql
- id (UUID)
- event_key (TEXT UNIQUE)
- name (TEXT)
- description (TEXT)
- price (INTEGER)
- type (SOLO/TEAM)
- capacity (INTEGER)
- is_open (BOOLEAN)
- category (TEXT)
- current_registrations (computed)
```

### combos
```sql
- id (UUID)
- name (TEXT)
- description (TEXT)
- price (INTEGER)
- is_active (BOOLEAN)
- category_quotas (JSONB)
```

### event_registrations_config
```sql
- id (UUID)
- user_id (UUID)
- event_id (UUID)
- payment_status (PENDING/PAID/FAILED/REFUNDED)
- payment_amount (INTEGER)
- transaction_id (TEXT)
```

## 🔌 API Services

### eventConfigService
```javascript
import eventConfigService from '../../../services/eventConfigService';

// Get all events with stats
const { success, data } = await eventConfigService.getEventsWithStats();

// Check availability
const result = await eventConfigService.checkEventAvailability(eventId);
```

### comboService
```javascript
import comboService from '../../../services/comboService';

// Get active combos for students
const { success, data } = await comboService.getActiveCombosForStudents(userId);

// Purchase combo
const result = await comboService.purchaseCombo({
  userId,
  comboId,
  eventIds,
  transactionId,
  amount
});
```

## 🎨 Color Scheme

```css
Primary: #06B6D4 (Cyan)
Secondary: #F97316 (Orange)

Status Colors:
- Available: #10B981 (Green)
- Filling Fast: #FBBF24 (Yellow)
- Fully Booked: #F59E0B (Orange)
- Closed: #EF4444 (Red)
```

## 🚦 Status Logic

```javascript
// Event availability
const isNearlyFull = (current / capacity) >= 0.8;
const isFull = current >= capacity;
const isOpen = event.is_open && !isFull;

// Combo availability
const isAvailable = combo.is_active && !isPurchased;
```

## 💡 Common Tasks

### Add New Event Category
1. Update category in event_configuration.sql CHECK constraint
2. Events will automatically filter by new category

### Create Combo with Category Quotas
```javascript
category_quotas: {
  "Technical": 3,    // Must select 3 technical events
  "Workshop": 2,     // Must select 2 workshops
  "Cultural": 1      // Must select 1 cultural event
}
```

### Customize Event Card Colors
Edit `EventCard.jsx` - search for "bg-gradient-to-r"

### Add Payment Methods
Update `handlePayment()` in RegistrationForm.jsx

## 🔧 Environment Variables

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_here
```

## 📱 Responsive Breakpoints

```javascript
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

## 🐛 Debug Mode

Enable console logs:
```javascript
// In RegistrationForm.jsx
console.log('Events:', events);
console.log('Selected:', selectedEvents);
console.log('Total:', calculateTotal());
```

## ⚡ Performance Tips

1. **Lazy load images** - Event thumbnails (future enhancement)
2. **Debounce search** - Add 300ms delay to search input
3. **Memoize calculations** - Use React.useMemo for expensive operations
4. **Virtualize lists** - For 100+ events, use react-window

## 🔒 Security Checks

✅ Row Level Security enabled on all tables  
✅ Payment verification server-side  
✅ Capacity constraints enforced in database  
✅ Duplicate registration prevention  
✅ User authentication required  

## 📊 Analytics Events (Future)

```javascript
// Track event selection
analytics.track('event_selected', { eventId, eventName });

// Track combo selection
analytics.track('combo_selected', { comboId, comboName });

// Track payment
analytics.track('payment_initiated', { amount, mode });
```

## 🎯 Testing Checklist

- [ ] Individual event selection
- [ ] Combo package selection
- [ ] Category quota enforcement
- [ ] Search functionality
- [ ] Category filtering
- [ ] Capacity near-full warnings
- [ ] Sold-out handling
- [ ] Duplicate registration prevention
- [ ] Payment flow (demo mode)
- [ ] Success page redirect
- [ ] Mobile responsiveness
- [ ] Back button navigation

---

**Quick Start**: Open [http://localhost:5173/register-events](http://localhost:5173/register-events)

**Admin Panel**: [http://localhost:5173/admin/events](http://localhost:5173/admin/events)
