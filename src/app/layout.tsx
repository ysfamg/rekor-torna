import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rekor Torna Hidrolik | Gemi Sanayi Torna ve Hidrolik Çözümleri",
  description: "Gemi sanayinde torna ve hidrolik işlerinde 20 yılı aşkın tecrübe. Parça temini, özel üretim ve profesyonel çözümler sunuyoruz.",
  keywords: ["torna", "hidrolik", "gemi sanayi", "parça temini", "özel üretim", "denizcilik", "makine", "istanbul"],
  authors: [{ name: "Rekor Torna Hidrolik" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Rekor Torna Hidrolik",
    description: "Gemi sanayinde torna ve hidrolik çözümlerinde lider firma",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
