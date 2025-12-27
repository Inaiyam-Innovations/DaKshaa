# Event Registration System - Complete Guide

## 🎯 Overview

The redesigned Event Registration System (`/register-events`) is a comprehensive, database-driven registration platform that integrates seamlessly with the DaKshaa admin panel and provides real-time event data, combo packages, and intelligent capacity management.

## ✨ Key Features

### 1. **Dual Registration Modes**
- **Individual Events**: Select specific events, pay per event
- **Combo Packages**: Bundled discounts with category quotas

### 2. **Real-Time Data Integration**
- Live event data from `events_config` table
- Dynamic pricing and capacity tracking
- Real-time availability checks
- Automatic sold-out detection

### 3. **Smart Category Management**
- Filter events by category (Technical, Non-Technical, Workshop, Cultural, etc.)
- Search functionality across event names and descriptions
- Category quota enforcement for combo packages

### 4. **Professional UI/UX**
- Multi-step wizard interface with progress tracking
- Animated cards with hover effects
- Color-coded availability indicators
- Sticky cart summary with total calculation
- Mobile-responsive design

### 5. **Payment Integration**
- Razorpay payment gateway ready
- Transaction tracking
- Demo mode for testing

## 📁 File Structure

```
Frontend/src/Pages/Register/
├── EventRegistration.jsx           # Main page wrapper
├── Components/
│   ├── RegistrationForm.jsx        # Core registration logic
│   ├── EventCard.jsx                # Individual event card component
│   ├── ComboCard.jsx                # Combo package card component
│   ├── SignUpForm.jsx               # User account creation
│   └── ... (other legacy components)
```

## 🔧 Technical Architecture

### Data Flow

```
User → RegistrationForm
  ↓
  ├─→ eventConfigService.getEventsWithStats()
  │   └─→ Supabase RPC: get_events_with_stats
  │       └─→ Returns: events with registration counts
  │
  ├─→ comboService.getActiveCombosForStudents()
  │   └─→ Supabase RPC: get_active_combos_for_students
  │       └─→ Returns: active combos with event details
  │
  └─→ User Selection → Payment → Database Insert
```

### Component Props

#### EventCard
```jsx
<EventCard
  event={eventObject}        // Event data from database
  onSelect={(event) => {}}   // Selection callback
  isSelected={boolean}       // Selected state
  isDisabled={boolean}       // Disabled state (already registered)
/>
```

**Event Object Structure:**
```javascript
{
  id: "uuid",
  event_key: "ws_iot",
  name: "IoT Workshop",
  description: "Hands-on IoT training",
  price: 500,
  type: "SOLO" | "TEAM",
  capacity: 100,
  current_registrations: 45,
  is_open: true,
  category: "Technical"
}
```

#### ComboCard
```jsx
<ComboCard
  combo={comboObject}        // Combo data from database
  onSelect={(combo) => {}}   // Selection callback
  isSelected={boolean}       // Selected state
  userPurchasedCombos={[]}   // Array of purchased combo IDs
/>
```

**Combo Object Structure:**
```javascript
{
  combo_id: "uuid",
  combo_name: "Tech Explorer Pass",
  combo_description: "Best for tech enthusiasts",
  price: 1500,
  is_active: true,
  total_purchases: 25,
  category_quotas: {
    "Technical": 3,
    "Workshop": 2
  },
  events: [
    { id: "uuid", name: "Event 1", price: 500 },
    { id: "uuid", name: "Event 2", price: 600 }
  ]
}
```

## 🎨 UI States and Colors

### Event Availability Indicators

| Status | Color | Condition |
|--------|-------|-----------|
| Available | Green | `is_open && current < capacity` |
| Filling Fast | Yellow | `current >= 80% capacity` |
| Fully Booked | Orange | `current >= capacity` |
| Closed | Red | `!is_open` |

### Progress Steps

1. **Choose Type** - Individual vs Combo
2. **Select Package** (Combo only) - Choose combo plan
3. **Choose Events** - Select specific events
4. **Complete** - Success confirmation

## 🔐 Access Control

### User Authentication
- Redirects to `/login` if user not authenticated
- Fetches user profile data for prefilling
- Prevents duplicate registrations

### Registration Prevention
```javascript
// Already registered events are disabled
isDisabled={userRegisteredEvents.includes(event.id)}

// Already purchased combos are shown as "Purchased"
isPurchased={userPurchasedCombos.includes(combo.combo_id)}
```

## 💳 Payment Flow

### Individual Events
```javascript
1. User selects events
2. Calculate total: sum of event prices
3. Open Razorpay with total amount
4. On success:
   - Insert into event_registrations_config for each event
   - Mark payment_status as 'PAID'
   - Store transaction_id
5. Redirect to success screen
```

### Combo Packages
```javascript
1. User selects combo
2. (Optional) Select events based on category quotas
3. Total = combo.price (fixed)
4. Open Razorpay with combo price
5. On success:
   - Call comboService.purchaseCombo()
   - Insert into combo_purchases
   - Insert into event_registrations_config for each event
   - Mark payment_status as 'PAID'
6. Redirect to success screen
```

## 🧪 Testing

### Demo Mode
Currently enabled for testing without Razorpay:
```javascript
// In RegistrationForm.jsx
setTimeout(async () => {
  // Simulates successful payment after 1.5 seconds
  // ... registration logic
}, 1500);
```

### Production Mode
Uncomment this line:
```javascript
const razorpay = new window.Razorpay(options);
razorpay.open();
```

## 🔄 State Management

### Main States
```javascript
const [step, setStep] = useState(1);                    // Current wizard step
const [mode, setMode] = useState(null);                 // 'individual' | 'combo'
const [selectedCombo, setSelectedCombo] = useState(null);
const [selectedEvents, setSelectedEvents] = useState([]);
const [events, setEvents] = useState([]);
const [combos, setCombos] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [categoryFilter, setCategoryFilter] = useState('ALL');
```

### Computed Values
```javascript
const calculateTotal = () => { /* ... */ }
const isSelectionValid = () => { /* ... */ }
const getFilteredEvents = () => { /* ... */ }
```

## 📊 Admin Panel Integration

Events configured in Admin Panel appear automatically in registration:

**Admin Panel Path**: `/admin/events`

Changes reflected instantly:
- ✅ Price updates
- ✅ Capacity changes
- ✅ Open/Close status
- ✅ Event details
- ✅ Category modifications

## 🚀 Deployment Checklist

- [ ] Enable Razorpay in production
- [ ] Set `VITE_RAZORPAY_KEY_ID` environment variable
- [ ] Test payment flow end-to-end
- [ ] Verify capacity constraints
- [ ] Test combo category quotas
- [ ] Check mobile responsiveness
- [ ] Verify authentication redirects
- [ ] Test duplicate registration prevention

## 🐛 Common Issues & Solutions

### Issue: Events not appearing
**Solution**: Check `events_config` table has `is_open = true`

### Issue: Combo not showing
**Solution**: Verify `is_active = true` in `combos` table

### Issue: Payment not processing
**Solution**: Check Razorpay key configuration and script loading

### Issue: Category quotas not enforced
**Solution**: Ensure `category_quotas` JSONB is properly formatted

## 🎯 Future Enhancements

1. **Waitlist System** - Auto-notify when spots open
2. **Team Registration** - For TEAM type events
3. **Discount Codes** - Promo code support
4. **Invoice Generation** - PDF receipts
5. **Calendar Integration** - Add to Google Calendar
6. **Email Confirmations** - Automated ticket emails

## 📞 Support

For technical support or feature requests, contact the development team.

---

**Last Updated**: December 23, 2025
**Version**: 2.0
**Status**: Production Ready
