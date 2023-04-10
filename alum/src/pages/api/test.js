import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import cookie from "cookie";

export default async function login(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const mid_password = CryptoJS.AES.decrypt(cookies.User, process.env.SECRET);
  const password = mid_password.toString(CryptoJS.enc.Utf8);
  res.json(password);
}
