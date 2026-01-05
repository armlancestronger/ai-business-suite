const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public
app.use(express.static(path.join(__dirname, "public")));

/**
 * =========================
 *  CORE API ENDPOINTS
 * =========================
 */

app.post("/webhook/whatsapp", async (req, res) => {
  try {
    const { message } = req.body;
    const reply = `Support automation received: ${message || "No message provided"}`;
    return res.json({ reply });
  } catch (err) {
    console.error("Support webhook error:", err);
    return res.status(500).json({ error: "Support webhook failed" });
  }
});

app.post("/sales/email", async (req, res) => {
  try {
    const { message } = req.body;
    const reply = `Sales email suggestion for: ${message || "No message provided"}`;
    return res.json({ reply });
  } catch (err) {
    console.error("Sales email error:", err);
    return res.status(500).json({ error: "Sales email failed" });
  }
});

app.post("/sales/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const reply = `Sales chat response for: ${message || "No message provided"}`;
    return res.json({ reply });
  } catch (err) {
    console.error("Sales chat error:", err);
    return res.status(500).json({ error: "Sales chat failed" });
  }
});

app.post("/marketing/post", async (req, res) => {
  try {
    const { topic, platform } = req.body;
    const reply = `Marketing idea for ${platform || "general"} on: ${topic || "No topic provided"}`;
    return res.json({ reply });
  } catch (err) {
    console.error("Marketing error:", err);
    return res.status(500).json({ error: "Marketing endpoint failed" });
  }
});

/**
 * =========================
 *  TRIAL REQUEST ENDPOINT
 * =========================
 */

app.post("/trial-request", async (req, res) => {
  try {
    const { email, company, team_size } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "marcdoane0116@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: "AI Business Suite <marcdoane0116@gmail.com>",
      to: "marcdoane0116@gmail.com",
      subject: "New Trial Request — AI Business Suite",
      text: `
A new trial request has been submitted:

Email: ${email}
Company: ${company || "N/A"}
Team Size: ${team_size || "N/A"}

Submitted at: ${new Date().toLocaleString()}
      `
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Trial request submitted successfully" });
  } catch (err) {
    console.error("Trial request error:", err);
    return res.status(500).json({ error: "Failed to submit trial request" });
  }
});

/**
 * =========================
 *  ROUTES
 * =========================
 */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/pricing.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pricing.html"));
});

app.get("/support-ops-toolbox.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "support-ops-toolbox.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
