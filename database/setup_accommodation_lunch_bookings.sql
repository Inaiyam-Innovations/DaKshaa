-- Complete Fix for Accommodation and Lunch Bookings
-- Run this in Supabase SQL Editor

-- ==================== PART 1: Drop and Recreate Tables ====================

-- Drop existing tables
DROP TABLE IF EXISTS public.accommodation_requests CASCADE;
DROP TABLE IF EXISTS public.lunch_bookings CASCADE;

-- Create accommodation_requests table
CREATE TABLE public.accommodation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    college_name TEXT NOT NULL,
    gender TEXT,
    
    -- Accommodation date as column
    march_28_accommodation BOOLEAN DEFAULT FALSE,
    
    -- Pricing
    number_of_days INTEGER DEFAULT 0,
    total_price DECIMAL(10, 2) NOT NULL,
    
    payment_status TEXT DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
    payment_id TEXT,
    special_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- One row per user
    UNIQUE(user_id)
);

-- Create lunch_bookings table
CREATE TABLE public.lunch_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    
    -- Separate columns for each lunch date
    march_28_lunch BOOLEAN DEFAULT FALSE,
    march_29_lunch BOOLEAN DEFAULT FALSE,
    
    -- Price calculation
    total_lunches INTEGER DEFAULT 0,
    total_price DECIMAL(10, 2) DEFAULT 0,
    
    payment_status TEXT DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
    payment_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- One row per user
    UNIQUE(user_id)
);

-- ==================== PART 2: Enable RLS ====================

ALTER TABLE public.accommodation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lunch_bookings ENABLE ROW LEVEL SECURITY;

-- ==================== PART 3: Create RLS Policies ====================

-- Accommodation Policies
CREATE POLICY "Users can view their own accommodation requests" 
ON public.accommodation_requests FOR SELECT 
USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'registration_admin')
));

CREATE POLICY "Users can insert accommodation requests" 
ON public.accommodation_requests FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own accommodation requests" 
ON public.accommodation_requests FOR UPDATE 
USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'registration_admin')
));

CREATE POLICY "Admins can delete accommodation requests" 
ON public.accommodation_requests FOR DELETE 
USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'registration_admin')
));

-- Lunch Booking Policies
CREATE POLICY "Users can view their own lunch bookings" 
ON public.lunch_bookings FOR SELECT 
USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'registration_admin')
));

CREATE POLICY "Users can insert lunch bookings" 
ON public.lunch_bookings FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own lunch bookings" 
ON public.lunch_bookings FOR UPDATE 
USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'registration_admin')
));

CREATE POLICY "Admins can delete lunch bookings" 
ON public.lunch_bookings FOR DELETE 
USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'registration_admin')
));

-- ==================== PART 4: Create Indexes ====================

CREATE INDEX idx_accommodation_user ON public.accommodation_requests(user_id);
CREATE INDEX idx_accommodation_payment ON public.accommodation_requests(payment_status);
CREATE INDEX idx_accommodation_march_28 ON public.accommodation_requests(march_28_accommodation);

CREATE INDEX idx_lunch_bookings_user ON public.lunch_bookings(user_id);
CREATE INDEX idx_lunch_bookings_payment ON public.lunch_bookings(payment_status);
CREATE INDEX idx_lunch_bookings_march_28 ON public.lunch_bookings(march_28_lunch);
CREATE INDEX idx_lunch_bookings_march_29 ON public.lunch_bookings(march_29_lunch);

-- ==================== PART 5: Grant Permissions ====================

GRANT SELECT, INSERT, UPDATE ON public.accommodation_requests TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.lunch_bookings TO authenticated;
GRANT ALL ON public.accommodation_requests TO service_role;
GRANT ALL ON public.lunch_bookings TO service_role;

-- ==================== SUCCESS ====================

SELECT '✅ Tables created successfully!' as status;
SELECT '✅ RLS policies applied!' as status;
SELECT '✅ Ready for bookings!' as status;
