import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Container from "@/components/ui/container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Live in China",
  description: "Find some places, enjoy living there",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
          <Navbar />
          {children}
        </Container>
      </body>
    </html>
  );
}
