export default function logout(req, res) {
  res.setHeader(
    "Set-Cookie",
    `login_token=00110000; HttpOnly; Secure; SameSite=lax; Path=/`
  );
  res.json({ loggedOut: true });
}
