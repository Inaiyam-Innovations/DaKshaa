# 🎯 Category Quotas - Quick Reference

## What is it?
Force students to select a **specific number** of events from each category when purchasing combo packages.

## Example
**Gold Combo = 8 events:**
- ✅ Must select **2 Workshops**
- ✅ Must select **3 Technical** events  
- ✅ Must select **2 Non-Technical** events
- ✅ Must select **1 Sports** event

❌ Can't select 8 workshops  
❌ Can't select 5 technical + 3 gaming  
✅ Must follow the quota rules

---

## Admin Quick Guide

### Create Combo with Quotas:
1. Click **"Create Combo"**
2. Fill name, description, price
3. Select events to include
4. **Scroll to "Category Quotas" section**
5. Set numbers for each category:
   - Workshop: `2`
   - Technical: `3`
   - Non-Technical: `2`
   - Sports: `1`
6. Click **Save**

### View Quotas:
Each combo card shows quotas:
```
Selection Requirements:
[2 Workshop] [3 Technical] [2 Non-Technical] [1 Sports]
```

### Edit Quotas:
1. Click **"Edit"** on combo card
2. Update quota numbers
3. Click **Save**

### Remove Quotas:
Set all quotas to `0` = no restrictions

---

## Database Format

```json
{
  "Workshop": 2,
  "Technical": 3,
  "Non-Technical": 2,
  "Sports": 1
}
```

Stored in `combos.category_quotas` as JSONB.

---

## API Examples

### Create Combo:
```javascript
await comboService.createCombo({
  name: 'Gold Pass',
  price: 799,
  eventIds: [...],
  categoryQuotas: {
    "Workshop": 2,
    "Technical": 3
  }
});
```

### Get Combo:
```javascript
const { data } = await comboService.getCombosWithDetails();

// Response includes:
{
  combo_name: 'Gold Pass',
  category_quotas: { "Workshop": 2, "Technical": 3 },
  events: [...]
}
```

---

## Student Flow (Planned)

1. **View Combo:**
   ```
   Gold Pass - ₹799
   
   You must select:
   □□ Workshop (0/2)
   □□□ Technical (0/3)
   □□ Non-Technical (0/2)
   □ Sports (0/1)
   ```

2. **Select Events:**
   ```
   Workshop Events:
   ☑ React Basics
   ☑ Python 101
   ☐ Java Masterclass [DISABLED - Quota Full]
   ```

3. **Submit:**
   - ✅ All quotas met → Purchase allowed
   - ❌ Missing quotas → "You must select 1 more Sports event"

---

## Categories Available

1. **Technical** - Coding, hackathons, tech talks
2. **Non-Technical** - Quizzes, debates, general events
3. **Workshop** - Hands-on skill sessions
4. **Conference** - Seminars, guest lectures
5. **Cultural** - Dance, music, drama
6. **Sports** - Athletics, games, tournaments
7. **Gaming** - Esports, video game competitions
8. **Other** - Miscellaneous events

---

## Common Scenarios

### Balanced Pass:
```json
{
  "Workshop": 2,
  "Technical": 2,
  "Cultural": 2,
  "Sports": 2
}
```
8 events total, balanced across types.

### Tech-Focused:
```json
{
  "Workshop": 3,
  "Technical": 4,
  "Conference": 1
}
```
8 events, heavy on technical content.

### Weekend Special:
```json
{
  "Workshop": 1,
  "Gaming": 2,
  "Sports": 1
}
```
4 events, fun and casual.

---

## Validation Rules

✅ **Valid:**
- Quotas are integers ≥ 0
- Sum of quotas ≤ total events in combo
- Empty `{}` = no restrictions

❌ **Invalid:**
- Negative numbers
- Decimals
- Sum > available events

---

## UI Components

### Admin Modal - Quota Config:
```
┌────────────────────────────────────┐
│ Category Quotas                    │
├────────────────────────────────────┤
│ Workshop    [2]  Technical   [3]   │
│ Non-Tech    [2]  Sports      [1]   │
│ Cultural    [0]  Gaming      [0]   │
│ Conference  [0]  Other       [0]   │
└────────────────────────────────────┘

Student Selection Requirements:
[2 Workshop] [3 Technical] [2 Non-Technical] [1 Sports]
```

### Combo Card - Quota Display:
```
┌────────────────────────────────────┐
│ Gold Combo Pass                    │
│ ₹799  ₹1299  Save 38%              │
├────────────────────────────────────┤
│ Selection Requirements:            │
│ [2 Workshop] [3 Technical]         │
│ [2 Non-Technical] [1 Sports]       │
└────────────────────────────────────┘
```

---

## Database Tables

### combos:
```
id              | uuid
name            | text
category_quotas | jsonb  ← NEW FIELD
```

### combo_items:
```
id            | uuid
combo_id      | uuid
event_id      | uuid
category_slot | text   ← NEW FIELD (auto-populated)
```

---

## Key Benefits

🎯 **Balanced Participation** - Students experience variety  
🚫 **Prevent Gaming** - Can't pick all from one category  
📊 **Predictable Load** - Even distribution across event types  
💰 **Fair Pricing** - Quotas ensure value alignment  
🎓 **Educational** - Forces exploration of different areas  

---

## Files to Know

| File | Purpose |
|------|---------|
| `database/combo_packages.sql` | Schema & RPC functions |
| `Frontend/src/services/comboService.js` | API calls |
| `Frontend/src/Pages/Admin/SuperAdmin/ComboManagement.jsx` | Admin UI |
| `COMBO_CATEGORY_QUOTAS_GUIDE.md` | Full documentation |

---

## Troubleshooting

**Quotas not saving?**
- Check database schema deployed
- Verify RPC functions accept `p_category_quotas`

**Quotas not displaying?**
- Check `get_combos_with_details()` returns `category_quotas`
- Verify frontend fetches latest data

**Validation not working?**
- Student UI needs quota validation logic (TODO)
- Check quota format is valid JSON

---

## Status

✅ Database schema updated  
✅ RPC functions handle quotas  
✅ Service layer passes quotas  
✅ Admin UI configure & display  
⏳ Student selection UI (TODO)  
⏳ Purchase validation (TODO)  

---

**Quick Example:**

```javascript
// Admin creates combo
createCombo({
  name: 'Mega Pass',
  categoryQuotas: { "Workshop": 2, "Technical": 3 }
});

// Student views
"You must select: 2 Workshops, 3 Technical events"

// Student selects
selectedEvents = [workshop1, workshop2, tech1, tech2, tech3];

// Validation
✅ Quotas met → Purchase allowed
```

**That's it! Category Quotas in action! 🚀**
