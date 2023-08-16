"use client";

import Loading from "@/app/home/loading";
import { useEffect, useRef, useState } from "react";
import Table_Content from "./Table_Content";
import OtherUserProfile from "../../profile/[id]/otherUserProfile";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Applicants({ email, id, link }) {
  let pdfRef = useRef();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [compData, setCompData] = useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [recruitsArray, setRecruitsArray] = useState([]);
  const [otherArray, setOtherArray] = useState([]);
  const fetcher = async () => {
    const tempData = await fetch(`/api/get-recruiteds-status`, {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        auth_email: email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    if (tempData.data.data.recruiteds[0].email == email) {
      let updatedData =
        tempData.data.data.recruiteds[0].applicants == null
          ? []
          : tempData.data.data.recruiteds[0].applicants;
      setOtherArray([...updatedData]);
      setData(updatedData);
      setLoading(false);
    } else {
      location.replace("/");
    }
  };
  useEffect(() => {
    fetcher();
  }, []);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {" "}
          {show && (
            <div className="modal">
              <div
                className="modal-content"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "calc(100% - 20px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "black",
                      color: "white",
                      margin: 20,
                      borderRadius: 20,
                      padding: 2,
                    }}
                    onClick={(e) => {
                      const input = pdfRef.current;
                      html2canvas(input, { allowTaint: true }).then(function (
                        canvas
                      ) {
                        var imgData = canvas.toDataURL("image/jpeg");
                        var HTML_Width = canvas.width;
                        var HTML_Height = canvas.height;
                        var top_left_margin = 15;
                        var PDF_Width = HTML_Width + top_left_margin * 2;
                        var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
                        var canvas_image_width = HTML_Width;
                        var canvas_image_height = HTML_Height;
                        var totalPDFPages =
                          Math.ceil(HTML_Height / PDF_Height) - 1;
                        canvas.getContext("2d");
                        var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
                        pdf.addImage(
                          imgData,
                          "JPG",
                          top_left_margin,
                          top_left_margin,
                          canvas_image_width,
                          canvas_image_height
                        );

                        for (var i = 1; i <= totalPDFPages; i++) {
                          pdf.addPage([PDF_Width, PDF_Height]);
                          pdf.addImage(
                            imgData,
                            "JPG",
                            top_left_margin,
                            -(PDF_Height * i) + top_left_margin * 4,
                            canvas_image_width,
                            canvas_image_height
                          );
                        }

                        pdf.save(`${compData.data._id}.pdf`);
                      });
                    }}
                  >
                    Download
                  </button>
                  <div
                    id="printable"
                    style={{
                      border: "solid black",
                      borderRadius: 20,
                      overflow: "hidden",
                      width: "100%",
                    }}
                  >
                    <div ref={pdfRef}>
                      <OtherUserProfile
                        id={compData.data._id}
                        link={link}
                        userData={compData.data}
                      ></OtherUserProfile>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    document
                      .querySelector("body")
                      .classList.remove("no-scroll");
                    setShow(false);
                  }}
                  id="edit-close"
                  className="form-close"
                >
                  X
                </button>
              </div>
            </div>
          )}
          <center>
            <p
              style={{
                margin: 10,
                marginTop: 20,
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              Accepted Candidates
            </p>
          </center>
          <div
            className=" overflow-x-auto shadow-md sm:rounded-lg"
            style={{
              margin: 10,
              marginTop: 20,
              boxShadow: "0px 0px 2px 1px grey",
            }}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                {data.length ? (
                  data.map((e) => {
                    return (
                      <div key={e}>
                        <Table_Content
                          key={e}
                          info={{
                            email: e,
                            resume: async () => {
                              const res = await fetch(`/api/get-user-info`, {
                                method: "POST",
                                body: JSON.stringify({
                                  auth_email: email,
                                  email: e,
                                }),
                                cache: "no-cache",
                              })
                                .then((e) => e.json())
                                .then((res) => {
                                  [
                                    [res.data.education, "education"],
                                    [res.data.occupation, "occupation"],
                                    [res.data.projects, "projects"],
                                    [res.data.honors, "honors"],
                                    [res.data.applications, "applications"],
                                  ].forEach((e) => {
                                    try {
                                      res.data[e[1]] = JSON.parse(e[0]);
                                    } catch {
                                      res.data[e[1]] = [];
                                    }
                                  });
                                  return res;
                                })
                                .then((e) => {
                                  document
                                    .querySelector("body")
                                    .classList.add("no-scroll");
                                  setShow(true);
                                  setCompData(e);
                                });
                            },
                          }}
                          recruitsArray={recruitsArray}
                          setRecruitsArray={setRecruitsArray}
                          otherArray={otherArray}
                          setOtherArray={setOtherArray}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div>No Applicants</div>
                )}{" "}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
