"use client";

import { useEffect, useState } from "react";
import Apply from "../view/recruitment/[id]/apply";
import Image from "next/image";
import idleimage from "../image/select.png";

const Read = (props) => {
  const [applicants, setApplicants] = useState(
    props.info.applicants != null ? props.info.applicants : []
  );
  useEffect(() => {}, [applicants]);
  return (
    <div>
      {props.info._id ? (
        <div className="m-4">
          <div className="m-2 grid grid-cols-2">
            <div className="">
              <h1 className="font-bold text-2xl">{props.info.title}</h1>
              <h5 className="font-bold text-lg">{props.info.company}</h5>
            </div>
            <div className="recruitment-box-footer">
              <Apply
                recruitment={props.info._id}
                user={props.email}
                applicants={props}
                setApplicants={props.setData}
              ></Apply>
            </div>
          </div>

          <div className="m-4 flex flex-row justify-between align-middle">
            <div className="">
              <p className=" mr-2">Start Date </p>
              <p className="inline">{props.info.startDate || "No data"}</p>
            </div>
            <div className="">
              <p className=" mr-2">Duration </p>
              <p className="inline">{props.info.duration || "No data"}</p>
            </div>
            <div className=" mr-4">
              <p className=" mr-2">Stipend </p>
              <p className="inline">{props.info.Stipend || "No data"}</p>
            </div>
          </div>

          <hr />

          <div className="m-2">
            <h5 className="font-bold">About the Internship</h5>
            <p
              dangerouslySetInnerHTML={{
                __html: `<p></p>
                ${props.info.description}`,
              }}
            ></p>
          </div>
        </div>
      ) : (
        <div>
          <Image
            src={idleimage}
            className="p-8"
            width={750}
            height={750}
            alt="image login"
          ></Image>
        </div>
      )}
    </div>
  );
};

export default Read;
