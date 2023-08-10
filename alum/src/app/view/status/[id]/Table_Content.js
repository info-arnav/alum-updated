import React from "react";
import { useState, useEffect } from "react";

const Table_Content = (props) => {
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
    <tr
      key={props.key}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          className="w-10 h-10 rounded-full"
          src={props.info.imgUrl}
          alt="Jese image"
        />
        <div className="pl-3">
          <div className="text-base font-semibold">{props.info.name}</div>
          <div className="font-normal text-gray-500">{props.info.email}</div>
        </div>
      </th>
      <td className="px-6 py-4">{props.info.branch}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className={`h-2.5 w-2.5 rounded-full mr-2 ` + color}></div>{" "}
          {props.info.cgpa}
        </div>
      </td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {props.info.resume}
        </a>
      </td>
    </tr>
  );
};

export default Table_Content;
