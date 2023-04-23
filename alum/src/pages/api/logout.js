export default async function logout(req, res) {
  try {
    res.setHeader(
      "Set-Cookie",
      `login_token=00110000; HttpOnly; Secure; SameSite=lax; Path=/`
    );
    res.json({ loggedOut: true });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
}
