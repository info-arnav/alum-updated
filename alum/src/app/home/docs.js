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
        quality: 0.8,
        success: (compressedResult) => {
          base64Converter(compressedResult);
        },
      });
    } catch {
      setImageError("Some error occured uploading the image.");
    }
  };
  const handleSubmit = async () => {
    if (image) {
      setUpdated(false);
      setImageError(false);
      setProcessing(true);
      const res = await fetch(`/api/set-doc`, {
        method: "POST",
        body: JSON.stringify({
          email: data.data.email,
          files: image,
        }),
        cache: "no-cache",
      }).then((e) => e.json());
      if (res.error) {
        setUpdated(false);
        setImageError("Some error occured");
        setProcessing(false);
      } else {
        setDoc(res.data);
        setErrorData(res.error_data);
        setImage("");
        setImageError(false);
        setUpdated(true);
        setProcessing(false);
      }
    } else {
      setImageError("Upload and Image");
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
          <img
            src={doc}
            width={200}
            alt="Verification document uploaded by user"
          ></img>
          <p style={{ marginTop: 20, color: "red" }}>{errorData}</p>
        </>
      )}
      <br></br>
      <input
        type="file"
        accept="image/*"
        onChange={imageHandler}
        required
        style={{ display: "none" }}
        id="file-verify-upload"
      ></input>
      <button
        style={{
          backgroundColor: "black",
          color: "white",
          padding: 5,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 20,
          marginBottom: 20,
        }}
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
        onClick={handleSubmit}
        disabled={processing}
        style={{
          backgroundColor: "black",
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
    </div>
  );
}
