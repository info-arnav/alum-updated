"use client";

import { useState } from "react";

export default function Delete({
  updater,
  position,
  refresh,
  update,
  data,
  index,
  email,
}) {
  const [disabled, setDisabled] = useState(false);
  const deleteData = async () => {
    setDisabled(true);
    data.splice(position, 1);
    await fetch("/api/delete-recruitment", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        id: index,
      }),
    }).then((e) => e.json());
    updater(data);
    setDisabled(false);
    update(!refresh);
  };
  return (
    <button className="recuit-button" onClick={deleteData} disabled={disabled}>
      Delete
    </button>
  );
}
