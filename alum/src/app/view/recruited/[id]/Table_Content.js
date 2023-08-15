"use client";

import React from "react";
import { useState, useEffect } from "react";

function Table_Content(props) {
  const [color, Set_Color] = useState("");
  useEffect(() => {
    if (props.info.cgpa >= 8) {
      Set_Color("bg-green-500");
    } else if (props.info.cgpa >= 6) {
      Set_Color("bg-yellow-800");
    } else {
      Set_Color("bg-red-500");
    }
  });

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="pl-3">
          <div className="font-normal text-gray-500">{props.info.email}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        <button
          onClick={props.info.resume}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          View Portfolio
        </button>
      </td>
    </tr>
  );
}

export default Table_Content;
