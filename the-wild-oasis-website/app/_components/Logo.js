import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
// when we import image like this then in <Image /> component we don't need to specify the height and width it become responsive

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <Image
        src={logo}
        height="60"
        quality={100} // this help us to increase or decrease quality of image and this works if we added image by importing not by specifying path manually
        width="60"
        alt="The Wild Oasis logo"
      />{" "}
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
