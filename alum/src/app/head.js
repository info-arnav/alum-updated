import Script from "next/script";

export default function Head() {
  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="fb:app_id" content="234714202401587" />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QB16GK25YG"
        strategy="afterInteractive"
      ></Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QB16GK25YG"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QB16GK25YG');
        `}
      </Script>
    </>
  );
}
