import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

export const ibm_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ibm_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});
