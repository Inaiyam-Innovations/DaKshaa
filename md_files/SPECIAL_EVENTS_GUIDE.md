# Special Events Category - Implementation Guide

## 🌟 Overview

The registration system now includes a **Special Events** category for premium, exclusive events like Hackathons, Codeathons, Conferences, and other special programs that require separate registration.

## ✨ Key Features

### What Makes Special Events Different?

1. **❌ NOT Included in Combo Packages**
   - Special events are excluded from all combo packages
   - Users must register individually for these events
   - Cannot be mixed with combo selections

2. **🎯 Dedicated Registration Flow**
   - Third option on the registration type selection page
   - Exclusive UI with special badges and styling
   - Filtered view showing only Special category events

3. **💎 Premium Event Indicators**
   - Red/Pink gradient badges marked "Exclusive"
   - Special notice explaining separate registration
   - Premium event styling throughout the flow

## 🎨 UI Changes

### Step 1: Registration Type Selection (Now 3 Options)

```
┌─────────────────┬─────────────────┬─────────────────┐
│ Individual      │ Combo Packages  │ Special Events  │
│ Events          │                 │                 │
│ 🔵 Flexible     │ 🟣 Best Value   │ 🔴 Exclusive    │
└─────────────────┴─────────────────┴─────────────────┘
```

### Step 2: Special Events Page

- **Exclusive Notice Banner**: Red/pink gradient explaining premium nature
- **Filtered Events**: Only shows events with `category = 'Special'`
- **Search Only**: No category filters (all events are Special)
- **Premium Styling**: Special visual treatment for event cards

## 🔧 Technical Implementation

### Mode System

```javascript
// Three registration modes:
mode = 'individual'  // Regular events
mode = 'combo'       // Combo packages
mode = 'special'     // Special events only (NEW)
```

### Filtering Logic

```javascript
// Special events are excluded from combo mode
if (mode === 'combo' && event.category === 'Special') {
  return false; // Hide from combo
}

// Special mode shows only Special category
if (mode === 'special' && event.category !== 'Special') {
  return false; // Hide non-special events
}
```

### Event Selection

- Special events use the same selection logic as individual events
- No category quotas apply
- Standard payment flow
- Same validation rules

## 📊 Database Setup

### Events Configuration

To add a special event in the admin panel:

```javascript
{
  event_key: "hack_2025",
  name: "DaKshaa Hackathon 2025",
  description: "24-hour coding marathon with prizes",
  price: 1500,
  type: "TEAM",
  capacity: 200,
  category: "Special",  // ← IMPORTANT
  is_open: true
}
```

### Category Options

Make sure `Special` is included in the category CHECK constraint:

```sql
category TEXT DEFAULT 'Technical' CHECK (
  category IN (
    'Technical', 
    'Non-Technical', 
    'Workshop', 
    'Conference', 
    'Cultural', 
    'Sports', 
    'Gaming', 
    'Special',  -- ← Must be present
    'Other'
  )
)
```

## 🎯 User Journey

### Special Events Registration Flow

1. **Landing**: User sees 3 options
2. **Select "Special Events"**: Click on exclusive option
3. **View Special Events**: Filtered list with premium styling
4. **Select Events**: Choose one or more special events
5. **Review Cart**: See total (individual pricing)
6. **Payment**: Standard Razorpay flow
7. **Success**: Confirmation screen

## 🚫 Combo Exclusion Logic

### Why Special Events Don't Appear in Combos

```javascript
// In getFilteredEvents()
if (mode === 'combo' && event.category === 'Special') {
  return false; // Automatically filtered out
}

// In category filter dropdown
if (mode === 'combo' && cat === 'Special') {
  return false; // Special not shown in combo filters
}
```

### Creating Combos

When admins create combos with category quotas, they can only select from:
- Technical
- Non-Technical
- Workshop
- Cultural
- Conference
- Sports
- Gaming
- Other

**Special category is NOT available** for combo inclusion.

## 🎨 Visual Indicators

### Step 1 Card Styling

```jsx
// Special Events Card
- Icon: Sparkles (red)
- Background: Red/Pink gradient
- Badge: "Exclusive" (red gradient)
- Description: Mentions Hackathons, Codeathons, Conferences
```

### Step 2 Notice Banner

```jsx
// Premium Event Registration Notice
- Background: Red/Pink gradient with low opacity
- Icon: Sparkles
- Text: Explains exclusive nature
- Tags: "Not included in combo packages", "Individual registration only"
```

## 📋 Admin Panel Usage

### How to Add Special Events

1. Go to `/admin/events`
2. Click "Create Event"
3. Fill in event details:
   - Name: e.g., "24-Hour Hackathon"
   - Category: **Select "Special"**
   - Price: Set premium pricing
   - Type: SOLO or TEAM
   - Capacity: Event limit
4. Save and activate

### Special Event Examples

```
- Hackathons (24-hour, 48-hour)
- Codeathons (competitive programming)
- Conferences (industry speakers)
- Startup Pitch Competitions
- Innovation Challenges
- Executive Workshops
- VIP Networking Events
```

## 🔐 Validation Rules

Special events follow the same rules as individual events:

- ✅ Can select multiple special events
- ✅ Capacity constraints apply
- ✅ Payment required
- ✅ Duplicate prevention
- ❌ Cannot be purchased with combos
- ❌ Not counted in combo quotas

## 💡 Best Practices

### Pricing Strategy

- Set **premium pricing** for special events (usually higher than regular events)
- Consider event duration and exclusive benefits
- Example: Hackathon (₹1500), Conference (₹2000)

### Capacity Management

- Set realistic capacity limits
- Monitor registrations closely
- Update capacity as needed

### Event Descriptions

Be clear about what makes the event special:
- Exclusive benefits
- Special guests or speakers
- Unique opportunities
- Premium amenities
- Certification or awards

## 🐛 Troubleshooting

### Special Events Not Showing

**Check:**
1. Event category is set to "Special"
2. Event `is_open = true`
3. Event has available capacity
4. User is logged in

### Special Events Appearing in Combo

**Solution:**
- This is prevented by code
- If appearing, check filtering logic in `getFilteredEvents()`

### Category Filter Issues

**Note:**
- Special mode only shows Special events
- No category dropdown in special mode (by design)
- Search still works

## 📊 Analytics Considerations

Track special event registrations separately:

```javascript
// Suggested analytics events
analytics.track('special_event_viewed', { eventName });
analytics.track('special_event_selected', { eventName, price });
analytics.track('special_event_registered', { eventName, amount });
```

## 🚀 Future Enhancements

Potential additions for special events:

1. **Early Bird Pricing**: Discounted rates for early registration
2. **Group Registration**: Team-based registration for hackathons
3. **Prerequisites**: Required skills or events before registration
4. **Application Process**: Screening before registration approval
5. **Waitlist**: Auto-promotion when spots open
6. **Custom Forms**: Additional information collection

---

**Status**: ✅ Implemented and Ready  
**Version**: 2.1  
**Date**: December 23, 2025
