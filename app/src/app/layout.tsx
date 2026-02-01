import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "HYROX PREP",
  description: "10-week Hyrox race preparation dashboard",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative z-10 min-h-dvh pb-20">
        <main className="mx-auto max-w-lg px-5 pt-8">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
