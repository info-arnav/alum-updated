"use client";

import Compressor from "compressorjs";
import { useState } from "react";

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
        quality: 0.8,
        success: (compressedResult) => {
          base64Converter(compressedResult);
        },
      });
    } catch {
      setError("Some error occured uploading the image.");
    }
  };
  return (
    <>
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
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        ></input>
        <input
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          placeholder="Batch"
        ></input>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio, we suggest mentioning some of your skills here"
        ></textarea>
        {error && error}
        <button onClick={handleUpdate} type="submit" disabled={loading}>
          Update
        </button>
      </form>
      <button onClick={() => setShow(false)}>Close</button>
    </>
  );
}
