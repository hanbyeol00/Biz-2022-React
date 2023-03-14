import { Button, Container, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useFirebaseContext } from "../provider/firebaseProvider";

const EmailLogin = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { loginMessage, emailLogin } = useFirebaseContext();

  const onChangeHandler = useCallback(
    (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    },
    [setUser, user]
  );

  return (
    <Container fixed maxWidth="xl">
      <div>
        <TextField
          name="email"
          value={user.email}
          variant="outlined"
          fullWidth
          margin="dense"
          label="EMAIL"
          onChange={onChangeHandler}
          error={loginMessage.id === "email"}
          helperText={loginMessage.id === "email" ? loginMessage.message : ""}
        />
      </div>
      <div>
        <TextField
          name="password"
          value={user.password}
          variant="outlined"
          fullWidth
          margin="dense"
          label="PASSWORD"
          type={"password"}
          onChange={onChangeHandler}
          error={loginMessage.id === "password"}
          helperText={
            loginMessage.id === "password" ? loginMessage.message : ""
          }
        />
      </div>
      <div>
        {loginMessage.id === "etc" ? <p>{loginMessage.message}</p> : <></>}
        <Button
          variant="outlined"
          onClick={() => {
            emailLogin(user);
          }}
        >
          Email 로그인
        </Button>
      </div>
    </Container>
  );
};

export default EmailLogin;
