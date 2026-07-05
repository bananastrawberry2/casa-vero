import createMiddleware from "next-intl/middleware";

export const routing = {
  locales: ["el", "en"],
  defaultLocale: "el",
  localePrefix: "always",
};

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|studio|.*\\..*).*)",
  ],
};
