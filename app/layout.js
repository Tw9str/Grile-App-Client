import { Rubik } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title:
    "Grile Informatica - Testează-ți Abilitățile Gratuit cu Grile Făcute de Specialiști Universitari!",
  description:
    "Grile de Informatica facute de profesori pentru elevii care vor sa isi asigure locul la facultatea dorita. Cu explicatii si raspunsuri.",
  openGraph: {
    title:
      "Grile Informatica - Testează-ți Abilitățile Gratuit cu Grile Făcute de Specialiști Universitari!",
    description:
      "Grile de Informatica facute de profesori pentru elevii care vor sa isi asigure locul la facultatea dorita. Cu explicatii si raspunsuri.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Grile Informatica - Testează-ți Abilitățile Gratuit cu Grile Făcute de Specialiști Universitari!",
    description:
      "Grile de Informatica facute de profesori pentru elevii care vor sa isi asigure locul la facultatea dorita. Cu explicatii si raspunsuri.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className="scroll-smooth">
      <body className={rubik.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
