import Image from "next/image";
import Docs from "./docs";

export default function Pending({ data }) {
  return (
    <main className="background nomargin">
      <Image
        src="/logo.png"
        width={200}
        height={200}
        alt="Logo of the Alum portal"
      ></Image>
      <div className="title">Welcome to Alum</div>
      <div className="message">Your verification is pending</div>
      <div className="type">
        You are logged in as an <b>Alumni</b>
      </div>
      <br></br>
      <div className="type">Your Documents :</div>
      <Docs data={data}></Docs>
    </main>
  );
}
