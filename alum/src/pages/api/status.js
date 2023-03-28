export default function status(req, res) {
  res.status(200).json({ working: true });
}
