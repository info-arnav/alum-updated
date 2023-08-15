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
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={(f) => {
              if (f.target.checked) {
                props.recruitsArray.push(props.info.email);
                props.setRecruitsArray(props.recruitsArray);
                props.otherArray.splice(
                  props.otherArray.indexOf(props.info.email),
                  1
                );
                props.setOtherArray(props.otherArray);
              } else {
                props.recruitsArray.splice(
                  props.recruitsArray.indexOf(props.info.email),
                  1
                );
                props.setRecruitsArray(props.recruitsArray);
                props.otherArray.push(props.info.email);
                props.setOtherArray(props.otherArray);
              }
            }}
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
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
          View Profile
        </button>
      </td>
    </tr>
  );
}

export default Table_Content;
