import express from "express";
import bodyParser from "body-parser";
import pino from "pino";
import { createStream } from "rotating-file-stream";
import fs from "fs";
import path from "path";

import { handleSupport } from "./agents/support.js";
import { handleSales } from "./agents/sales.js";
import { handleMarketing } from "./agents/marketing.js";

const app = express();

// Rotating log stream
const logStream = createStream("ai-business-suite.log", {
  interval: "1d",
  path: "./logs",
  maxFiles: 7
});

const consoleLogger = pino({ level: "info" });
const fileLogger = pino({ level: "info" }, logStream);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // serves everything in /public

// API key middleware
function checkApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== "demo-secret-key") {
    return res.status(403).json({ error: "Forbidden: Invalid API key" });
  }
  next();
}
app.use("/admin", checkApiKey);

// Stats counters
const stats = { support: 0, sales: 0, marketing: 0 };

// Health check
app.get("/", (req, res) => res.json({ ok: true, name: "ai-business-suite" }));

// Support
app.post("/webhook/whatsapp", async (req, res) => {
  stats.support++;
  const reply = await handleSupport(req.body, "whatsapp");
  res.json({ reply });
});
app.post("/webhook/messenger", async (req, res) => {
  stats.support++;
  const reply = await handleSupport(req.body, "messenger");
  res.json({ reply });
});

// Sales
app.post("/sales/email", async (req, res) => {
  stats.sales++;
  const result = await handleSales(req.body, "email");
  res.json(result);
});
app.post("/sales/chat", async (req, res) => {
  stats.sales++;
  const result = await handleSales(req.body, "chat");
  res.json(result);
});

// Marketing
app.post("/marketing/post", async (req, res) => {
  stats.marketing++;
  const result = await handleMarketing(req.body);
  res.json(result);
});

// Admin logs (JSON)
app.get("/admin/logs", (req, res) => {
  try {
    const logFile = path.join("./logs", "ai-business-suite.log");
    if (!fs.existsSync(logFile)) return res.status(404).json({ error: "No log file found" });
    const data = fs.readFileSync(logFile, "utf8");
    const lines = data.trim().split("\n").slice(-50);
    res.json({ logs: lines });
  } catch (err) {
    res.status(500).json({ error: "Failed to read logs", details: err.message });
  }
});

// Admin logs dashboard (HTML)
app.get("/admin/logs/view", (req, res) => {
  try {
    const logFile = path.join("./logs", "ai-business-suite.log");
    if (!fs.existsSync(logFile)) return res.send("<h2>No log file found</h2>");
    const data = fs.readFileSync(logFile, "utf8");
    const lines = data.trim().split("\n").slice(-50);
    res.send(`
      <html>
        <head>
          <title>AI Business Suite Logs</title>
          <meta http-equiv="refresh" content="5">
          <style>
            body { font-family: Arial; background: #f4f4f4; padding: 20px; }
            pre { background: #fff; padding: 10px; border: 1px solid #ccc; }
            a { color: #1a73e8; text-decoration: none; }
          </style>
        </head>
        <body>
          <a href="/admin/dashboard">&larr; Back to Dashboard</a>
          <h2>Latest Logs (last 50 entries)</h2>
          <div>Auto-refresh every 5 seconds</div>
          <pre>${lines.join("\n")}</pre>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send(`<h2>Error reading logs: ${err.message}</h2>`);
  }
});

// Admin stats
app.get("/admin/stats", (req, res) => res.json({ stats }));

// Admin tools hub (HTML)
app.get("/admin/tools", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Support Tools Hub</title>
        <style>
          body { font-family: Arial; background: #f4f4f4; padding: 20px; }
          h1 { margin-bottom: 10px; }
          a { color: #1a73e8; text-decoration: none; }
          .card {
            background: #fff;
            padding: 16px;
            margin-bottom: 16px;
            border-radius: 8px;
            border: 1px solid #ddd;
          }
          .btn {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 14px;
            background: #1a73e8;
            color: #fff;
            border-radius: 4px;
          }
          .btn:hover { background: #155ab6; }
        </style>
      </head>
      <body>
        <a href="/admin/dashboard">&larr; Back to Dashboard</a>
        <h1>Support Ops Tools Hub</h1>
        <p>This hub links to your live micro-tools and the Support Ops Toolbox demo page.</p>

        <div class="card">
          <h2>Support Ops Toolbox (Full Demo Suite)</h2>
          <p>Embedded demos for SLA Breach Predictor, Ticket Tagging Auditor, and Agent Load Balancer.</p>
          <a class="btn" href="/support-ops-toolbox.html" target="_blank">Open Support Ops Toolbox</a>
        </div>

        <div class="card">
          <h2>Raw Micro-Tools (support-tools-clean)</h2>
          <p>Direct links to the standalone tools on Cloudflare Pages.</p>
          <ul>
            <li><a href="https://support-tools-clean.pages.dev/index.html" target="_blank">SLA Breach Predictor</a></li>
            <li><a href="https://support-tools-clean.pages.dev/tagging.html" target="_blank">Ticket Tagging Auditor</a></li>
            <li><a href="https://support-tools-clean.pages.dev/loadbalancer.html" target="_blank">Agent Load Balancer</a></li>
          </ul>
        </div>

        <div class="card">
          <h2>Pricing & Plans</h2>
          <p>View and share the AI Business Suite pricing page.</p>
          <a class="btn" href="/pricing.html" target="_blank">View Pricing</a>
        </div>
      </body>
    </html>
  `);
});

// Admin dashboard (HTML)
app.get("/admin/dashboard", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>AI Business Suite Dashboard</title>
        <style>
          body { font-family: Arial; background: #f4f4f4; padding: 20px; }
          h1 { margin-bottom: 5px; }
          .nav a {
            margin-right: 12px;
            text-decoration: none;
            color: #1a73e8;
            font-weight: bold;
          }
          .section {
            margin-top: 20px;
            background: #fff;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #ddd;
          }
          button {
            margin: 6px;
            padding: 8px 16px;
            background: #1a73e8;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
          }
          button:hover {
            background: #155ab6;
          }
          .small { font-size: 0.9rem; color: #555; }
        </style>
      </head>
      <body>
        <h1>AI Business Suite Admin Dashboard</h1>
        <div class="small">Use this panel to demo logs, stats, tools, and the Support Ops Toolbox.</div>

        <div class="nav">
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/tools">Tools Hub</a>
          <a href="/support-ops-toolbox.html" target="_blank">Support Ops Toolbox</a>
          <a href="/pricing.html" target="_blank">Pricing</a>
        </div>

        <div class="section">
          <h2>Quick Demo Script</h2>
          <ol>
            <li>Open <strong>Tools Hub</strong> to show micro-tools & Support Ops Toolbox.</li>
            <li>Open <strong>Logs</strong> to show transparency.</li>
            <li>Open <strong>Stats</strong> to show usage/risk tracking.</li>
            <li>Open <strong>Pricing</strong> to close the loop.</li>
          </ol>
        </div>

        <div class="section">
          <h2>Actions</h2>
          <button onclick="window.location.href='/admin/logs/view'">View Logs</button>
          <button onclick="window.location.href='/admin/stats'">View Stats (JSON)</button>
          <button onclick="window.location.href='/admin/tools'">Open Tools Hub</button>
          <button onclick="window.open('/support-ops-toolbox.html', '_blank')">Launch Support Ops Toolbox</button>
          <button onclick="window.open('/pricing.html', '_blank')">Open Pricing Page</button>
        </div>
      </body>
    </html>
  `);
});

// Start server
app.listen(3000, () => {
  consoleLogger.info("AI Business Suite running on 3000");
  fileLogger.info("AI Business Suite running on 3000");
});
