import Cookies from "universal-cookie";

export default async function Logout() {
  let cookies = new Cookies();
  await fetch("/api/logout", {
    method: "POST",
    body: JSON.stringify({}),
  })
    .then((e) =>
      cookies.remove("session_id", {
        path: "/",
      })
    )
    .then(() => location.reload());
}
