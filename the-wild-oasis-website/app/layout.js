import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";

//In order to add fonts first import them
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
//this give us a function which now we need to call with options object
const josefin = Josefin_Sans({
  subsets: ["latin"], //For english we should use latin we also specify different subset like chinese greek etc
  display: "swap", //this will make sure that initially default font will be rendered until we completely download the out font
  //here we can also add a weight property to specify font weight but our font have predefined weight set to it
});
//we need to stor the result of this function call this will give us a object which have a className property which we can use in element where we want to this font

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
