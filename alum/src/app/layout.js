import "./globals.css";

export const metadata = {
  manifest: `${process.env.LINK}manifest.json`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <nav></nav>
      <body>
        <main>{children}</main>
      </body>
      <footer></footer>
    </html>
  );
}
