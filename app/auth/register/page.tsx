'use client'

import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import ErrorAlert from '../../../utils/error/ErrorSnackBar'

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage('ログインに失敗しました')
      })
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  return (
    <div
      className={`
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: column;
      `}
    >
      <Container component='main' maxWidth='xs' onSubmit={handleRegister}>
        <ErrorAlert message={errorMessage} />

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
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default RegisterPage
