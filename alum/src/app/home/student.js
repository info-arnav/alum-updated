import Image from "next/image";

export default function Student() {
  return (
    <main className="background">
      <Image
        src="/logo.png"
        width={200}
        height={200}
        alt="Logo of the Alum portal"
      ></Image>
      <div className="title">Welcome to Alum</div>
      <div className="message">
        Please wait for the platform to be fully functional.
      </div>
      <div className="type">
        You are logged in as a <b>Student</b>
      </div>
    </main>
  );
}
