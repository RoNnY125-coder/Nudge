import { Poppins, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["500", "600", "700"],
  variable: "--font-heading"
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body"
});

export const metadata = {
  title: "Nudge",
  description: "A safe space to understand what your body is telling you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${dmSans.variable}`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
