import "../styles/globals.css";
import type { Metadata } from "next";
import AppProvider from "@/context";
import { ibm_sans } from "@/utils/fonts";
import CustomLayout from "@/components/custom-layout";

export const metadata: Metadata = {
  title: "Kamino Analytics",
  description: "Kamino Analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true} className={ibm_sans.className}>
        <AppProvider>
          <CustomLayout>{children}</CustomLayout>
        </AppProvider>
      </body>
    </html>
  );
}
