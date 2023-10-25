"use client";

import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "./loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

// Import Swiper styles

import "swiper/swiper.min.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/navigation";

// import "../globals.css";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import required modules
import { EffectCoverflow } from "swiper";

export default function LoggedIn({ type, keys, link, data }) {
  const [array, setArray] = useState([
    {
      title: "Xerocrypt",
      image: "/events/1.jpg",
      date: "26th August 2023",
      desc: "A devcomm society event in collaboration with coding blocks",
    },
    {
      title: "Resonance",
      image: "/events/2.webp",
      date: "October",
      desc: "Intra College NSUT yearly event",
    },
    {
      title: "NSUT-Thon",
      image: "/events/3.jpg",
      date: "September",
      desc: "The annual freshers society interaction event",
    },
  ]);
  useEffect(() => {
    let len = array.length;
    if (len <= 6) {
      let temp = array;
      for (let x = 0; x < len; x = x + 1) {
        temp.push(array[x]);
      }
      setArray(temp);
    }
  }, []);
  const searchClient = algoliasearch(keys[0], keys[1]);
  const [show, setShow] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [subloading, setSubLoading] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [num, setNum] = useState(10);
  const [userdata, setUserData] = useState([]);
  const find = async () => {
    let tempData = await fetch(`/api/find-people`, {
      method: "POST",
      body: JSON.stringify({
        auth_email: data.data.email,
        num: num,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setUserData(tempData.data);
    setLoading(false);
    setSubLoading(false);
  };
  const invite = async () => {
    setSent(false);
    setInviting(true);
    setMessage("");
    let messageData = await fetch(`/api/send-invite`, {
      method: "POST",
      body: JSON.stringify({
        auth_email: data.data.email,
        email: email,
        verifier: data.data.email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setMessage(messageData.message);
    setSent(true);
    setInviting(false);
  };
  useEffect(() => {
    find();
  }, [num]);
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
  return loading ? (
    <Loading></Loading>
  ) : (
    <>
      <center
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 80px)",
          margin: 10,
        }}
      >
        <p
          style={{
            marginTop: 53,
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          Upcoming Events
        </p>
        <div className="events-courosel">
          <main className="gallery-section" id="gallery">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 105,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                disableOnInteraction: false,
              }}
              // pagination={true}
              navigation={true}
              modules={[EffectCoverflow, Autoplay, Navigation]}
              className="mySwiper"
            >
              {array.map((e) => (
                <SwiperSlide
                  style={{
                    overflow: "hidden",
                    borderRadius: 20,
                    outline: "3px solid black",
                    backgroundColor: "white",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        backgroundImage: `url("${e.image}")`,
                        width: "100%",
                        height: "50%",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        flex: 2,
                        backgroundColor: "white",
                        marginBottom: 20,
                      }}
                    ></div>
                    <div style={{ flex: 1, backgroundColor: "white" }}>
                      <center>
                        <p
                          style={{
                            marginBottom: 5,
                            fontWeight: "bold",
                            fontSize: 21,
                            width: "calc(100vw - 20px)",
                          }}
                        >
                          {e.title}
                        </p>
                        <p
                          style={{
                            marginBottom: 15,
                            width: "calc(100vw - 20px)",
                          }}
                        >
                          {e.date}
                        </p>
                        <p
                          style={{
                            width: "calc(100vw - 20px)",
                          }}
                        >
                          {e.desc}
                        </p>
                      </center>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </main>
        </div>
        <br></br>
        <button
          style={{
            backgroundColor: "#F5F4F7",
            color: "#939393",
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 16,
            margin: 20,
            width: "calc(100% - 40px)",
            maxWidth: 600,
            textAlign: "left",
          }}
          onClick={(e) => {
            setShow(true);
            document.querySelector("body").classList.add("no-scroll");
          }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
              style={{ marginRight: 10 }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
            </svg>
            Search for your batchmates
          </p>
        </button>
        {type == "student" ? (
          <div className="logged-in-button" style={{ marginTop: 20 }}>
            <Link
              href="/recruitment"
              className="right-space"
              style={{
                backgroundColor: "#DFE6F9",
                padding: 15,
                fontSize: 14,
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 10,
                marginRight: 14,
                marginTop: 16,
              }}
            >
              Find Opportunities
            </Link>
          </div>
        ) : (
          <div className="logged-in-button" style={{ marginTop: 20 }}>
            <Link
              href="/recruitment"
              className="right-space"
              style={{
                backgroundColor: "#DFE6F9",
                padding: 15,
                fontSize: 14,
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 10,
                marginRight: 14,
                marginTop: 16,
              }}
            >
              Manage Recruitments
            </Link>
            <Link
              href="/candidates"
              style={{
                backgroundColor: "#DFE6F9",
                padding: 15,
                fontSize: 14,
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 10,
              }}
            >
              Past Recruitments
            </Link>
          </div>
        )}
        <br></br>
        <p
          style={{
            marginTop: 53,
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          People You May Know
        </p>
        <br></br>
        {userdata.map((e) => {
          if (e._id != data.data.id) {
            return (
              <div
                className="search-hover"
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderBottom: "solid gray 0.2px",
                  maxWidth: 900,
                  margin: 10,
                  width: "calc(100% - 20px)",
                }}
              >
                <a href={`${link}/view/profile/${e._id}`}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <img
                        height={40}
                        width={40}
                        style={{
                          minHeight: 40,
                          minHeight: 40,
                          maxHeight: 40,
                          maxWidth: 40,
                          minWidth: 40,
                          minWidth: 40,
                          marginRight: 20,
                          borderRadius: "100%",
                        }}
                        src={`${link}/api/image/${e._id}`}
                      ></img>
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "left",
                        }}
                      >
                        <div style={{ fontWeight: "bold", fontSize: 13 }}>
                          {e.name || "No Name"}
                        </div>
                        <div style={{ fontSize: 11, color: "grey" }}>
                          {e.bio ? e.bio : "No bio"}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          }
        })}
        <button
          className="hoveryat"
          onClick={(e) => {
            setSubLoading(true);
            setNum(num + 10);
          }}
          disabled={subloading}
          style={{
            width: "calc(100% - 20px)",
            margin: 10,
            backgroundColor: "rgb(223, 230, 249)",
            padding: "10px",
            borderRadius: 18,
          }}
        >
          {subloading ? "Finding...." : "Load More"}
        </button>
        {type == "alumni" && (
          <>
            <input
              style={{
                backgroundColor: "#F5F4F7",
                color: "black",
                padding: 15,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 16,
                margin: 20,
                width: "calc(100% - 20px)",
                textAlign: "left",
                maxWidth: 900,
              }}
              placeholder="Enter E-Mail"
              required={true}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <p style={{ marginBottom: 0, paddingTop: 10 }}>
              Can't find your friends ?
            </p>
            <button
              className="hoveryat"
              onClick={invite}
              disabled={inviting}
              style={{
                width: "calc(100% - 20px)",
                margin: 10,
                marginTop: 0,
                backgroundColor: "rgb(223, 230, 249)",
                padding: "10px",
                borderRadius: 18,
              }}
            >
              {inviting ? "Sending Invite...." : "Invite"}
            </button>
            {sent && message}
          </>
        )}
      </center>

      <div style={{ marginBottom: 80 }}></div>
      {show && (
        <div className="modal">
          <div
            style={{ marginTop: 10 }}
            className="card overflow-y-auto rounded-lg border-2 border-black relative w-[calc(100%-20px)] mx-auto bg-white py-4 custom-search-height"
          >
            <InstantSearch searchClient={searchClient} indexName="dev_alum">
              <div className="flex flex-row justify-center">
                <SearchBox searchAsYouType={true} placeholder="Search..." />
                <button
                  className="form-close"
                  onClick={(e) => {
                    document
                      .querySelector("body")
                      .classList.remove("no-scroll");
                    setShow(false);
                  }}
                >
                  X
                </button>
              </div>
              {/* <div className="w-[100%] bg-blue-200"> */}
              <Hits hitComponent={Hit} />
              {/* </div> */}
              {/* <SearchPopup/> */}
            </InstantSearch>
          </div>
        </div>
      )}
    </>
  );
}
