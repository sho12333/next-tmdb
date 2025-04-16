import NextAuth, { User, NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// 認証APIのベースパス
export const BASE_PATH = '/api/auth';

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        const users = [
          {
            id: 'test-user-1',
            userName: 'test1',
            name: 'Test 1',
            password: 'qk5lSJ3maQ0pqmOyadTQRgN1K',
            email: 'test1@example.com',
          },
          {
            id: 'test-user-2',
            userName: 'test2',
            name: 'Test 2',
            password: 'T2GapYCYK6wp8mJ1YUUnYpBMc',
            email: 'test2@example.com',
          },
        ];
        const user = users.find(
          (user) =>
            user.userName === credentials.username && user.password === credentials.password,
        );
        return user ? { id: user.id, name: user.name, email: user.email } : null;
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
