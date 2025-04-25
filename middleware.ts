import { NextResponse } from 'next/server';
import { auth, BASE_PATH } from '@/lib/auth';

// api, _next/static, _next/image, favicon.ico以外のアクセスであればmiddlewareを通す
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default auth((req) => {
  const reqUrl = new URL(req.url);

  const publicPaths = ['/', '/signin', '/signup', '/forgot-password'];

  const isPublicPath = publicPaths.includes(reqUrl.pathname);

  //   if (!req.auth && !isPublicPath) {
  //     return NextResponse.redirect(
  //       new URL(`${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(reqUrl.pathname)}`, req.url),
  //     );
  //   }

  return NextResponse.next();
});
