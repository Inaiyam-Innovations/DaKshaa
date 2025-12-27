# Combo Category Quotas System

## Overview
The Category Quotas feature allows admins to define **structured selection requirements** for combo packages. Instead of letting students freely select any events from a combo, you can now require specific quantities from each event category.

### Real-World Example
**Gold Combo Package:**
- Student must select:
  - 2 Workshops
  - 3 Technical events
  - 2 Non-Technical events
  - 1 Sports event

This ensures balanced participation across different event types and prevents students from selecting all events from a single category.

---

## Database Schema

### combos Table
```sql
CREATE TABLE public.combos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Category Quotas (NEW FIELD)
    category_quotas JSONB DEFAULT '{}'::jsonb,
    -- Format: {"Workshop": 2, "Technical": 3, "Non-Technical": 2, "Sports": 1}
    
    display_order INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### combo_items Table
```sql
CREATE TABLE public.combo_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    combo_id UUID NOT NULL REFERENCES public.combos(id) ON DELETE CASCADE,
    event_id UUID NOT NULL REFERENCES public.events_config(id) ON DELETE CASCADE,
    
    -- Category Slot (NEW FIELD)
    category_slot TEXT, -- Stores event's category for quota tracking
    
    UNIQUE(combo_id, event_id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## API Functions

### 1. create_combo
```sql
CREATE OR REPLACE FUNCTION public.create_combo(
    p_name TEXT,
    p_description TEXT,
    p_price INTEGER,
    p_event_ids UUID[],
    p_is_active BOOLEAN DEFAULT TRUE,
    p_category_quotas JSONB DEFAULT '{}'::jsonb -- NEW PARAMETER
)
RETURNS JSON
```

**Example Call:**
```javascript
const result = await supabase.rpc('create_combo', {
  p_name: 'Gold Combo',
  p_description: 'Best value with balanced events',
  p_price: 599,
  p_event_ids: ['event-uuid-1', 'event-uuid-2', ...],
  p_is_active: true,
  p_category_quotas: {
    "Workshop": 2,
    "Technical": 3,
    "Non-Technical": 2,
    "Sports": 1
  }
});
```

### 2. update_combo
```sql
CREATE OR REPLACE FUNCTION public.update_combo(
    p_combo_id UUID,
    p_name TEXT,
    p_description TEXT,
    p_price INTEGER,
    p_event_ids UUID[],
    p_is_active BOOLEAN,
    p_category_quotas JSONB DEFAULT '{}'::jsonb -- NEW PARAMETER
)
RETURNS JSON
```

### 3. get_combos_with_details
Returns combo data **including** category quotas:

```javascript
const { data } = await supabase.rpc('get_combos_with_details');

// Sample Response:
[
  {
    combo_id: 'uuid',
    combo_name: 'Gold Combo',
    combo_price: 599,
    category_quotas: { "Workshop": 2, "Technical": 3 }, // <-- NEW FIELD
    events: [
      {
        event_id: 'uuid',
        event_name: 'React Workshop',
        event_category: 'Workshop',
        category_slot: 'Workshop' // <-- Shows which quota this fills
      }
    ]
  }
]
```

---

## Frontend Implementation

### Admin UI - Configure Quotas

In `ComboManagement.jsx`, admins can set quotas for each category:

```jsx
// Category Quotas Section
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
  {CATEGORIES.map(category => (
    <div key={category} className="bg-white/5 border border-white/10 rounded-xl p-3">
      <label className="block text-xs text-gray-400 mb-1">{category}</label>
      <input
        type="number"
        min="0"
        value={formData.categoryQuotas[category] || 0}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 0;
          setFormData({
            ...formData,
            categoryQuotas: {
              ...formData.categoryQuotas,
              [category]: value === 0 ? undefined : value
            }
          });
        }}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1"
      />
    </div>
  ))}
</div>
```

### Service Layer - comboService.js

```javascript
const comboService = {
  createCombo: async ({ name, description, price, eventIds, isActive, categoryQuotas }) => {
    const { data, error } = await supabase.rpc('create_combo', {
      p_name: name,
      p_description: description,
      p_price: price,
      p_event_ids: eventIds,
      p_is_active: isActive,
      p_category_quotas: categoryQuotas || {}
    });
    
    return data;
  },
  
  updateCombo: async (comboId, { name, description, price, eventIds, isActive, categoryQuotas }) => {
    const { data, error } = await supabase.rpc('update_combo', {
      p_combo_id: comboId,
      p_name: name,
      p_description: description,
      p_price: price,
      p_event_ids: eventIds,
      p_is_active: isActive,
      p_category_quotas: categoryQuotas || {}
    });
    
    return data;
  }
};
```

---

## Student-Facing Implementation (TODO)

### Quota Validation Logic

When students select events for a combo with quotas, you need to enforce:

1. **Category Limits**: User can't select more than quota allows
2. **Minimum Requirements**: Must select exactly the required count
3. **Visual Feedback**: Show progress (e.g., "Workshop: 1/2 selected")

### Example Student UI Component

```jsx
const ComboSelectionModal = ({ combo, onComplete }) => {
  const [selectedEvents, setSelectedEvents] = useState({});
  const quotas = combo.category_quotas || {};
  
  // Calculate current selections per category
  const categoryCount = (category) => {
    return Object.values(selectedEvents)
      .filter(event => event.category === category)
      .length;
  };
  
  // Check if quota is met
  const isQuotaMet = (category) => {
    const required = quotas[category] || 0;
    return categoryCount(category) === required;
  };
  
  // Check if user can add more from this category
  const canAddMore = (category) => {
    const required = quotas[category] || 0;
    return categoryCount(category) < required;
  };
  
  // Validate all quotas met before submission
  const canSubmit = () => {
    return Object.entries(quotas).every(([category, required]) => {
      return categoryCount(category) === required;
    });
  };
  
  return (
    <div>
      {/* Show quota requirements */}
      <div className="mb-4">
        <h3>Selection Requirements:</h3>
        {Object.entries(quotas).map(([category, required]) => (
          <div key={category} className="flex items-center gap-2">
            <span>{category}:</span>
            <span className={isQuotaMet(category) ? 'text-green-400' : 'text-orange-400'}>
              {categoryCount(category)} / {required}
            </span>
            {isQuotaMet(category) && <Check className="text-green-400" />}
          </div>
        ))}
      </div>
      
      {/* Event selection by category */}
      {Object.entries(quotas).map(([category, required]) => (
        <div key={category}>
          <h4>{category} Events (Select {required})</h4>
          {combo.events
            .filter(event => event.event_category === category)
            .map(event => (
              <label key={event.event_id}>
                <input
                  type="checkbox"
                  checked={selectedEvents[event.event_id]}
                  disabled={!selectedEvents[event.event_id] && !canAddMore(category)}
                  onChange={(e) => handleToggleEvent(event, e.target.checked)}
                />
                {event.event_name}
              </label>
            ))}
        </div>
      ))}
      
      <button 
        onClick={handleSubmit} 
        disabled={!canSubmit()}
      >
        Proceed to Payment
      </button>
    </div>
  );
};
```

---

## Use Cases

### 1. Balanced Participation
**Gold Event Pass:**
- 2 Workshops (skill-building)
- 3 Technical (core events)
- 2 Cultural (well-rounded)
- 1 Sports (fitness)

### 2. Department-Specific Combos
**CS Department Combo:**
- 3 Technical
- 2 Workshops
- 1 Conference

### 3. Weekend Warrior Pack
**Saturday-Sunday Special:**
- 2 Workshop
- 2 Gaming
- 1 Sports

---

## Validation Rules

### Admin-Side Validation
✅ Quota counts must be non-negative integers  
✅ Total quota count should not exceed available events  
✅ Categories with 0 quota are ignored  

### Student-Side Validation
✅ Must select exact quota count per category  
✅ Cannot exceed quota for any category  
✅ Cannot submit until all quotas are met  
✅ Selected events must be SOLO type  
✅ Selected events must be open and have capacity  

---

## Database Queries

### Get combos with quota requirements
```sql
SELECT 
  c.id,
  c.name,
  c.category_quotas,
  jsonb_agg(
    jsonb_build_object(
      'event_id', e.id,
      'event_name', e.name,
      'event_category', e.category,
      'category_slot', ci.category_slot
    )
  ) as events
FROM combos c
JOIN combo_items ci ON c.id = ci.combo_id
JOIN events_config e ON ci.event_id = e.id
WHERE c.is_active = TRUE
GROUP BY c.id;
```

### Validate user selection meets quotas
```javascript
function validateQuotaSelection(quotas, selectedEvents) {
  const categoryCounts = {};
  
  // Count selections per category
  selectedEvents.forEach(event => {
    categoryCounts[event.category] = (categoryCounts[event.category] || 0) + 1;
  });
  
  // Validate each quota
  for (const [category, requiredCount] of Object.entries(quotas)) {
    if (requiredCount === 0) continue;
    
    const actualCount = categoryCounts[category] || 0;
    if (actualCount !== requiredCount) {
      return {
        valid: false,
        message: `Must select exactly ${requiredCount} ${category} events (currently ${actualCount})`
      };
    }
  }
  
  return { valid: true };
}
```

---

## Testing Scenarios

### Test Case 1: Create Combo with Quotas
```javascript
const result = await comboService.createCombo({
  name: 'Tech Master Bundle',
  description: 'Complete technical experience',
  price: 799,
  eventIds: [/* 8 event UUIDs */],
  isActive: true,
  categoryQuotas: {
    "Workshop": 2,
    "Technical": 3,
    "Conference": 1,
    "Non-Technical": 2
  }
});

expect(result.success).toBe(true);
```

### Test Case 2: Student Selection Validation
```javascript
const quotas = { "Workshop": 2, "Technical": 3 };
const selection = [
  { id: '1', category: 'Workshop' },
  { id: '2', category: 'Workshop' },
  { id: '3', category: 'Technical' },
  { id: '4', category: 'Technical' },
  { id: '5', category: 'Technical' }
];

const validation = validateQuotaSelection(quotas, selection);
expect(validation.valid).toBe(true);
```

### Test Case 3: Incomplete Selection
```javascript
const quotas = { "Workshop": 2, "Technical": 3 };
const selection = [
  { id: '1', category: 'Workshop' },
  { id: '3', category: 'Technical' }
];

const validation = validateQuotaSelection(quotas, selection);
expect(validation.valid).toBe(false);
expect(validation.message).toContain('Must select exactly');
```

---

## Migration Guide

### For Existing Combos
Existing combos without `category_quotas` will have:
```json
category_quotas: {}
```

This means **no quota restrictions** - students can select any events (backward compatible).

### To Enable Quotas
1. Admin opens combo in edit mode
2. Sets quota values for desired categories
3. Saves combo
4. Students now see quota requirements when purchasing

---

## Future Enhancements

### Smart Quota Suggestions
Auto-suggest quotas based on event availability:
```javascript
function suggestQuotas(events) {
  const categoryGroups = groupBy(events, 'category');
  const suggestions = {};
  
  Object.entries(categoryGroups).forEach(([category, events]) => {
    if (events.length >= 2) {
      suggestions[category] = Math.floor(events.length / 2);
    }
  });
  
  return suggestions;
}
```

### Dynamic Pricing by Quota
Different quotas = different prices:
```javascript
const goldCombo = {
  quotas: { "Workshop": 2, "Technical": 3 },
  price: 799
};

const silverCombo = {
  quotas: { "Workshop": 1, "Technical": 2 },
  price: 499
};
```

### Quota Templates
Pre-defined templates for common patterns:
- **Beginner**: 1 Workshop, 1 Technical
- **Intermediate**: 2 Workshop, 2 Technical, 1 Conference
- **Advanced**: 3 Workshop, 3 Technical, 2 Conference

---

## Deployment Checklist

- [ ] Deploy updated `combo_packages.sql`
- [ ] Verify `category_quotas` column exists in `combos` table
- [ ] Verify `category_slot` column exists in `combo_items` table
- [ ] Test `create_combo()` RPC with quotas
- [ ] Test `update_combo()` RPC with quotas
- [ ] Test `get_combos_with_details()` returns quotas
- [ ] Update admin UI to configure quotas
- [ ] Build student selection UI with quota validation
- [ ] Test complete flow: create combo → student selects → explode purchase

---

## Support

For questions or issues:
1. Check database schema is deployed correctly
2. Verify RPC functions accept `p_category_quotas` parameter
3. Check service layer passes `categoryQuotas` to RPC calls
4. Validate student selection logic enforces quotas correctly

**Category Quotas = Structured, Balanced Event Participation! 🎯**
