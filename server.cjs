const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "ai-business-suite" });
});

app.post("/trial-request", async (req, res) => {
  try {
    const { email, company, team_size } = req.body;

    console.log("Received trial request:", req.body);

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const result = await resend.emails.send({
      from: "AI Business Suite <onboarding@resend.dev>",
      to: "marcdoane0116@gmail.com",
      subject: "New Trial Request",
      text: `New trial request:\n\nEmail: ${email}\nCompany: ${company || "N/A"}\nTeam Size: ${team_size || "N/A"}`
    });

       console.log("Resend response:", result);

    return res.json({ success: true, message: "Trial request submitted" });

  } catch (error) {
    console.error("Resend error in /trial-request:", error);
    return res.status(500).json({ error: "Failed to submit trial request" });
  }

});

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

