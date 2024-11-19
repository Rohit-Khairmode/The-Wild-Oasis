import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";
export default function Home() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill //this will make sure that image occupy this whole page and this will also make image out of the flow so other elements can overlap it.
        placeholder="blur" //this make image blur until it completely loaded
        quality={80}
        className="object-cover object-top" //object-cover is similar to setting background-size:cover this make image flexible as per viewport
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
