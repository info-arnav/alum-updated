"use client";

import { useState } from "react";
import Cookies from "universal-cookie";
import login1 from "..//image/login1.png";
import loginstu from "..//image/loginstu.png";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let data = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    }).then((e) => e.json());
    if (data.error) {
      setError(data.message);
      setLoading(false);
    } else {
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 100);
      let cookies = new Cookies();
      cookies.set("session_id", data.key, {
        secure: true,
        sameSite: "lax",
        path: "/",
        expires: expirationDate,
      });
      location.replace("/");
      setLoading("");
    }
  };
  return (
    <div className="login-page flex md:flex-row flex-col">
      <div className="loginHeader md:w-3/5 w-full relative h-[540px] md:p-5">
        <h1
          className="text-4xl font-bold mt-14 z-10 pl-2"
          style={{ marginLeft: 20, marginBottom: 20 }}
        >
          NSUT’s Alumni <br />
          networking Portal
        </h1>
        <h3 className="z-10 tracking-widest pl-2" style={{ marginLeft: 20 }}>
          Welcome to Nalum!
          <br />
          Registered ? Login Now and enjoy the platform.
        </h3>
        <div className="absolute -z-10 w-full flex flex-col justify-between h-full md:right-4 ">
          <div className="absolute right-3 md:-top-36 -top-12 w-[175px] h-[175px] md:w-[200px] md:h-[200px] ">
            <Image
              className="w-[175px] h-[175px] md:w-[200px] md:h-[200px]"
              src={login1}
              // width={180}
              // height={180}
              alt="image login"
            ></Image>
          </div>
          <div className="absolute right-14 md:top-0 top-20">
            <Image
              className="w-[303px] h-[303px] md:w-[440px] md:h-[440px]"
              src={loginstu}
              // width={303}
              // height={303}
              alt="image login"
            ></Image>
          </div>
        </div>
      </div>
      <div className="md:w-2/5 w-full p-4 md:mt-10" style={{ marginTop: 100 }}>
        <main className="login">
          <main className="overlay"></main>
          <div className="container w-full text-center">
            <div className="title font-bold text-3xl mb-8 m-4">Login</div>
            <form onSubmit={handleSubmit}>
              <div className="m-2 relative mb-6 w-[70%] mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-black dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  className="bg-[#DFE6F9] pl-10 text-lg text-gray-900  rounded-xl w-full p-2.5 "
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value.toLowerCase().replaceAll(" ", ""))
                  }
                ></input>
              </div>
              <div className="m-2 relative mb-4 w-[70%] mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    viewBox="0 0 24 24"
                    id="key-hole"
                  >
                    <path d="M12,8a2,2,0,0,0-2,2,2,2,0,0,0,1,1.72V15a1,1,0,0,0,2,0V11.72A2,2,0,0,0,14,10,2,2,0,0,0,12,8Zm0-6A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path>
                  </svg>
                </div>
                <input
                  className="pl-10 bg-[#DFE6F9] text-gray-900 text-lg rounded-xl w-full p-2.5 "
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="text-red-600">{error && error}</div>
              <button
                className=" mb-10 m-4 w-[70%] text-white bg-[#00183F] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-lg rounded-xl text-md px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 form-button-hover"
                type="submit"
                disabled={loading}
                style={{ marginBottom: 10 }}
              >
                {loading ? "Logging you in...." : "Login"}
              </button>
              <Link href="/register">
                <div className="text-black-600" style={{ marginTop: 10 }}>
                  Not registered yet ? Register Now
                </div>
              </Link>
              <Link href="/reset">
                <div className="text-black-600" style={{ marginTop: 10 }}>
                  Forgot password ?
                </div>
              </Link>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
