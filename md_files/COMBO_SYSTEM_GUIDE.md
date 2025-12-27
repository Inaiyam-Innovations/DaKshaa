# 🎁 Combo & Package Management System
## Complete Implementation Guide - Explosion Strategy

---

## 📋 Overview

The **Combo & Package Management System** allows admins to bundle multiple events into discounted packages. The key innovation is the **"Explosion Strategy"** - when a student purchases a combo, the system instantly creates individual registrations for each event in the package.

### Why Explosion Strategy?

✅ **Scanner Compatibility**: Attendance scanners work without modifications  
✅ **Certificate Generation**: Individual registrations enable separate certificates  
✅ **Simple Logic**: No complex combo-aware checks needed  
✅ **Audit Trail**: Clear record of what events were accessed via combo

---

## 🏗️ Architecture

```
Student Buys Combo → Payment Verified → EXPLOSION TRIGGERED
                                              ↓
                    ┌─────────────────────────┴──────────────────────────┐
                    ↓                         ↓                          ↓
            Registration for            Registration for         Registration for
              Event A (PAID)              Event B (PAID)           Event C (PAID)
```

---

## 🗄️ Database Schema

### Table 1: `combos`
Defines the package itself.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | TEXT | e.g., "Tech Trio Pass" |
| `description` | TEXT | Package description |
| `price` | INTEGER | Discounted bundle price |
| `is_active` | BOOLEAN | Active/Inactive status |
| `display_order` | INTEGER | Sorting order |
| `created_by` | UUID | Admin who created it |

### Table 2: `combo_items`
Links combos to events.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `combo_id` | UUID | References `combos(id)` |
| `event_id` | UUID | References `events_config(id)` |

**Constraint**: `UNIQUE(combo_id, event_id)` - Prevents duplicate events in same combo.

### Table 3: `combo_purchases`
Tracks combo purchases and explosion status.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `combo_id` | UUID | Which combo was purchased |
| `user_id` | UUID | Who purchased it |
| `payment_status` | TEXT | PENDING, PAID, FAILED, REFUNDED |
| `payment_amount` | INTEGER | Amount paid |
| `transaction_id` | TEXT | Payment gateway reference |
| `explosion_completed` | BOOLEAN | Did we create all registrations? |
| `individual_registration_ids` | JSONB | Array of created registration IDs |
| `purchased_at` | TIMESTAMPTZ | Purchase timestamp |

---

## 🎯 Key RPC Functions

### 1. `get_combos_with_details()`
**Purpose**: Admin view - Get all combos with full stats  
**Returns**: Combo details, event list, total purchases, savings calculation

### 2. `get_active_combos_for_students(p_user_id)`
**Purpose**: Student view - Get available combos with conflict checks  
**Smart Features**:
- Checks if all events are open
- Checks if any event is sold out
- Detects if user already purchased this combo
- **Conflict Detection**: Flags if user already registered for individual events

### 3. `create_combo(p_name, p_description, p_price, p_event_ids[], p_is_active)`
**Validations**:
- Must include at least 2 events
- All events must be SOLO type (no TEAM events in combos)
- All events must exist

### 4. `update_combo(p_combo_id, p_name, p_description, p_price, p_event_ids[], p_is_active)`
**Behavior**: Replaces all combo items with new selection

### 5. `explode_combo_purchase()` - **THE CRITICAL FUNCTION**
**Purpose**: Execute the explosion strategy  
**Process**:
1. Create `combo_purchases` record
2. Loop through all events in the combo
3. For each event, insert into `event_registrations_config` with status='PAID'
4. Track all created registration IDs
5. Mark `explosion_completed = TRUE`

**Example SQL Inside**:
```sql
FOR v_event_record IN 
    SELECT e.id, e.name, e.price
    FROM combo_items ci
    JOIN events_config e ON ci.event_id = e.id
    WHERE ci.combo_id = p_combo_id
LOOP
    INSERT INTO event_registrations_config (
        event_id, user_id, payment_status, 
        payment_amount, transaction_id
    )
    VALUES (
        v_event_record.id,
        p_user_id,
        'PAID',
        v_event_record.price,
        p_transaction_id || '_COMBO_' || p_combo_id
    );
END LOOP;
```

---

## 🎨 Admin UI Features

### Location
`/admin/combos`

### Dashboard View

**Stats Cards**:
- Total Combos
- Active Combos
- Total Purchases

**Combo Cards Display**:
- Combo name & description
- Pricing (original vs discounted)
- Savings badge (e.g., "Save 25%")
- List of included events
- Purchase count
- Active/Inactive toggle
- Edit & Delete buttons

### Create/Edit Modal

**Fields**:
1. **Combo Name** (required)
2. **Description** (optional)
3. **Event Selection** (checkboxes)
   - Shows only SOLO events
   - Must select at least 2
   - Displays event name, category, and price
4. **Combo Price** (required)
   - "Suggest 20% Off Price" button auto-calculates
   - Shows pricing summary:
     - Original Total
     - Combo Price
     - Savings (amount & percentage)
5. **Active Status** (toggle)

**Smart Features**:
- Auto-calculates suggested price (20% discount)
- Real-time savings calculation
- Event conflict warning
- Minimum 2 events validation

---

## 🛒 Student Purchase Flow

### 1. Display Combos

Show combos as special cards above regular event listings.

```jsx
<ComboCard>
  <RibbonBadge>Save 30%</RibbonBadge>
  <Title>Tech Trio Pass</Title>
  <Price>
    <Current>₹400</Current>
    <Original>₹600</Original>
  </Price>
  <EventList>
    ✓ AI Workshop (₹200)
    ✓ IoT Workshop (₹250)
    ✓ Cyber Security (₹150)
  </EventList>
  <BuyButton />
</ComboCard>
```

### 2. Conflict Prevention

**The Logic**:
```javascript
const checkConflict = async (comboId) => {
  // Get events in this combo
  const comboEvents = await getComboEvents(comboId);
  
  // Check if user already registered for any event
  const userRegistrations = await getUserRegistrations(userId);
  
  const conflicts = comboEvents.filter(event =>
    userRegistrations.some(reg => reg.event_id === event.id)
  );
  
  if (conflicts.length > 0) {
    return {
      blocked: true,
      message: "You are already registered for: " + 
               conflicts.map(e => e.name).join(', ')
    };
  }
  
  return { blocked: false };
};
```

**UI Behavior**:
- If conflict exists → Disable "Buy" button
- Show error message listing conflicting events
- Suggest buying individual events instead

### 3. Purchase Process

**Frontend Flow**:
```javascript
const handleComboPurchase = async (comboId, comboPrice) => {
  // Step 1: Payment Gateway Integration
  const paymentResult = await initiatePayment({
    amount: comboPrice,
    purpose: 'COMBO_PURCHASE',
    comboId: comboId
  });
  
  // Step 2: On Payment Success → Trigger Explosion
  if (paymentResult.status === 'SUCCESS') {
    const explosionResult = await comboService.explodeComboPurchase({
      comboId: comboId,
      userId: currentUser.id,
      transactionId: paymentResult.transactionId,
      paymentAmount: comboPrice
    });
    
    if (explosionResult.success) {
      // Show success message
      alert(`Success! Registered for ${explosionResult.registrationsCreated} events`);
      
      // Redirect to dashboard
      navigate('/dashboard');
    }
  }
};
```

---

## 🔐 Security Features

### Row Level Security (RLS)

**Combos Table**:
- Public can view active combos
- Only admins can create/edit/delete

**Combo Purchases Table**:
- Users can view their own purchases
- Users can create purchases (buy combos)
- Admins can view all purchases

### Validation Rules

1. **Admin Side**:
   - Only SOLO events can be in combos
   - Minimum 2 events per combo
   - Cannot delete combo with existing purchases (deactivate instead)

2. **Student Side**:
   - Cannot buy combo if already owns individual event
   - Cannot buy if any event in combo is sold out
   - Cannot buy if any event is closed
   - Cannot buy same combo twice

---

## 🎓 Use Cases

### Use Case 1: Create "Tech Trio" Combo

**Admin Actions**:
1. Navigate to `/admin/combos`
2. Click "Create Combo"
3. Enter name: "Tech Trio Pass"
4. Select events:
   - AI Workshop (₹200)
   - IoT Fundamentals (₹180)
   - Cyber Security (₹220)
5. Original price: ₹600
6. Set combo price: ₹450 (25% off)
7. Click "Create Combo"

**Result**: Students see a combo card offering 3 workshops for ₹450 instead of ₹600.

### Use Case 2: Student Buys Combo

**Student Journey**:
1. Views combo on events page
2. Sees "Save ₹150 (25%)" badge
3. Clicks "Buy Now"
4. Payment gateway: Pays ₹450
5. **Explosion happens** (backend):
   - 3 individual registrations created
   - All marked as PAID
   - Transaction ID: `TXN123_COMBO_abc-def-ghi`
6. Student gets confirmation: "You're registered for 3 events!"

**Scanner Verification**:
When student attends AI Workshop:
- Scanner reads QR code
- Checks `event_registrations_config`
- Finds entry: `user_id=X, event_id=AI_WORKSHOP, status=PAID`
- ✅ **Grants entry** (scanner doesn't know or care it was a combo purchase)

### Use Case 3: Conflict Prevention

**Scenario**:
- Student already bought "AI Workshop" individually (₹200)
- Now tries to buy "Tech Trio" combo (includes AI Workshop)

**System Response**:
```
❌ Cannot Purchase
You are already registered for: AI Workshop

Recommendation: Buy remaining events individually or 
contact support for combo adjustment.
```

---

## 📊 Analytics & Reporting

### Admin Reports

**Combo Performance**:
```sql
SELECT 
  c.name,
  COUNT(cp.id) AS total_purchases,
  SUM(cp.payment_amount) AS revenue,
  AVG(c.price - (SELECT SUM(e.price) FROM ...)) AS avg_savings_per_purchase
FROM combos c
LEFT JOIN combo_purchases cp ON c.id = cp.combo_id
WHERE cp.payment_status = 'PAID'
GROUP BY c.id;
```

**Most Popular Combo**:
Shows which bundles students prefer.

**Revenue from Combos**:
Total earnings from package sales.

---

## 🚀 Setup Instructions

### Step 1: Database Setup

```powershell
# Copy SQL to clipboard
Get-Content "database\combo_packages.sql" -Raw | Set-Clipboard

# Paste in Supabase SQL Editor and RUN
```

This creates:
- 3 tables (combos, combo_items, combo_purchases)
- 6 RPC functions
- RLS policies
- Indexes

### Step 2: Frontend Setup

Routes already configured in `App.jsx`:
```jsx
<Route path="combos" element={
  <ProtectedRoute allowedRoles={['super_admin']}>
    <ComboManagement />
  </ProtectedRoute>
} />
```

### Step 3: Test Admin Panel

1. Navigate to: `http://localhost:5173/admin/combos`
2. Click "Create Combo"
3. Select 2-3 SOLO events
4. Set discounted price
5. Save and verify it appears in the list

### Step 4: Test Student View

*Note: Student-facing combo display needs to be added to your registration page.*

---

## 🔧 Troubleshooting

### Issue: "Only SOLO events can be added to combos"
**Cause**: Tried to add a TEAM event to combo  
**Solution**: Combos only support SOLO events. Team events require complex teammate linking.

### Issue: "Combo must include at least 2 events"
**Cause**: Selected only 1 event  
**Solution**: Select minimum 2 events for a valid combo.

### Issue: "Cannot delete combo with existing purchases"
**Cause**: Combo has paid purchases  
**Solution**: Deactivate the combo instead of deleting it. This preserves purchase history.

### Issue: Explosion didn't complete
**Cause**: Error during registration creation loop  
**Solution**: Check `combo_purchases.explosion_completed` field. If FALSE, check error logs.

---

## 🎯 Best Practices

### Admin Guidelines

1. **Pricing Strategy**:
   - Offer 15-25% discount on combos
   - Don't undervalue events (minimum 10% discount)
   - Use "Suggest 20% Off" button as baseline

2. **Event Selection**:
   - Bundle complementary events (e.g., "Web Dev Trio": HTML, CSS, JavaScript)
   - Avoid mixing very different categories
   - Consider student interests and value perception

3. **Naming Conventions**:
   - Use descriptive names: "Tech Essentials", "Full Conference Pass"
   - Avoid generic names like "Combo 1", "Package A"

4. **Timing**:
   - Create combos early in registration period
   - Deactivate (don't delete) after event dates pass
   - Keep combo active while any included event is open

### Developer Guidelines

1. **Always Use explode_combo_purchase RPC**:
   - Never manually insert registrations
   - The RPC handles atomicity and tracking

2. **Check explosion_completed**:
   - After purchase, verify this field is TRUE
   - If FALSE, investigate and potentially retry

3. **Transaction IDs**:
   - Format: `PAYMENT_TXN_ID + '_COMBO_' + COMBO_ID`
   - This links individual registrations back to combo purchase

---

## 📈 Future Enhancements

### Planned Features

1. **Dynamic Pricing**:
   - Combo price increases as capacity fills up
   - Early bird combo discounts

2. **TEAM Event Support**:
   - Allow team events in combos
   - Link all team members automatically

3. **Partial Refunds**:
   - If one event in combo is cancelled
   - Calculate and refund proportional amount

4. **Combo Analytics Dashboard**:
   - Real-time combo conversion rates
   - Revenue comparison (combo vs individual)

---

## 📞 Support

**For Database Issues**:
- Check Supabase logs for RPC function errors
- Verify all tables exist
- Test RPC functions individually in SQL Editor

**For Frontend Issues**:
- Check browser console for errors
- Verify `comboService.js` imports correctly
- Test API calls in Network tab

**For Payment Integration**:
- Ensure payment gateway supports custom metadata
- Pass `comboId` in payment request
- Handle payment webhooks properly

---

**Status**: ✅ Production Ready  
**Last Updated**: December 23, 2025  
**Implementation**: Explosion Strategy

---

## 🎉 Quick Start Summary

```bash
# 1. Deploy database
Run combo_packages.sql in Supabase

# 2. Access admin panel
Navigate to /admin/combos

# 3. Create first combo
- Select 2+ SOLO events
- Set discounted price
- Activate

# 4. Test explosion
- Mock a purchase
- Verify individual registrations created
- Check scanner compatibility
```

**The Explosion Strategy ensures zero changes to your existing attendance scanner while providing powerful combo functionality!** 🚀
