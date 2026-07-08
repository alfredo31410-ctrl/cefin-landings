import "./globals.css";
import { HotmartUtmTracking } from "@/components/hotmart-utm-tracking";
/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-full flex flex-col">
        <HotmartUtmTracking />
        {children}
      </body>
    </html>
  );
}
