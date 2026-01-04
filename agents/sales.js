export async function handleSales(payload, channel) {
  const { email = "unknown@domain.com", name = "Prospect" } = payload;
  const pitch = `Hi ${name}, thanks for connecting! Our AI Business Suite streamlines Support, Sales, and Marketing.`;
  return { reply: `Sales Agent (${channel}) engaged with ${name} at ${email}.`, pitch };
}
