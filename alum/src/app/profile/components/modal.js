"use client";

import { useEffect, useState } from "react";
import EditPortfolio from "./editPortfolio";

export default function Modal({
  email,
  data,
  setRefresh,
  refresh,
  type,
  edit,
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {}, [show]);
  return (
    <>
      <button onClick={() => setShow(true)}>Add new</button>
      {show && (
        <EditPortfolio
          email={email}
          data={data}
          setRefresh={setRefresh}
          refresh={refresh}
          show={setShow}
          type={type}
          edit={edit}
        ></EditPortfolio>
      )}
    </>
  );
}
