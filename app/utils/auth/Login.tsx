import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material";
import { css } from "@emotion/react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./AuthContext";
import { app } from "../firebase";

const Login = () => {
  const { user } = useAuthContext();
  const isLoggedIn = !!user;
  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/");
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleClose = async () => {
    await router.push("/");
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
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div
          className={`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            required
            onChange={handleChangeEmail}
            className={`
              padding-left: 12px;
            `}
          />
        </div>
        <div
          className={`
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 16px;
          `}
        >
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            required
            onChange={handleChangePassword}
            className={`
              padding-left: 12px;
            `}
          />
        </div>
        <div
          className={`
            display: flex;
            justify-content: flex-end;
            margin-top: 16px;
          `}
        >
          <Button type="submit" variant="outlined">
            ログイン
          </Button>
        </div>
        <div
          className={`
            display: flex;
            justify-content: flex-end;
            margin-top: 24px;
          `}
        >
          ユーザ登録は
          <Link href={"/signup"}>
            <a>こちら</a>
          </Link>
          から
        </div>
      </form>
    </div>
  );
};

export default Login;
