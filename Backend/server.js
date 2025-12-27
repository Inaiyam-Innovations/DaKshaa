const express = require("express");
const { v4: uuidv4 } = require("uuid"); // Import UUID generator
const supabase = require("./db"); // Import Supabase connection
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;


// Enable CORS for all routes
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// No need for initDB with Supabase - tables are managed in Supabase dashboard
console.log("✅ Backend connected to Supabase");

/* 🟢 Route to Insert Data into accommodation_details */
app.post("/add-accommodation", async (req, res) => {
  try {
    let { username, accommodation_dates, gender, email_id, mobile_number, college_name } = req.body;

    // Ensure accommodation_dates is an array
    if (!Array.isArray(accommodation_dates) || accommodation_dates.length === 0) {
      return res.status(400).json({ error: "Invalid accommodation_dates. It should be a non-empty array of dates." });
    }

    // 🏷️ Calculate price: ₹300 per day
    const accommodation_price = accommodation_dates.length * 300;

    // Insert using Supabase
    const { data, error } = await supabase
      .from('accommodation_details')
      .insert([{
        username,
        accommodation_dates,
        gender,
        accommodation_price,
        email_id,
        mobile_number,
        college_name
      }])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "Accommodation added successfully!",
      data: data[0],
    });
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* 🟢 Route to Fetch All Accommodation Details */
app.get("/accommodations", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('accommodation_details')
      .select('username, email_id, mobile_number, gender, accommodation_dates, accommodation_price');

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
