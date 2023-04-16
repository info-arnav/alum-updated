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
  location,
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {}, [show]);
  return (
    <>
      <button onClick={() => setShow(true)}>{edit ? "Edit" : "Add new"}</button>
      {show && (
        <EditPortfolio
          email={email}
          data={data}
          setRefresh={setRefresh}
          refresh={refresh}
          show={setShow}
          type={type}
          edit={edit}
          location={location}
        ></EditPortfolio>
      )}
    </>
  );
}
