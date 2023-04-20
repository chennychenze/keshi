import "@/styles/globals.css";
import "@/styles/globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: "300",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={nunito.className}>
      <Component {...pageProps} />
    </main>
  );
}
