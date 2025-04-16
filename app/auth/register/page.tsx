'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

// Import shadcn UI components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setErrorMessage('');
  //   setIsLoading(true);

  //   try {
  //     // For Next-Auth, we'll use the register API endpoint
  //     const response = await fetch('/api/auth/register', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       // Handle different error cases
  //       if (data.error?.includes('invalid-email')) {
  //         setErrorMessage('メールアドレスの形式が正しくありません');
  //       } else if (data.error?.includes('email-already-exists')) {
  //         setErrorMessage('既に登録されているメールアドレスです');
  //       } else if (data.error?.includes('weak-password')) {
  //         setErrorMessage('パスワードは6文字以上で入力してください');
  //       } else {
  //         setErrorMessage(data.error || 'ユーザー登録に失敗しました');
  //       }
  //       setIsLoading(false);
  //       return;
  //     }

  //     // After successful registration, sign in the user
  //     const result = await signIn('credentials', {
  //       redirect: false,
  //       email,
  //       password,
  //     });

  //     if (result?.error) {
  //       setErrorMessage('登録後のログインに失敗しました');
  //       setIsLoading(false);
  //       return;
  //     }

  //     // Redirect to the home page
  //     router.push('/');
  //     router.refresh();
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     setErrorMessage('ユーザー登録に失敗しました');
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {errorMessage && (
          <Alert variant='destructive' className='mb-4'>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Card className='shadow-lg'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-center text-2xl font-bold'>ユーザー登録</CardTitle>
          </CardHeader>

          <CardContent>
            <form className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>メールアドレス</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='your@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  autoFocus
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>パスワード</Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <p className='text-sm text-gray-500'>パスワードは6文字以上で入力してください</p>
              </div>

              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? '登録中...' : '登録'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='flex flex-col space-y-4 pt-0'>
            <div className='text-sm text-center w-full'>
              <Link
                href='/auth/login'
                className='text-blue-600 hover:text-blue-800 hover:underline'
              >
                登録済みですか? ログイン
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
