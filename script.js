// Helper to safely get an element by ID
function byId(id) {
  return typeof document !== "undefined" ? document.getElementById(id) : null;
}

// Helper to set output text if the element exists
function setOutput(elementId, text) {
  var el = byId(elementId);
  if (!el) return;
  el.textContent = text;
}

// Support demo
function callSupport() {
  var inputEl = byId("supportInput");
  var message = inputEl ? inputEl.value.trim() : "";

  if (!inputEl || !byId("supportOutput")) {
    // Required elements are missing — fail silently.
    return;
  }

  if (!message) {
    setOutput("supportOutput", "Please enter a support message.");
    return;
  }

  var response =
    "Support Response: We've logged your issue and will follow up shortly. " +
    "In production, this would trigger SLA tracking, routing to the correct queue, and live status updates.";

  setOutput("supportOutput", response);
}

// Sales Email demo
function callSalesEmail() {
  var inputEl = byId("salesEmailInput");
  var message = inputEl ? inputEl.value.trim() : "";

  if (!inputEl || !byId("salesEmailOutput")) {
    return;
  }

  if (!message) {
    setOutput("salesEmailOutput", "Please enter an email message.");
    return;
  }

  var generatedEmail =
    "Sales Email Response: Here's a polished outreach email based on your input:\n\n" +
    "Hi there,\n\n" +
    "I saw that your team is exploring ways to streamline your workflows. " +
    "AI Business Suite helps automate support, sales, and marketing so your team can focus on high-impact work. " +
    "Would you be open to a quick walkthrough this week?\n\n" +
    "Best,\nThe AI Business Suite Team";

  setOutput("salesEmailOutput", generatedEmail);
}

// Sales Chat demo
function callSalesChat() {
  var inputEl = byId("salesChatInput");
  var message = inputEl ? inputEl.value.trim() : "";

  if (!inputEl || !byId("salesChatOutput")) {
    return;
  }

  if (!message) {
    setOutput("salesChatOutput", "Please enter a chat message.");
    return;
  }

  var response =
    "Sales Chat Response: Here's an optimized chat reply to engage the lead:\n\n" +
    "“Great question! Teams use AI Business Suite to coordinate support, sales, and marketing in one place, " +
    "so nothing falls through the cracks. I can show you how it would look for your workflow if you have a few minutes.”";

  setOutput("salesChatOutput", response);
}

// Marketing demo
function callMarketing() {
  var topicEl = byId("marketingTopic");
  var platformEl = byId("marketingPlatform");
  var topic = topicEl ? topicEl.value.trim() : "";
  var platform = platformEl ? platformEl.value : "LinkedIn";

  if (!topicEl || !platformEl || !byId("marketingOutput")) {
    return;
  }

  if (!topic) {
    setOutput("marketingOutput", "Please enter a marketing topic.");
    return;
  }

  var response =
    "Marketing Post: Here's a suggested " +
    platform +
    " post for \"" +
    topic +
    "\":\n\n" +
    "“We're leveling up how modern teams work. With AI Business Suite, support, sales, and marketing finally share one " +
    "AI-powered workspace. From faster responses to smarter campaigns, everything is orchestrated end-to-end. " +
    "#AIBusinessSuite #Automation”";

  setOutput("marketingOutput", response);
}