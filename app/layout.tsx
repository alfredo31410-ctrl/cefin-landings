import "./globals.css";
import Script from "next/script";
import { HotmartUtmTracking } from "@/components/hotmart-utm-tracking";

const VK_DIGITAL_LEADS_PIXEL_SCRIPT = `
(function(w, d, s, u) {
  w.vkPixel = w.vkPixel || { _q: [] };
  w.vkPixel._q.push(['init',
'ko22gCCWXDXzyXWlo4Zt']);
  var js = d.createElement(s);
  js.src = u;
  js.async = true;
  d.head.appendChild(js);
})(window, document, 'script',
'https://cf.vkdigital.com.br/pixel.js?v=55');
`;

const VK_DIGITAL_TRACKING_SCRIPT = `
!function(w,d,c){
  (w.VKMetrics=w.VKMetrics||{_q:[]})._q.push(['init',c,'page_view']);
  var s=d.createElement('script');
  s.src='https://cf.vkdigital.com.br/vk-metrics.js';
  s.async=1;
  s.setAttribute('data-no-xcod-url','');
  d.head.appendChild(s);
}(window,document,'ko22gCCWXDXzyXWlo4Zt');
`;
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
        <Script
          id="vk-digital-leads-pixel"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: VK_DIGITAL_LEADS_PIXEL_SCRIPT }}
        />
        <Script
          id="vk-digital-metrics"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: VK_DIGITAL_TRACKING_SCRIPT }}
        />
        <HotmartUtmTracking />
        {children}
      </body>
    </html>
  );
}
