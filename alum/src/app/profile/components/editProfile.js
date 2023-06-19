'use client';

import Compressor from 'compressorjs';
import { useState } from 'react';

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
      method: 'POST',
      body: JSON.stringify({
        email: email,
        batch: batch,
        bio: bio,
        name: name,
      }),
      cache: 'no-cache',
    }).then((e) => e.json());
    if (res.error) {
      setError('Some error Occured Updating the profile');
      setLoading(false);
    } else {
      document.getElementById(
        'profile_image_refreshed'
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
        method: 'POST',
        body: JSON.stringify({
          email: email,
          id: data._id,
          image: image,
        }),
        cache: 'no-cache',
      }).then((e) => e.json());
      if (res.error) {
        setError('Some error Occured Updating the image');
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
        setError('');
        setImage(reader.result);
        setChanged(true);
      };
      reader.onerror = function (error) {
        setError('Some error occured uploading the image.');
      };
    } catch {
      setError('Some error occured uploading the image.');
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
      setError('Some error occured uploading the image.');
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
              onClick={(e) => document.getElementById('hidden_click').click()}
            ></img>
            <input
              onChange={imageHandler}
              type="file"
              accept="image/*"
              id="hidden_click"
              hidden
            ></input>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7 mt-6">
              <div class="relative">
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                ></input>
                <label
                  for="name"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                >
                  Name
                </label>
              </div>

              <div class="relative">
                <input
                  id="batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full p-2.5 border-2 border-gray-500 text-sm text-gray-900 bg-transparent rounded-lg  appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  // placeholder="Batch"
                ></input>
                <label
                  for="batch"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4"
                >
                  Batch
                </label>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="bio"
                  class="block mb-2 text-sm font-medium text-gray-500"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows="4"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="block p-2.5 w-full border-2 border-gray-500 text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bio, we suggest mentioning some of your skills here"
                ></textarea>
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
        <button onClick={() => setShow(false)} className="form-close">
          X
        </button>
      </div>
    </div>
  );
}
