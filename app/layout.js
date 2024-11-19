import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mystro",
  description: "Mystro Project Management Tool",
  manifest: "/manifest.json",
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Your App Name',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <main className="block md:hidden !select-none">{children}</main>
        <div className="w-full h-screen md:flex justify-center items-center hidden">
          <h1 className="font-semibold text-lg">This application is designed for mobiles and tablets only</h1>
        </div>
      </body>
    </html>
  );
}