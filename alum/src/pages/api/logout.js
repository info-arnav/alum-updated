export default async function login(req, res) {
  try {
    res.setHeader(
      "Set-Cookie",
      `login_token=${process.env.SESSION_REMOVE}; expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly; Path=/;  Domain=${process.env.SESSION_URL}`
    );
    res.json({ loggedOut: true });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
