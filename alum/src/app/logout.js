import Cookies from "universal-cookie";

export default async function Logout() {
  let cookies = new Cookies();
  await fetch("/api/logout").then((e) => cookies.remove("User"));
}
