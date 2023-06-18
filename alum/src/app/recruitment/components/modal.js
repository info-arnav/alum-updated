"use client";

import { useState } from "react";
import Image from "next/image";
import alumni from "../../image/alumni.png"
export default function Modal({
  type,
  data,
  email,
  mainData,
  updater,
  update,
  refresh,
  position,
}) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(type == "edit" ? data.title : "");
  const [company, setCompany] = useState(type == "edit" ? data.company : "");
  const [description, setDescription] = useState(
    type == "edit" ? data.description : ""
  );
  const [location, setLocation] = useState(type == "edit" ? data.location : "");
  const [duration, setDuration] = useState(type == "edit" ? data.duration : "");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState(type == "edit" ? data.link : "");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (type == "edit") {
      await fetch("/api/edit-recruitments", {
        method: "POST",
        body: JSON.stringify({
          id: data._id,
          email: email,
          title: title,
          company: company,
          description: description,
          location: location,
          duration: duration,
          link: link,
        }),
      }).then((e) => e.json());
      mainData[position] = {
        title: title,
        company: company,
        description: description,
        location: location,
        duration: duration,
        link: link,
      };
      updater(mainData);
      update(!refresh);
      setTitle("");
      setCompany("");
      setDescription("");
      setLink("");
      setShow(false);
      setLoading(false);
    } else {
      await fetch("/api/create-recruitment", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          title: title,
          company: company,
          description: description,
          location: location,
          duration: duration,
          link: link,
        }),
      }).then((e) => e.json());
      mainData.push({
        email: email,
        title: title,
        company: company,
        description: description,
        location: location,
        duration: duration,
        link: link,
      });
      updater(mainData);
      update(!refresh);
      setTitle("");
      setCompany("");
      setDescription("");
      setLink("");
      setShow(false);
      setLoading(false);
    }
  };
  return (
    <>
    <div className="">
      <button
        onClick={() => setShow(true)}
        className={type != "edit" && "main-button"}
      >
        {type == "edit" ? "Edit" : "New Post"}
      </button>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <Image src={alumni} width={76}/>
            {/* <div className="flex flex-col justify-center"> */}
          <form onSubmit={handleSubmit} className="">
          
            <div className="relative my-6">
            <input id="position" className="block my-2 border-2 border-[#8a8a8a] px-2.5 pb-2.5 pt-4 w-[80%] text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // placeholder="Position"
              required
            ></input>
            <label for="position" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">Position</label>
            </div>

            <div className="relative my-6">
            <input id="Company" className="block my-2 border-2 border-[#8a8a8a] px-2.5 pb-2.5 pt-4 w-[80%] text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            ></input>
            <label for="Company" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">Company</label>
            </div>
            
            <div className="relative my-6">
            <input id="Location" className="block my-2 border-2 border-[#8a8a8a] px-2.5 pb-2.5 pt-4 w-[80%] text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            ></input>
            <label for="Location" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">Location</label>
            </div>
            
            <div className="relative my-6">
            <input id = "Duration" className="block my-2 border-2 border-[#8a8a8a] px-2.5 pb-2.5 pt-4 w-[80%] text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            ></input>
            <label for="Duration" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">Duration</label>
            </div>
            
            <div className="relative my-6">
            <textarea id = "Description" className="block my-2 border-2 border-[#8a8a8a] px-2.5 pb-2.5 pt-4 w-[80%] text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <label for="Description" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 top-2 left-4">Description</label>
            </div>
            
            <div className="relative my-6">
            <input id="Link" className="block my-2 border-2 border-[#8a8a8a] px-2.5 pb-2.5 pt-4 w-[80%] text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
              value={link}
              onChange={(e) => setLink(e.target.value)}
            ></input>
            <label for="Link" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">Website link if any</label>
            </div>
            
            <button className="block m-2" type="submit" disabled={loading}>
              Save Changes
            </button>
          </form>
          {/* </div> */}
          <div className="close block m-2">
            <button onClick={() => setShow(false)}>X</button>
          </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
