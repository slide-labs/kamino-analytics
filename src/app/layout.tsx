import "../styles/globals.css";
import type { Metadata } from "next";
import AppProvider from "@/context";
import Header from "@/components/header";
import Menu from "@/components/menu";
import { ibm_sans } from "@/utils/fonts";
import NextProgress from "@/components/next-progress";

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
      <body suppressHydrationWarning={true} className={ibm_sans.className}>
        <AppProvider>
          <div className="w-full min-h-screen flex-1 flex flex-col bg-kamino-blue-dark">
            <NextProgress />
            <Header />
            <div className="container-main w-full flex !mt-[72px] gap-x-[32px] min-h-[calc(100vh-72px)]">
              <div className="relative w-[220px] min-w-[220px] min-h-full">
                <div className="fixed w-[220px] min-w-[220px] h-full max-h-[calc(100vh-72px)]">
                  <Menu />
                </div>
              </div>

              <div className="w-full max-w-[calc(100%-220px)] min-h-full pt-10 pr-3">
                {children}
              </div>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
