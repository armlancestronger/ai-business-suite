export async function handleSupport(payload, channel) {
  const { from = "unknown", message = "" } = payload;
  const t = message.toLowerCase();
  if (t.includes("order")) return `Support Agent (${channel}): Your order is being processed.`;
  if (t.includes("hours")) return `Support Agent (${channel}): We’re open Mon–Fri, 8am–6pm CST.`;
  return `Support Agent (${channel}) received from ${from}: "${message}"`;
}
