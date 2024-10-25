import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Heading from "../components/Heading";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ChatGPT ",
  description: "chat gpt clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <div className="flex">
            <div className="bg-[#171717] text-gray-200 min-w-[220px] max-w-[250px] h-screen">
              <Sidebar />
            </div>
            <div className="flex-1 bg-[#212121] text-gray-200 relative">
              <Heading />
              {children}
            </div>
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              // Define default options
              className: '',
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
          
              // Default options for specific types
              success: {
                duration: 1000,
                
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
