import { cookies } from "next/headers";
import CryptoJS from "crypto-js";

export default function LoggedIn() {
  const cookieStore = cookies();
  try {
    const data = CryptoJS.AES.decrypt(
      cookieStore.get("session_id").value,
      process.env.SECRET
    );
    const middleData = data.toString(CryptoJS.enc.Utf8);
    const payload = JSON.parse(middleData);
    if (payload) {
      payload.verified = Boolean(payload.verified == "true");
      return { loggedIn: true, data: payload };
    } else {
      return { loggedIn: false };
    }
  } catch {
    return { loggedIn: false };
  }
}
