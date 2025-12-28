const express = require("express");
const { v4: uuidv4 } = require("uuid"); // Import UUID generator
const supabase = require("./db"); // Import Supabase connection
const cors = require('cors');
const { sendWelcomeEmail } = require('./emailService');
const app = express();
const PORT = process.env.PORT || 3000;


// Enable CORS for all routes
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// No need for initDB with Supabase - tables are managed in Supabase dashboard
console.log("✅ Backend connected to Supabase");

/* 🟢 Route to Insert Data into accommodation_requests */
app.post("/add-accommodation", async (req, res) => {
  try {
    let { user_id, username, accommodation_dates, gender, email_id, mobile_number, college_name } = req.body;

    // Validate user_id is provided
    if (!user_id) {
      return res.status(401).json({ 
        success: false,
        error: "User authentication required" 
      });
    }

    // Ensure accommodation_dates is an array
    if (!Array.isArray(accommodation_dates) || accommodation_dates.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: "Invalid accommodation_dates. It should be a non-empty array of dates." 
      });
    }

    // Determine if March 28 is selected
    const march_28_accommodation = accommodation_dates.includes('March 28');
    
    // 🏷️ Calculate price: ₹300 per day
    const number_of_days = accommodation_dates.length;
    const accommodation_price = number_of_days * 300;

    // Check if booking already exists for this user
    const { data: existingBooking } = await supabase
      .from('accommodation_requests')
      .select('*')
      .eq('user_id', user_id)
      .single();

    let result;
    
    if (existingBooking) {
      // User already has a booking - don't allow duplicate
      return res.status(400).json({ 
        success: false,
        alreadyBooked: true,
        message: "You have already booked accommodation"
      });
    } else {
      // Insert new booking
      const { data, error } = await supabase
        .from('accommodation_requests')
        .insert([{
          user_id: user_id,
          full_name: username,
          email: email_id,
          phone: mobile_number,
          college_name: college_name,
          gender: gender,
          march_28_accommodation,
          number_of_days,
          total_price: accommodation_price,
          payment_status: 'PENDING'
        }])
        .select();

      if (error) {
        console.error("❌ Error inserting data:", error);
        return res.status(400).json({ 
          success: false,
          error: error.message || "Failed to book accommodation" 
        });
      }
      result = data;
    }

    res.status(201).json({
      success: true,
      message: "Accommodation booked successfully!",
      data: result[0],
    });
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    res.status(500).json({ 
      success: false,
      error: error.message || "Internal Server Error" 
    });
  }
});

/* 📧 Route to Send Welcome Email */
app.post("/send-welcome-email", async (req, res) => {
  try {
    const { email, fullName } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({ error: "Email and full name are required" });
    }

    const result = await sendWelcomeEmail(email, fullName);

    if (result.success) {
      res.status(200).json({
        message: "Welcome email sent successfully!",
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        error: "Failed to send welcome email",
        details: result.error
      });
    }
  } catch (error) {
    console.error("Error sending welcome email:", error);
    res.status(500).json({ error: "Failed to send welcome email" });
  }
});

/* 🟢 Route to Fetch All Accommodation Details */
app.get("/accommodations", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('accommodation_requests')
      .select('full_name, email, phone, college_name, check_in_date, check_out_date, number_of_days, total_price, payment_status');

    if (error) throw error;

    res.status(200).json({
      message: "Fetched accommodation details successfully!",
      data: data,
    });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* 🟢 Route to Add Lunch Booking */
app.post("/add-lunch-booking", async (req, res) => {
  try {
    const { user_id, full_name, email, mobile, lunch_dates, total_price } = req.body;

    // Validate user_id
    if (!user_id) {
      return res.status(401).json({ 
        success: false,
        error: "User authentication required" 
      });
    }

    if (!lunch_dates || lunch_dates.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: "Please select at least one lunch date" 
      });
    }

    // Determine which days are selected
    const march_28_lunch = lunch_dates.includes('March 28');
    const march_29_lunch = lunch_dates.includes('March 29');
    
    // Calculate totals
    const total_lunches = lunch_dates.length;
    const calculated_price = total_lunches * 100;

    // Check if booking already exists for this user
    const { data: existingBooking } = await supabase
      .from('lunch_bookings')
      .select('*')
      .eq('user_id', user_id)
      .single();

    let result;
    
    if (existingBooking) {
      // User already has a booking - don't allow duplicate
      return res.status(400).json({ 
        success: false,
        alreadyBooked: true,
        message: "You have already booked lunch"
      });
    } else {
      // Insert new booking
      const { data, error } = await supabase
        .from('lunch_bookings')
        .insert([{
          user_id,
          full_name,
          email,
          phone: mobile,
          march_28_lunch,
          march_29_lunch,
          total_lunches,
          total_price: calculated_price,
          payment_status: 'PENDING'
        }])
        .select();
      
      if (error) throw error;
      result = data;
    }

    res.status(201).json({
      success: true,
      message: "Lunch booked successfully!",
      data: result[0]
    });
  } catch (error) {
    console.error("Error adding lunch booking:", error);
    res.status(500).json({ 
      success: false,
      error: error.message || "Failed to add lunch booking" 
    });
  }
});

/* 🟢 Route to Insert Data into contact_details */
app.post("/add-contact", async (req, res) => {
  try {
    let { username, email_id, mobile_number, message } = req.body;

    // Validate required fields
    if (!username || !email_id || !mobile_number || !message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Generate UUID for user_id
    const user_id = uuidv4();

    // Insert using Supabase
    const { data, error } = await supabase
      .from('contact_details')
      .insert([{
        user_id,
        username,
        email_id,
        mobile_number,
        message
      }])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "Contact details added successfully!",
      data: data[0],
    });
  } catch (error) {
    console.error("❌ Error inserting contact details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/contacts", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_details')
      .select('username, email_id, mobile_number, message');

    if (error) throw error;

    res.status(200).json({
      message: "Fetched contact details successfully!",
      data: data,
    });
  } catch (error) {
    console.error("❌ Error fetching contact details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* 🟢 Route to Insert Data into feedback_details */
app.post("/add-feedback", async (req, res) => {
  try {
    let { username, email_id, rating, message } = req.body;

    // Validate required fields
    if (!username || !email_id || !rating || !message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Generate UUID for feedback_id
    const feedback_id = uuidv4();

    // Insert using Supabase
    const { data, error } = await supabase
      .from('feedback_details')
      .insert([{
        feedback_id,
        username,
        email_id,
        rating,
        message
      }])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "Feedback submitted successfully!",
      data: data[0],
    });
  } catch (error) {
    console.error("❌ Error inserting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* 🟢 Route to Fetch All Feedback Details */
app.get("/feedbacks", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('feedback_details')
      .select('username, email_id, rating, message, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      message: "Fetched feedback details successfully!",
      data: data,
    });
  } catch (error) {
    console.error("❌ Error fetching feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
