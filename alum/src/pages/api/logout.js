export default function logout(req, res) {
  res.setHeader(
    "Set-Cookie",
    `login_token=; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=lax; Path=/`
  );
  res.json({ loggedOut: true });
}
