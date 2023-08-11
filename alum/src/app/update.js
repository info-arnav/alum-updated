"use client";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import UpdateNotification from "./update-notification";

export default function Update({ email, oldData }) {
  let cookies = new Cookies();
  const [show, setShow] = useState(false);
  const fetchData = async () => {
    let data = await fetch("/api/update-info", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    }).then((e) => e.json());
    if (!data.loggedIn) {
      cookies.remove("session_id", {
        path: "/",
      });
      location.reload();
    } else {
      oldData.verified = `${oldData.verified}`;
      if (
        data.newData.email != oldData.email ||
        data.newData.verified != oldData.verified ||
        data.newData.type != oldData.type
      ) {
        cookies.set("session_id", data.key, {
          secure: true,
          sameSite: "lax",
          path: "/",
        });
        setShow(true);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>{show && <UpdateNotification></UpdateNotification>}</div>;
}
