import { app } from "../firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./AuthContext";

const SignUp = () => {
  const router = useRouter();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useAuthContext();
  const isLoggedIn = !!user;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async () => {
    await router.push("/");
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
      <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています
        </Alert>
      </Snackbar>
      <h2>ユーザー登録</h2>
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
            登録
          </Button>
        </div>
        <div
          className={`
            display: flex;
            justify-content: flex-end;
            margin-top: 24px;
          `}
        >
          <Link href={"/login"}>
            <a>すでに登録している人はこちら</a>
          </Link>
        </div>
      </form>
    </div>
  );
};
