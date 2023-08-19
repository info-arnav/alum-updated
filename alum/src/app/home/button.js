"use client";

import { useState } from "react";

export default function Button({ process, e, data }) {
  const [disabled, setDisabled] = useState(false);
  return (
    <center>
      <button
        style={{
          backgroundColor: "lightgreen",
          padding: 2,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 20,
          margin: 10,
          fontWeight: "lighter",
          fontSize: 14,
        }}
        onClick={() => {
          setDisabled(true);
          process("approve", data.indexOf(e), e.email).then((e) =>
            setDisabled(false)
          );
        }}
      >
        {disabled ? "processing..." : "Approve"}
      </button>
      <button
        style={{
          backgroundColor: "red",
          padding: 2,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 20,
          margin: 10,
          fontWeight: "lighter",
          fontSize: 14,
        }}
        onClick={() => {
          setDisabled(true);
          process("reject", data.indexOf(e), e.email).then((e) =>
            setDisabled(false)
          );
        }}
      >
        {disabled ? "processing..." : "Reject"}
      </button>
    </center>
  );
}
