import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "@/app/globals.css";
import { Navbar } from "@/components/ui/navbar";
import { ClientWrapper } from "@/components/ui/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ibrahim Dawer | Full Stack Developer",
  description:
    "Portfolio website of Ibrahim Dawer, a MERN stack developer specializing in modern web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientWrapper>
            <Navbar />
            {children}
          </ClientWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
