'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, TextField, Container } from '@mui/material';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../utils/firebase';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ErrorAlert from '../../../utils/error/ErrorSnackBar';
import { FirebaseError } from 'firebase/app';

const Login = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/');
      })
      .catch((error: FirebaseError) => {
        if (error.message.includes('auth/invalid-email')) {
          setErrorMessage('メールアドレスの形式が正しくありません');
        } else if (error.message.includes('auth/user-disabled')) {
          setErrorMessage('アカウントが無効になっています');
        } else if (error.message.includes('auth/user-not-found')) {
          setErrorMessage('メールアドレスかパスワードが間違っています');
        } else if (error.message.includes('auth/invalid-login-credentials')) {
          setErrorMessage('メールアドレスかパスワードが間違っています');
        } else {
          setErrorMessage('ログインに失敗しました');
        }
      });
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div
      className={`
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: column;
      `}
    >
      <Container component='main' maxWidth='xs'>
        {errorMessage && <ErrorAlert message={errorMessage} />}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            border: '1px solid #ccc',
            boxShadow: 1,
            borderRadius: '10px',
          }}
        >
          <Typography component='h1' variant='h5'>
            ログイン
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              type='email'
              label='メールアドレス'
              name='email'
              onChange={handleChangeEmail}
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='パスワード'
              type='password'
              id='password'
              onChange={handleChangePassword}
            />
            <Button
              type='submit'
              fullWidth
              color='primary'
              variant='contained'
              sx={{
                mt: 3,
                mb: 2,
                color: 'black',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              ログイン
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#'>{'パスワードをお忘れですか?'}</Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Link href='/auth/register'>{'アカウントがありませんか? 新規作成'}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
