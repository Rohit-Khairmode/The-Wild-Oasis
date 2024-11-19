/*import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url));
}*/

import { auth } from "@/app/_lib/auth";
export const middleware = auth; //this will redirect unauthorized user to signin page

export const config = {
  matcher: ["/account"],
};
