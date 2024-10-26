import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SideBar from "@/components/SideBar";

export const metadata = {
  title: "My Store",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Toaster position="top-center" />
        <div className="flex gap-5">
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  );
}
