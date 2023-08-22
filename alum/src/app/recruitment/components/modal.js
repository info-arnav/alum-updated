"use client";

import { useState } from "react";
import Editor from "../../components/Editor";
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
  const [stipend, setStipend] = useState(type == "edit" ? data.stipend : "");
  const [title, setTitle] = useState(type == "edit" ? data.title : "");
  const [company, setCompany] = useState(type == "edit" ? data.company : "");
  const [description, setDescription] = useState(
    type == "edit" ? data.description : ""
  );
  const [location, setLocation] = useState(type == "edit" ? data.location : "");
  const [duration, setDuration] = useState(type == "edit" ? data.duration : "");
  const [deadline, setDeadline] = useState(type == "edit" ? data.deadline : "");
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
          stipend: stipend,
          deadline: deadline,
        }),
      }).then((e) => e.json());
      mainData[position] = {
        title: title,
        company: company,
        description: description,
        location: location,
        duration: duration,
        stipend: stipend,
        deadline: deadline,
        link: link,
      };
      updater(mainData);
      update(!refresh);
      setTitle("");
      setCompany("");
      setDescription("");
      setStipend("");
      setDuration("");
      setDeadline("");
      setLink("");
      document.querySelector("body").classList.remove("no-scroll");
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
          stipend: stipend,
          deadline: deadline,
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
        stipend: stipend,
        deadline: deadline,
      });
      updater(mainData);
      update(!refresh);
      setTitle("");
      setCompany("");
      setDescription("");
      setDeadline("");
      setLink("");
      setDuration("");
      setStipend("");
      document.querySelector("body").classList.remove("no-scroll");
      setShow(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <button
          onClick={() => {
            document.querySelector("body").classList.add("no-scroll");
            setShow(true);
          }}
          className={type == "edit" ? "recuit-button" : "main-button"}
        >
          {type == "edit" ? "Edit" : "New Post"}
        </button>
        {show && (
          <div className="modal">
            <div className="modal-content">
              <section className="py-8 px-4 mx-auto max-w-3xl lg:py-14">
                <h2 className="text-2xl font-bold">
                  {type == "edit" ? "Edit Post" : "New Post"}
                </h2>
                <hr className="mb-14 h-0.5" />
                <form onSubmit={handleSubmit} className="">
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7">
                    <div className="sm:col-span-2 relative">
                      <input
                        id="position"
                        className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      ></input>
                      <label
                        htmlFor="position"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                      >
                        Position
                      </label>
                    </div>

                    <div className="w-full relative">
                      <input
                        id="Company"
                        className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                      ></input>
                      <label
                        htmlFor="Company"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                      >
                        Company
                      </label>
                    </div>

                    <div className="w-full relative">
                      <input
                        id="Location"
                        className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      ></input>
                      <label
                        htmlFor="Location"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                      >
                        Location
                      </label>
                    </div>

                    <div className="w-full relative">
                      <input
                        id="Duration"
                        className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                      ></input>
                      <label
                        htmlFor="Duration"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                      >
                        Duration
                      </label>
                    </div>

                    <div className="w-full relative">
                      <input
                        id="Link"
                        className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      ></input>
                      <label
                        htmlFor="Link"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                      >
                        Website link if any
                      </label>
                    </div>

                    {/* <div className="sm:col-span-2 relative">
                        <textarea
                          id="Description"
                          rows="8"
                          className="block p-2.5 w-full border-2 border-[#8a8a8a] text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        ></textarea>
                        <label
                          htmlFor="Description"
                          className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 top-2 left-4"
                        >
                          Description
                        </label>
                      </div> */}

                    <div className="w-full relative">
                      <input
                        id="stipend"
                        className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={stipend}
                        onChange={(e) => setStipend(e.target.value)}
                        required
                      ></input>
                      <label
                        htmlFor="stipend"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                      >
                        Stipend
                      </label>
                    </div>

                    <div className="w-full relative">
                      <input
                        id="deadline"
                        className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        type="date"
                        value={deadline}
                        onChange={(e) => {
                          setDeadline(e.target.value);
                        }}
                        required
                      ></input>
                      <label
                        htmlFor="deadline"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                      >
                        deadline
                      </label>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="Description"
                        className="block mb-2 text-sm font-medium text-gray-500"
                      >
                        Description
                      </label>
                      <Editor
                        id="Description"
                        rows="8"
                        className="block p-2.5 w-full border-2 border-gray-500 text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add more details..."
                        value={description}
                        setValue={setDescription}
                        required
                      ></Editor>
                    </div>
                  </div>
                  <button
                    id="edit-post"
                    className="form-post"
                    type="submit"
                    disabled={loading}
                  >
                    <div className="svg-wrapper-1">
                      <div className="svg-wrapper">
                        <svg
                          height="22"
                          width="22"
                          viewBox="0 0 22 22"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <span>Post</span>
                  </button>
                  {/* <button
                      className="block m-2"
                      type="submit"
                      disabled={loading}
                    >
                      Save Changes
                    </button> */}
                </form>
              </section>

              {/* <Image src={alumni} width={76} /> */}

              <button
                onClick={() => {
                  document.querySelector("body").classList.remove("no-scroll");
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
      </div>
    </>
  );
}
