export default async function logout(req, res) {
  try {
    res.setHeader(
      "Set-Cookie",
      `login_token=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; HttpOnly; Secure; SameSite=lax; Path=/`
    );
    res.json({ loggedOut: true });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
