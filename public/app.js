async function callSupport() {
  const input = document.getElementById("supportInput");
  const output = document.getElementById("supportOutput");
  if (!input || !output) return;

  const message = input.value.trim();
  if (!message) {
    output.textContent = "Please enter a support message.";
    return;
  }

  output.textContent = "Running support automation...";

  try {
    const res = await fetch("/webhook/whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    output.textContent = data.reply || "No response from support endpoint.";
  } catch (err) {
    output.textContent = "Error calling support endpoint.";
  }
}

async function callSalesEmail() {
  const input = document.getElementById("salesEmailInput");
  const output = document.getElementById("salesEmailOutput");
  if (!input || !output) return;

  const message = input.value.trim();
  if (!message) {
    output.textContent = "Please enter a sales email context.";
    return;
  }

  output.textContent = "Generating sales email...";

  try {
    const res = await fetch("/sales/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    output.textContent = data.reply || "No response from sales email endpoint.";
  } catch (err) {
    output.textContent = "Error calling sales email endpoint.";
  }
}

async function callSalesChat() {
  const input = document.getElementById("salesChatInput");
  const output = document.getElementById("salesChatOutput");
  if (!input || !output) return;

  const message = input.value.trim();
  if (!message) {
    output.textContent = "Please enter a sales chat message.";
    return;
  }

  output.textContent = "Generating sales chat reply...";

  try {
    const res = await fetch("/sales/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    output.textContent = data.reply || "No response from sales chat endpoint.";
  } catch (err) {
    output.textContent = "Error calling sales chat endpoint.";
  }
}

async function callMarketing() {
  const topicInput = document.getElementById("marketingTopic");
  const platformSelect = document.getElementById("marketingPlatform");
  const output = document.getElementById("marketingOutput");
  if (!topicInput || !platformSelect || !output) return;

  const topic = topicInput.value.trim();
  const platform = platformSelect.value;

  if (!topic) {
    output.textContent = "Please enter a marketing topic.";
    return;
  }

  output.textContent = "Generating marketing content...";

  try {
    const res = await fetch("/marketing/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, platform })
    });

    const data = await res.json();
    output.textContent = data.reply || "No response from marketing endpoint.";
  } catch (err) {
    output.textContent = "Error calling marketing endpoint.";
  }
}
