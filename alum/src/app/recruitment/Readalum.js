"use client";

import Apply from "./apply";
import Image from "next/image";
import idleimage from "../image/select.png";
import Modal from "./components/modal";
// import Loading from "../home/loading";
// import Error from "../error";
import Delete from "./components/delete";
import Link from "next/link";

const Readalum = (props) => {
  return (
    <div>
      {props.info._id ? (
        <div className="m-4">
          <div className="m-2 grid grid-cols-2">
            <div className="">
              <h1 className="font-bold text-2xl">{props.info.title}</h1>
              <h5 className="font-bold text-lg text-[#878686]">
                {props.info.company}
              </h5>
            </div>
            <div className="recruitment-box-footer sm:flex-row  flex-col">
              {/* <Link
                href={`/view/status/${props.info._id}`}
                id="status"
                className="recuit-button text-white"
              >
                Status
              </Link>
              <Modal
                type="edit"
                data={props.info}
                mainData={data}
                email={email}
                updater={setData}
                position={data.indexOf(e)}
                refresh={refresh}
                update={setRefresh}
              ></Modal>
              <Delete
                updater={setData}
                data={data}
                position={data.indexOf(e)}
                refresh={refresh}
                update={setRefresh}
                index={props.info._id}
                email={email}
              ></Delete>
              <Apply
                recruitment={props.info._id}
                user={props.email}
                profiles={props.profiles}
                setProfiles={props.setProfiles}
              ></Apply> */}
            </div>
          </div>

          <div className="m-4 md:flex md:flex-row inline justify-between align-middle">
            <div className=" p-2 md:p-0">
              <p className=" mr-2">Start Date </p>
              <p className="inline text-[#878686]">
                {props.info.deadline || "No data"}
              </p>
            </div>
            <div className=" p-2 md:p-0">
              <p className=" mr-2">Contact Email </p>
              <p className="inline text-[#878686]">
                {props.info.email || "No data"}
              </p>
            </div>
            <div className=" p-2 md:p-0">
              <p className=" mr-2">Duration </p>
              <p className="inline text-[#878686]">
                {props.info.duration || "No data"}
              </p>
            </div>
            <div className=" mr-4 p-2 md:p-0">
              <p className=" mr-2">Stipend </p>
              <p className="inline text-[#878686]">
                {props.info.stipend || "No data"}
              </p>
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
        <div className="box-border">
          <Image
            src={idleimage}
            className="p-7 w-[750px] h-[620px]"
            alt="image login"
          ></Image>
        </div>
      )}

      <div className="recruitment-box-footer sm:flex-row  flex-col">
        {/* <Link
          href={`/view/status/${props.info._id}`}
          id="status"
          className="recuit-button text-white"
        >
          Status
        </Link>
        <Modal
          type="edit"
          data={props.info}
          mainData={data}
          email={email}
          updater={setData}
          position={data.indexOf(e)}
          refresh={refresh}
          update={setRefresh}
        ></Modal>
        <Delete
          updater={setData}
          data={data}
          position={data.indexOf(e)}
          refresh={refresh}
          update={setRefresh}
          index={e._id}
          email={email}
        ></Delete> */}
      </div>
    </div>
  );
};

export default Readalum;
