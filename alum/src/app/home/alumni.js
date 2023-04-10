import Image from "next/image";

export default function Alumni() {
  return (
    <main className="background">
      <Image src="/logo.png" width={200} height={200}></Image>
      <div className="title">Welcome to Alum</div>
      <div className="message">
        Please wait for the platform to be fully functional.
      </div>
      <div className="type">
        You are logged in as a <b>Alumni</b>
      </div>
    </main>
  );
}
