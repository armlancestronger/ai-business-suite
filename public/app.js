// SUPPORT
async function callSupport() {
  const message = document.getElementById("supportInput").value;
  const res = await fetch("/webhook/whatsapp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  document.getElementById("supportOutput").innerText = data.reply;
}

// SALES EMAIL
async function callSalesEmail() {
  const body = document.getElementById("salesEmailInput").value;
  const res = await fetch("/sales/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from: "customer@example.com", body })
  });
  const data = await res.json();
  document.getElementById("salesEmailOutput").innerText = data.pitch;
}

// SALES CHAT
async function callSalesChat() {
  const message = document.getElementById("salesChatInput").value;
  const res = await fetch("/sales/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  document.getElementById("salesChatOutput").innerText = data.pitch;
}

// MARKETING
async function callMarketing() {
  const topic = document.getElementById("marketingTopic").value;
  const platform = document.getElementById("marketingPlatform").value;
  const res = await fetch("/marketing/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, platform })
  });
  const data = await res.json();
  document.getElementById("marketingOutput").innerText = data.reply;
}
