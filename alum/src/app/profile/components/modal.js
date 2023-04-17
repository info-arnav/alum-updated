"use client";

import { useEffect, useState } from "react";
import arrayBuilder from "./arrayBuilder";
import EditPortfolio from "./editPortfolio";

export default function Modal({
  email,
  data,
  setRefresh,
  refresh,
  type,
  edit,
  location,
  setData,
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
          setData={setData}
          location={location}
          placeholder={arrayBuilder(type)}
        ></EditPortfolio>
      )}
    </>
  );
}
