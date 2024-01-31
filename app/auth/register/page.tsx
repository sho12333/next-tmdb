'use client';

import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ErrorAlert from '../../../utils/error/ErrorSnackBar';
import { FirebaseError } from 'firebase/app';
import Link from 'next/link';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/');
      })
      .catch((error: FirebaseError) => {
        if (error.message.includes('invalid-email')) {
          setErrorMessage('メールアドレスの形式が正しくありません');
        } else if (error.message.includes('email-already-in-use')) {
          setErrorMessage('既に登録されているメールアドレスです');
        } else if (error.message.includes('weak-password')) {
          setErrorMessage('パスワードは6文字以上で入力してください');
        } else if (error.message.includes('operation-not-allowed')) {
          setErrorMessage('メールアドレスとパスワードでの登録は無効になっています');
        } else if (error.message.includes('invalid-credential')) {
          setErrorMessage('メールアドレスの形式が正しくありません');
        } else {
          setErrorMessage('ユーザー登録に失敗しました');
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
            ユーザー登録
          </Typography>
          <Box component='form' onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
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
              登録
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/auth/login'>{'登録済みですか?  ログイン'}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterPage;
