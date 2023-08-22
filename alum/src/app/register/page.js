"use client";

import { useState } from "react";
import SendOTP from "./sendOTP";
import login1 from "..//image/login1.png";
import loginstu from "..//image/loginstu.png";
import Image from "next/image";
import Link from "next/link";
import "./register.css";

// export default function Register() {
//   const [type, setType] = useState("alumni");

//   return (
//     <div className="register-page">
//       <main className="register">
//         <div className="container">
//           <div className="title">Registeration</div>
//           <div className="options">
//             <button
//               className={`right ${type == "alumni" && "active"}`}
//               onClick={(e) => {
//                 setType("alumni");
//               }}
//             >
//               Alumni
//             </button>
//             <button
//               className={`left ${type == "student" && "active"}`}
//               onClick={(e) => {
//                 setType("student");
//               }}
//             >
//               Student
//             </button>
//           </div>
//           <SendOTP type={type}></SendOTP>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default function Register(){
//   const [type, setType] = useState("alumni");
//   return (
//     <div className="signup">
//       <div className="signup-child" />
//       <img className="image-25-icon" alt="" src="/image-25@2x.png" />
//       <div className="group-parent">
//         <form>
//           <input type="email" name="email" placeholder="Enter your email address"></input><br></br>
//           <input type="password" name="password" placeholder="Password"></input>
//         </form>
//         {/* <div className="rectangle-parent">
//           <div className="group-child" />
//           <div className="enter-your-email">Enter your email address</div>
//         </div>
//         <div className="rectangle-group">
//           <div className="group-child" />
//           <div className="enter-your-email">Password</div>
//         </div> */}
//         <img className="user-1-icon" alt="" src="/user-1@2x.png" />
//         <img className="hide-1-icon" alt="" src="/hide-1@2x.png" />
//         <img className="lock-1-icon" alt="" src="/lock-1@2x.png" />
//         <div className="group-inner" />
//         <div className="remember-me">Remember me</div>
//         <div className="forgot-password">Forgot Password?</div>
//         <div className="rectangle-div" />
//         <div className="sign-in">SIGN IN</div>
//         <div className="or-continue-with">Or continue with</div>
//         <img className="group-icon" alt="" src="/group-696.svg" />
//         <img className="group-child1" alt="" src="/group-694.svg" />
//         <img className="vector-icon" alt="" src="/vector-1.svg" />
//         <img className="group-child2" alt="" src="/vector-1.svg" />
//       </div>
//       <div className="nsuts-alumni-networking-container">
//         <p className="nsuts-alumni">{`NSUT’s Alumni `}</p>
//         <p className="nsuts-alumni">networking Portal</p>
//       </div>
//       <div className="welcome-to-Nalum-container">
//         <p className="nsuts-alumni">{`Welcome to Nalum! `}</p>
//         <p className="nsuts-alumni">
//           Be patient, the website is going live soon
//         </p>
//       </div>
//       <div className="till-then-register-container">
//         <span>{`Till then, `}</span>
//         <i className="register">Register</i>
//         <span>{` `}</span>
//         <span className="here">
//           <i className="here1">here</i>
//           <span className="span">!</span>
//         </span>
//       </div>
//       <img className="image-30-icon" alt="" src="/image-30@2x.png" />
//       <img className="image-31-icon" alt="" src="/image-30@2x.png" />
//       <div className="image-29-parent">
//         <img className="image-29-icon" alt="" src="/image-29@2x.png" />
//         <div className="image-28-wrapper">
//           <img className="image-28-icon" alt="" src="/image-28@2x.png" />
//         </div>
//       </div>
//       <div className="login-as">Login As</div>
//       <div className="ellipse-parent">
//         <div className="frame-child" />
//         <img className="image-35-icon" alt="" src="/image-35@2x.png" />
//       </div>
//       <div className="ellipse-group">
//         <div className="frame-child" />
//         <img className="image-34-icon" alt="" src="/image-34@2x.png" />
//       </div>
//       <div className="alumni">
//           <button
//               className={`right ${type == "alumni" && "active"}`}
//               onClick={(e) => {
//                 setType("alumni");
//               }}
//             >
//               Alumni
//           </button>
//       </div>
//       <div className="student">
//           <button
//               className={`left ${type == "student" && "active"}`}
//               onClick={(e) => {
//                 setType("student");
//               }}
//             >
//               Student
//           </button>
//       </div>
//     </div>
//   );
// };

export default function Register() {
  const [type, setType] = useState("alumni");

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
          Register now to avail its exciting features.
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
              alt="image login"
            ></Image>
          </div>
        </div>
      </div>
      <div className="md:w-2/5 w-full p-4 md:mt-10" style={{ marginTop: 100 }}>
        <main className="login">
          <main className="overlay">
            <div className="container w-full text-center">
              <div className="container w-full text-center">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className={`thirty-5 ${type == "alumni" && "active"}`}
                    onClick={(e) => {
                      setType("alumni");
                    }}
                  >
                    <div
                      className={`rounded-full p-1 ${
                        type == "alumni" && "bg-blue-500"
                      }`}
                    >
                      <img
                        className="image-35-icon"
                        src="./image-35@2x.png"
                        alt="error"
                      ></img>
                    </div>
                    <p className="content-35">Alumni</p>
                  </div>

                  <div
                    className={`thirty-4 ${type == "student" && "active"}`}
                    onClick={(e) => {
                      setType("student");
                    }}
                    style={{ width: 100 }}
                  >
                    <div
                      className={`rounded-full p-1 ${
                        type == "student" && "bg-blue-500"
                      }`}
                    >
                      <img
                        className="image-34-icon"
                        src="./image-34@2x.png"
                        alt="error"
                      ></img>
                    </div>
                    <p className="content-34">Student</p>
                  </div>
                </div>
              </div>
              <SendOTP type={type}></SendOTP>
            </div>
          </main>
        </main>
      </div>
    </div>
  );
}
