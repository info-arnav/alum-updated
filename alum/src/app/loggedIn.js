import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function LoggedIn() {
  const cookieStore = cookies();
  try {
    const payload = jwt.verify(
      cookieStore.get("User").value,
      process.env.SECRET
    );
    return { loggedIn: true, data: payload };
  } catch {
    return { loggedIn: false };
  }
}
