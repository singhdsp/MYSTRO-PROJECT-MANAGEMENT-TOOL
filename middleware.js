import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'de', 'fr'],
  defaultLocale: 'en',
  localePrefix: "as-needed",
});

export default function middleware(request) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith('/_next')) {
    return;
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};