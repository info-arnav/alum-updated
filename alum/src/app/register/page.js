"use client";

import { useState } from "react";
import SendOTP from "./sendOTP";
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
//         <p className="nsuts-alumni">{`Nsut’s Alumni `}</p>
//         <p className="nsuts-alumni">networking Portal</p>
//       </div>
//       <div className="welcome-to-alum-container">
//         <p className="nsuts-alumni">{`Welcome to Alum! `}</p>
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
    <div className="register-page">
      <div className="left">
        <div className="content">
          <div className="heading">
            <p className="nsuts-alumni">Nsut&apos;s alumni</p>
            <p className="nsuts-alumni">networking Portal</p>
          </div>
          <div className="subheading" style={{ marginTop: 100 }}>
            <p className="nsuts-alumni">Welcome to Alum!</p>
            <p className="nsuts-alumni">
              {"Be patient, the website is going live soon"}
            </p>
          </div>
        </div>
        <div className="image">
          <img
            className="image-29-icon"
            src="./image-29@2x.png"
            alt="error"
          ></img>
          <img
            className="image-28-icon"
            src="./image-28@2x.png"
            alt="error"
          ></img>
        </div>
      </div>
      <div className="right">
        <div className="register">
          <p>Register as</p>
        </div>
        <div className="options">
          <div
            className={`thirty-5 right ${type == "alumni" && "active"}`}
            onClick={(e) => {
              setType("alumni");
            }}
          >
            <img
              className="image-35-icon"
              src="./image-35@2x.png"
              alt="error"
            ></img>
            <p className="content-35">Alumni</p>
          </div>

          <div
            className={`thirty-4 left ${type == "student" && "active"}`}
            onClick={(e) => {
              setType("student");
            }}
          >
            <img
              className="image-34-icon"
              src="./image-34@2x.png"
              alt="error"
            ></img>
            <p className="content-34">Student</p>
          </div>
        </div>
        <SendOTP type={type}></SendOTP>
      </div>
    </div>
  );
}
