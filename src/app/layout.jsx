import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Solar System",
  description: "Explore the wonders of our solar system with NASA data",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🪐</text></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable} font-body`}>
        <Navigation />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
