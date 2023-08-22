"use client";

import Compressor from "compressorjs";
import { useState } from "react";
import Editor from "../../components/Editor";

export default function EditProfile({
  data,
  link,
  email,
  setShow,
  setRefresh,
  refresh,
  setData,
}) {
  const [name, setName] = useState(data.name);
  const [image, setImage] = useState(`${link}api/image/${data._id}`);
  const [changed, setChanged] = useState(false);
  const [batch, setBatch] = useState(data.batch);
  const [bio, setBio] = useState(data.bio);
  const [instagram, setInstagram] = useState(data.instagram);
  const [facebook, setFacebook] = useState(data.facebook);
  const [linkedin, setLinkedin] = useState(data.linkedin);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const secondUpdate = async () => {
    const res = await fetch(`/api/update-profile`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        batch: batch,
        bio: bio,
        name: name,
        instagram: instagram,
        linkedin: linkedin,
        facebook: facebook,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    if (res.error) {
      setError("Some error Occured Updating the profile");
      setLoading(false);
    } else {
      document.getElementById(
        "profile_image_refreshed"
      ).src = `${link}api/image/${data._id}?updated&&t=${new Date().getTime()}`;
      data.name = name;
      data.bio = bio;
      data.batch = batch;
      setData(data);
      setRefresh(!refresh);
      setLoading(false);
      setError(false);
      document.querySelector("body").classList.remove("no-scroll");
      setShow(false);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    if (changed) {
      const res = await fetch(`/api/set-profile-picture`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          id: data._id,
          image: image,
        }),
        cache: "no-cache",
      }).then((e) => e.json());
      if (res.error) {
        setError("Some error Occured Updating the image");
        setLoading(false);
      } else {
        secondUpdate();
      }
    } else {
      secondUpdate();
    }
  };
  const base64Converter = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = function () {
        setError("");
        setImage(reader.result);
        setChanged(true);
      };
      reader.onerror = function (error) {
        setError("Some error occured uploading the image.");
      };
    } catch {
      setError("Some error occured uploading the image.");
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
      setError("Some error occured uploading the image.");
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <section className="py-8 px-4 mx-auto max-w-3xl lg:py-14">
          <h2 className="text-2xl font-bold">Profile</h2>
          <hr className="mb-12 h-0.5" />
          <form onSubmit={handleUpdate}>
            <img
              src={image}
              alt="The profile picture"
              width={100}
              height={100}
              onClick={(e) => document.getElementById("hidden_click").click()}
            ></img>
            <input
              onChange={imageHandler}
              type="file"
              accept="image/*"
              id="hidden_click"
              hidden
            ></input>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7 mt-6">
              <div className="relative">
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                ></input>
                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                >
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  id="batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // placeholder="Batch"
                ></input>
                <label
                  htmlFor="batch"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                >
                  Batch
                </label>
              </div>

              <div className="relative">
                <input
                  id="Facebook"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // placeholder="Batch"
                ></input>
                <label
                  htmlFor="Facebook"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                >
                  Facebook Link
                </label>
              </div>

              <div className="relative">
                <input
                  id="LinkedIn"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // placeholder="Batch"
                ></input>
                <label
                  htmlFor="LinkedIn"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                >
                  LinkedIn Link
                </label>
              </div>

              <div className="relative">
                <input
                  id="Instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // placeholder="Batch"
                ></input>
                <label
                  htmlFor="Instagram"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                >
                  Instagram Link
                </label>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-gray-500"
                >
                  Bio
                </label>
                <textarea
                  style={{ width: "100%", border: "solid grey" }}
                  id="bio"
                  value={bio}
                  onChange={(e) => {
                    e.target.value.length < 60 && setBio(e.target.value);
                  }}
                  placeholder="Add more details..."
                />
                Max 60 char
              </div>
            </div>
            {error && error}
            <button
              onClick={handleUpdate}
              type="submit"
              disabled={loading}
              className="profile-add mt-4 p-4"
            >
              Update
            </button>
          </form>
        </section>
        <button
          onClick={() => {
            document.querySelector("body").classList.remove("no-scroll");
            setShow(false);
          }}
          className="form-close"
        >
          X
        </button>
      </div>
    </div>
  );
}
