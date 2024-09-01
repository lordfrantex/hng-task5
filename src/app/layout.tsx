import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import IndexContext from "@/context/IndexContext";
import { ToastContainer } from "react-toastify";


const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devlinks by Lord Frantex",
  description: "This app allows anyone to share their social profile with just one click",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <IndexContext>
        <body className={`${instrumentSans.className} bg-custom_offwhite`}>
          <ToastContainer />
          {children}
        </body>
      </IndexContext>
    </html>
  );
}
