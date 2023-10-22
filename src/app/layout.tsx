import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Container from "@/components/ui/container";
import { Providers } from "@/redux/provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Container>
              <Navbar />
              {children}
            </Container>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
