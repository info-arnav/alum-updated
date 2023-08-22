"use client";

import Compressor from "compressorjs";
import { useEffect, useState } from "react";

export default function Docs({ data }) {
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState("");
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [image, setImage] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [updated, setUpdated] = useState("");
  const [errorData, setErrorData] = useState("");
  const [phone, setPhone] = useState("");
  const [roll, setRoll] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [workStatus, setWorkStatus] = useState("");
  const base64Converter = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = function () {
        setImageError("");
        setImage(reader.result);
      };
      reader.onerror = function (error) {
        setImageError("Some error occured uploading the image.");
      };
    } catch {
      setImageError("Some error occured uploading the image.");
    }
  };
  const imageHandler = (e) => {
    const image = e.target.files[0];
    try {
      new Compressor(image, {
        quality: 0.2,

        success: (compressedResult) => {
          base64Converter(compressedResult);
        },
      });
    } catch {
      setImageError("Some error occured uploading the image.");
    }
  };
  const handleSubmit = async (e) => {
    setUpdated(false);
    setImageError(false);
    setProcessing(true);
    const res = await fetch(`/api/set-doc`, {
      method: "POST",
      body: JSON.stringify({
        email: data.data.email,
        files: image ? image : doc,
        phone: phone,
        course: course,
        department: department,
        batch: batch,
        work_status: workStatus,
        roll: roll,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    if (res.error) {
      setUpdated(false);
      setImageError("Some error occured");
      setProcessing(false);
    } else {
      setDoc(res.data);
      setPhone(res.phone);
      setRoll(res.roll);
      setCourse(res.course);
      setDepartment(res.department);
      setBatch(res.batch);
      setWorkStatus(res.work_status);
      setErrorData(res.error_data);
      setImage("");
      setImageError(false);
      setUpdated(true);
      setProcessing(false);
    }
  };
  useEffect(() => {
    const getDoc = async () => {
      const res = await fetch(`/api/get-doc`, {
        method: "POST",
        body: JSON.stringify({
          email: data.data.email,
        }),
        cache: "no-cache",
      }).then((e) => e.json());
      if (res.error) {
        setError(true);
        setLoading(false);
      } else {
        setDoc(res.data);
        setPhone(res.phone);
        setRoll(res.roll);
        setCourse(res.course);
        setDepartment(res.department);
        setBatch(res.batch);
        setWorkStatus(res.work_status);
        setError(false);
        setErrorData(res.error_data);
        setLoading(false);
      }
    };
    getDoc();
  }, []);
  return (
    <div className="docs">
      {loading ? (
        <div className="loading"></div>
      ) : error ? (
        <div className="image-error">Some error occured</div>
      ) : (
        <>
          {doc ? (
            <img
              src={doc}
              width={200}
              alt="Verification document uploaded by user"
            ></img>
          ) : (
            <div>No documents uploaded</div>
          )}
          <p style={{ marginTop: 20, color: "red" }}>{errorData}</p>
        </>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (course && department && batch && workStatus) {
            setError("");
            handleSubmit();
          } else {
            setError("Please choose one options from the ones provided");
          }
        }}
      >
        <div
          className="row docs-row"
          style={{
            display: "flex",
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="m-2 relative mb-6 w-[70%] mx-auto"
            style={{ textAlign: "left", margin: 10 }}
          >
            <input
              type="text"
              className="bg-[#F5F4F7] pl-10 text-lg text-gray-900  rounded-xl w-full p-2.5 "
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div
            className="m-2 relative mb-6 w-[70%] mx-auto"
            style={{ textAlign: "left", margin: 10 }}
          >
            <input
              type="text"
              className="bg-[#F5F4F7] pl-10 text-lg text-gray-900  rounded-xl w-full p-2.5 "
              placeholder="Roll Number - Optional"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            ></input>
          </div>
          <div
            className="m-2 relative mb-6 w-[70%] mx-auto"
            style={{ textAlign: "left", margin: 10 }}
          >
            <select
              placeholder="Batch"
              required={true}
              onChange={(e) => setBatch(e.target.value)}
              className="bg-[#F5F4F7] pl-10 text-lg text-gray-900  rounded-xl w-full p-2.5 "
            >
              {batch ? (
                <option selected={true}>{batch}</option>
              ) : (
                <option
                  disabled={true}
                  selected={true}
                  hidden={true}
                  className="text-gray-400"
                ></option>
              )}
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
                <option>{e}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row  docs-row" style={{ display: "flex", margin: 10 }}>
          <div
            className="m-2 relative mb-6 w-[70%] mx-auto"
            style={{ textAlign: "left", margin: 10 }}
          >
            <select
              placeholder="Course"
              style={{ marginTop: 10 }}
              required
              onChange={(e) => setCourse(e.target.value)}
              className="bg-[#F5F4F7] pl-10 text-lg text-gray-900  rounded-xl w-full p-2.5 "
            >
              {course ? (
                <option selected={true}>{course}</option>
              ) : (
                <option
                  disabled={true}
                  selected={true}
                  hidden={true}
                  className="text-gray-400"
                ></option>
              )}
              {["Undergraduate", "Masters", "Doctorate"].map((e) => (
                <option>{e}</option>
              ))}
            </select>
          </div>
          <div
            className="m-2 relative mb-6 w-[70%] mx-auto"
            style={{ textAlign: "left", margin: 10 }}
          >
            <select
              placeholder="Department"
              style={{ marginTop: 10 }}
              required
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-[#F5F4F7] pl-10 text-lg text-gray-900  rounded-xl w-full p-2.5 "
            >
              {department ? (
                <option selected={true}>{department}</option>
              ) : (
                <option
                  disabled={true}
                  selected={true}
                  hidden={true}
                  className="text-gray-400"
                ></option>
              )}
              {[
                "Computer Science",
                "Information Technology",
                "Electronics and Communication",
                "Electrical and Electronics",
                "Mechanical",
                "Civil",
                "Chemical",
                "Biotech",
                "BBA",
                "B.Arch",
                "B.Design",
                "Other/M.Sc/PHD",
              ].map((e) => (
                <option>{e}</option>
              ))}
            </select>
          </div>
          <div
            className="m-2 relative mb-6 w-[70%] mx-auto"
            style={{ textAlign: "left", margin: 10 }}
          >
            <select
              placeholder="Occupation Status"
              style={{ marginTop: 10 }}
              required
              onChange={(e) => setWorkStatus(e.target.value)}
              className="bg-[#F5F4F7] pl-10 text-lg text-gray-900  rounded-xl w-full p-2.5 "
            >
              {workStatus ? (
                <option selected={true}>{workStatus}</option>
              ) : (
                <option
                  disabled={true}
                  selected={true}
                  hidden={true}
                  className="text-gray-400"
                ></option>
              )}
              {[
                "Pursuing Degree",
                "Working",
                "Higher Studies",
                "Buisiness",
                "Other",
              ].map((e) => (
                <option>{e}</option>
              ))}
            </select>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={imageHandler}
            style={{ display: "none" }}
            id="file-verify-upload"
          ></input>
        </div>
        <button
          style={{
            backgroundColor: "#00183F",
            color: "white",
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 20,
            marginBottom: 20,
          }}
          type="button"
          onClick={() => document.getElementById("file-verify-upload").click()}
        >
          Select New File
        </button>
        {image ? (
          <img
            src={image}
            width={200}
            alt="Verification document uploaded by user"
          ></img>
        ) : (
          <p>No files selected</p>
        )}
        <p
          style={{
            marginTop: 10,
            color: "red",
          }}
        >
          {imageError}
        </p>
        <p
          style={{
            marginTop: 10,
            color: "green",
          }}
        >
          {updated && "Updated"}
        </p>
        <button
          disabled={processing}
          type="submit"
          style={{
            backgroundColor: "#00183F",
            color: "white",
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 20,
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          {processing ? "Updating....." : "Update"}
        </button>
      </form>
    </div>
  );
}
