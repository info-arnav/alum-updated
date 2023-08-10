import React, { useEffect } from "react";
// import Table from './Table';
import Table_Content from "./Table_Content";
import { useState } from "react";

let DATA = [
  {
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    cgpa: 10,
    branch: "CSE",
    resume: "Download",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    cgpa: 4,
    branch: "ME",
    resume: "Download",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    cgpa: 8,
    branch: "ECE",
    resume: "Download",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    cgpa: 9,
    branch: "MAC",
    resume: "Download",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    cgpa: 6.5,
    branch: "EE",
    resume: "Download",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    cgpa: 7.86,
    branch: "ECE",
    resume: "Download",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    cgpa: 6,
    branch: "ECE",
    resume: "Download",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    cgpa: 9.21,
    branch: "CSAI",
    resume: "Download",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];
const Branches = {
  CSE: false,
  CSAI: false,
  CSDS: false,
  CSDA: false,
  CIOT: false,
  MAC: false,
  IT: false,
  ITNS: false,
  ECE: false,
  EIOT: false,
  ME: false,
  CE: false,
  ICE: false,
  EE: false,
  MPAE: false,
  BT: false,
  ECAM: false,
  GI: false,
  MEEV: false,
};

const Recruit_Table = () => {
  const [gpa_filter, set_gpa] = useState(0);
  const [data, setData] = useState(DATA);
  const [Branch_Drop, set_Branch_Drop] = useState("hidden");
  const [branch_filter, set_branch_filter] = useState(Branches);

  const dropdown_handler = () => {
    if (Branch_Drop == "hidden") {
      set_Branch_Drop((prev) => {
        return "";
      });
    } else {
      set_Branch_Drop((prev) => {
        return "hidden";
      });
    }
  };

  const branch_filter_handler = (event) => {
    // set_branch_filter((prev) => {

    if (event.target.checked) {
      let editBranch = event.target.value;
      set_branch_filter((prev) => {
        return { ...branch_filter, [editBranch]: true };
      });
    } else {
      let editBranch = event.target.value;
      set_branch_filter((prev) => {
        return { ...branch_filter, [editBranch]: false };
      });
    }
  };

  const clear_all_handler = () => {
    set_branch_filter((prev) => {
      return Branches;
    });
  };
  const select_all_handler = () => {
    set_branch_filter((prev) => {
      return {
        CSE: true,
        CSAI: true,
        CSDS: true,
        CSDA: true,
        CIOT: true,
        MAC: true,
        IT: true,
        ITNS: true,
        ECE: true,
        EIOT: true,
        ME: true,
        CE: true,
        ICE: true,
        EE: true,
        MPAE: true,
        BT: true,
        ECAM: true,
        GI: true,
        MEEV: true,
      };
    });
  };

  const filter_handler = (e) => {
    e.preventDefault();
    let newData = DATA.filter((currentValue) => {
      return (
        currentValue.cgpa >= gpa_filter && branch_filter[currentValue.branch]
      );
    });
    setData((prev) => {
      return newData;
    });
    set_Branch_Drop((prev) => {
      return "hidden";
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  console.log("RE - render");
  console.log(branch_filter);
  return (
    <div className=" overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
        <div className="m-4 w-full">
          <form
            className="text-xl bg-gray-100 rounded-xl"
            onKeyDown={handleKeyDown}
          >
            {/* FILTER */}
            <div className="flex md:flex-row flex-col">
              <div className="m-4">
                <label
                  for="steps-range"
                  className="inline mb-2 text-sm font-medium text-gray-900"
                >
                  Select Min CGPA :
                </label>
                <input
                  className="inline mx-2 bg-gray-100"
                  type="Number"
                  value={gpa_filter}
                  onChange={(e) => {
                    if (e.target.value > 10) {
                      set_gpa((prev) => {
                        return 10;
                      });
                    } else {
                      set_gpa((prev) => {
                        return e.target.value;
                      });
                    }
                  }}
                  min="0"
                  max="10"
                  step="0.01"
                />
                <input
                  id="steps-range"
                  type="range"
                  min="0"
                  max="10"
                  value={gpa_filter}
                  step="0.01"
                  onChange={(e) => set_gpa(e.target.value)}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                ></input>
              </div>
              <div className="mx-auto my-auto">
                <button
                  id="dropdownSearchButton"
                  data-dropdown-toggle="dropdownSearch"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={dropdown_handler}
                >
                  Select Branch{" "}
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <div
                  id="dropdownSearch"
                  className={
                    `z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-00 absolute ` +
                    Branch_Drop
                  }
                >
                  <ul
                    className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {Object.keys(branch_filter).map((e, idx) => {
                      return (
                        <li key={idx}>
                          <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                              id={`checkbox-item-` + idx}
                              type="checkbox"
                              value={e}
                              checked={branch_filter[e]}
                              onChange={branch_filter_handler}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            ></input>
                            <label
                              for={`checkbox-item-` + idx}
                              className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {e}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    onClick={clear_all_handler}
                    type="button"
                    className="flex w-full items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path>
                    </svg>
                    Clear All
                  </button>
                  <button
                    onClick={select_all_handler}
                    type="button"
                    className="flex w-full items-center p-3 text-sm font-medium text-green-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13  8a1 1 0 100 2h4a1 5 0 100-2h-4z"></path>
                    </svg>
                    Select All
                  </button>
                </div>
              </div>
            </div>

            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4"
              onClick={filter_handler}
            >
              Filter
            </button>
          </form>
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 m-4">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Branch
            </th>
            <th scope="col" className="px-6 py-3">
              CGPA
            </th>
            <th scope="col" className="px-6 py-3">
              Resume
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Rendering Each Row */}
          {data.map((e, idx) => {
            return <Table_Content key={idx} info={e} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recruit_Table;
