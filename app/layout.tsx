import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Code2 } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { metaConfig } from "./meta";
import { Toaster } from "sonner";
import { store } from "@/app/(home)/redux/r-stores/store";
import { Provider } from "react-redux";
import StoreProvider from "./(home)/redux/providers/store-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = metaConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <Toaster richColors position="top-right" />
          <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-6 z-50 backdrop-blur-md shadow-md">
            <div className="max-w-7xl container mx-auto flex items-center justify-center w-full gap-12">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-primary">
                  <Code2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold gradient-text">
                  StateManager
                </span>
              </Link>
              <div className="flex items-center space-x-6">
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Docs
                </Link>
                <Link
                  href="/examples"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Examples
                </Link>
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/10 bg-transparent cursor-pointer"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </nav>
          <div className="pt-16">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
