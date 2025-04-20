import { NextResponse } from 'next/server';
import { auth, BASE_PATH } from '@/lib/auth';

// api, _next/static, _next/image, favicon.ico以外のアクセスであればmiddlewareを通す
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default auth((req) => {
  // ユーザーが認証済みか判断し、認証済みでなければサインインページにリダイレクトします。
  const reqUrl = new URL(req.url);

  // publicなパスのリスト（サインインが不要なページ）
  const publicPaths = ['/', '/signin', '/signup', '/forgot-password'];

  // パスがパブリックパスかどうかチェック
  const isPublicPath = publicPaths.includes(reqUrl.pathname);

  // 認証されていない＆パブリックでないパスへのアクセスならリダイレクト
  //   if (!req.auth && !isPublicPath) {
  //     return NextResponse.redirect(
  //       new URL(`${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(reqUrl.pathname)}`, req.url),
  //     );
  //   }

  // それ以外の場合は次の処理へ進む
  return NextResponse.next();
});
