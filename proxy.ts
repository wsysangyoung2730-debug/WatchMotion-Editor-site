import { NextResponse, type NextRequest } from "next/server";
import { isLocale, preferenceCookie } from "./lib/i18n/routing";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const first = url.pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();
  // Only an explicit saved choice changes the entry page. Browser language is ignored.
  const saved = request.cookies.get(preferenceCookie)?.value;
  if (url.pathname === "/" && saved && isLocale(saved) && saved !== "en") {
    url.pathname = `/${saved}`;
    const response = NextResponse.redirect(url);
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Vary", "Cookie");
    return response;
  }
  // Use the request URL rather than NextURL's loopback-host normalization.
  const destination = new URL(request.url);
  destination.pathname = `/en${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(destination);
}
export const config = {
  matcher: ["/((?!api|_next|images|examples|.*\\..*).*)"],
};
