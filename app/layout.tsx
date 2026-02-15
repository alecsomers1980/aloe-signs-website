import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Aloe Signs | Signage that builds businesses",
  description: "Professional signage solutions in South Africa. We design, manufacture, and install everything in-house. From vehicle branding to building signage, we handle it end-to-end.",
  keywords: "signage, vehicle branding, building signage, shopfronts, wayfinding, billboards, large format print, screen printing, set building, South Africa, Gauteng",
  icons: {
    icon: '/aloe-logo.png',
    shortcut: '/aloe-logo.png',
    apple: '/aloe-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
