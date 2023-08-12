"use client";

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, setValue }) => {
  return (
    <ReactQuill theme="snow" value={value} onChange={setValue}></ReactQuill>
  );
};

export default Editor;
