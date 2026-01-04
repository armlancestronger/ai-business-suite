export async function handleMarketing(payload) {
  const { platform = "facebook", message = "" } = payload;
  const formatted = `[${platform.toUpperCase()} POST] ${message}`;
  return { reply: `Marketing Agent posted to ${platform}: "${formatted}"` };
}
