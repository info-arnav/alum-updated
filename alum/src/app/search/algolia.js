"use client";

import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";

export default function Algolia({ keys, setShow, data, link }) {
  const searchClient = algoliasearch(keys[0], keys[1]);
  function Hit({ hit }) {
    if (data.data.id != hit.objectID) {
      return (
        <div
          className="search-hover"
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            borderBottom: "solid gray 0.2px",
          }}
        >
          <a href={`${link}/view/profile/${hit.objectID}`}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <img
                  height={40}
                  width={40}
                  style={{
                    minHeight: 40,
                    maxHeight: 40,
                    maxWidth: 40,
                    minWidth: 40,
                    marginRight: 20,
                    borderRadius: "100%",
                  }}
                  src={`${link}/api/image/${hit.objectID}`}
                ></img>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: 13 }}>
                    {hit.name || "No Name"}
                  </div>
                  <div style={{ fontSize: 11, color: "grey" }}>
                    {hit.bio ? hit.bio : "No bio"}
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      );
    }
  }
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_alum">
      <div className="flex flex-row justify-center">
        <SearchBox searchAsYouType={true} placeholder="Search..." />
        <button
          className="form-close"
          onClick={(e) => {
            document.querySelector("body").classList.remove("no-scroll");
            setShow(false);
          }}
        >
          X
        </button>
      </div>
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}
