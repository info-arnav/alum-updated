"use client";

import { useState } from "react";
import Register from "./register";
import Link from "next/link";

export default function Batch({ type, otp, email }) {
  const [validated, setValidated] = useState(false);
  const [phone, setPhone] = useState("");
  const [roll, setRoll] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [workStatus, setWorkStatus] = useState("");
  const [error, setError] = useState("");
  return (
    <>
      {validated ? (
        <Register
          type={type}
          otp={otp}
          email={email}
          phone={phone}
          course={course}
          department={department}
          batch={batch}
          workStatus={workStatus}
          roll={roll}
        ></Register>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (batch) {
              setError("");
              setValidated(true);
            } else {
              setError("Please choose one options from the ones provided");
            }
          }}
        >
          <div
            className="m-2 relative mb-6 w-[70%] mx-auto"
            style={{ textAlign: "left" }}
          >
            <select
              placeholder="Batch"
              style={{ marginTop: 10 }}
              required={true}
              onChange={(e) => setBatch(e.target.value)}
              className={
                "bg-[#DFE6F9] pl-10 text-lg rounded-xl w-full p-2.5 " +
                (batch == "" ? "text-gray-400" : "text-gray-900")
              }
            >
              <option disabled={true} selected={true} hidden={true}>
                Batch
              </option>
              {[
                "1980",
                "1981",
                "1982",
                "1983",
                "1984",
                "1985",
                "1986",
                "1987",
                "1988",
                "1989",
                "1990",
                "1991",
                "1992",
                "1993",
                "1994",
                "1995",
                "1996",
                "1997",
                "1998",
                "1999",
                "2000",
                "2001",
                "2002",
                "2003",
                "2004",
                "2005",
                "2006",
                "2007",
                "2008",
                "2009",
                "2010",
                "2011",
                "2012",
                "2013",
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2021",
                "2022",
                "2023",
                "2024",
                "2025",
                "2026",
                "2027",
              ].map((e) => (
                <option className="text-gray-900">{e}</option>
              ))}
            </select>
          </div>
          <div className="text-red-600">{error && error}</div>
          <button
            // onClick={}
            type="submit"
            className=" mb-10 m-4 w-[70%] text-white bg-[#00183F] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-lg rounded-xl text-md px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 form-button-hover"
            style={{ marginBottom: 10 }}
          >
            Choose Password
          </button>
          <Link href="/login">
            <div className="text-black-600" style={{ marginTop: 10 }}>
              Already registered ? Login Now
            </div>
          </Link>
        </form>
      )}
    </>
  );
}
