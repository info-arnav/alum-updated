import Image from "next/image";
import Dropdown from "./dropdown";

export default function Privacy() {
  let data = [
    [
      "Information We Collect",
      `<p>We collect various types of information to provide you with the best possible user experience, including:</p>
<ul>
<li>Basic Personal Information: Full name, date of birth, gender, and profile picture</li>
<li>Contact Information: Email address, phone number, and mailing address</li>
<li>Academic Information: Degree, major, year of graduation, and department</li>
<li>Professional Information: Job title, company, industry, work experience, and skills</li>
<li>Social Media Links: LinkedIn, Facebook, Twitter, and Instagram profile URLs</li>
<li>Participation and Interests: Areas of expertise, topics for mentoring, events of interest, and types of collaboration or support</li>
<li>User Activity Data: Log-in frequency, time spent on the platform, content engagement, and interaction with other users</li>
</ul>`,
    ],
    [
      "How We Use Your Information",
      `<p>We use the information we collect for the following purposes:</p>

    <ul>
        <li>Providing you with a secure and personalized user experience</li>
        <li>Facilitating communication and collaboration between alumni, students, and the university</li>
        <li>Connecting users with relevant events, mentorship opportunities, and collaborations</li>
        <li>Providing customer support and communicating with you about your account and use of our services, separate from promotional emails and advertising</li>
        <li>Sending email campaigns and advertising from third-party sponsors to generate revenue, which helps us maintain and improve our services</li>
        <li>Improving the functionality and performance of our site</li>
        <li>Analyzing user behavior and preferences to enhance our services</li>
    </ul>`,
    ],
    [
      "Security Protocols",
      `<p>We implement various security measures to protect your personal information, including:</p>
  <ul>
      <li>API key generation and encryption: The use of unique API keys for authentication and the encryption of these keys provide an additional layer of security for user accounts.</li>
      <li>HTTP-only cookies: Storing sensitive information, like the encrypted API key, in an HTTP-only cookie prevents client-side JavaScript access, reducing the risk of XSS attacks.</li>
      <li>Secure, Lax, non-HTTP-only cookies: Saving the username in a secure and Lax non-HTTP-only cookie helps protect against CSRF attacks while allowing for fast login and logout functionality.</li>
      <li>User-level access control: Implementing user-level access control rules in the Realm database with GraphQL and MongoDB ensures that users can only access their own data, preventing unauthorized access or manipulation.</li>
      <li>Password hashing with bcrypt: The use of bcrypt for hashing passwords before storage adds an extra layer of security, making it more difficult for attackers to crack the passwords.</li>
  </ul>`,
    ],
    [
      "Third-Party Disclosure",
      "<p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except when required by law, with your consent, or for the purpose of providing the services requested. This does not include trusted third parties who assist us in operating our site, conducting our business, or servicing you, as long as these parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect our or others' rights, property, or safety.</p>",
    ],
    [
      "Email Campaigns and Advertising",
      " <p>We may use your email address to send you updates about our services, promotions, events, and other relevant information. Additionally, our email campaigns may include advertising from third-party sponsors, which serve as a means of generating revenue to support our platform. These email campaigns and advertisements are designed to enhance your experience with our platform, keep you informed about opportunities that may interest you, and help us maintain and improve our services.</p>",
    ],
  ];
  return (
    <div className="privacy-page">
      <div className="main-container">
        <div className="container">
          <div className="title">Nalum Privacy Policy</div>
          <div className="date">Updated April 5, 2023</div>
          <Image
            src="/logo.png"
            height={200}
            width={200}
            alt="Nalum - NSUT Alumni Network Logo"
          ></Image>
          <p className="content" style={{ marginBottom: 40 }}>
            Nalum is a platform designed to facilitate communication and
            collaboration between the alumni and students of NSUT (Netaji Subhas
            University of Technology).
            <br></br>
            <br></br>
            Our goal is to help alumni stay connected to their alma mater,
            provide students with access to valuable resources and mentorship,
            and allow the university to maintain a strong and supportive
            network.
            <br></br>
            <br></br>
            By using our site, you agree to the terms of this Privacy Policy.
          </p>
          {data.map((e) => {
            return (
              <Dropdown
                key={data.indexOf(e)}
                title={e[0]}
                content={e[1]}
                index={data.indexOf(e)}
              ></Dropdown>
            );
          })}
        </div>
      </div>
    </div>
  );
}
