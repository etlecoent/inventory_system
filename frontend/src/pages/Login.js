import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn(props) {
  const { setToken } = props;

  let history = useHistory();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    state: false,
    statusCode: "",
    message: "",
  });

  const classes = useStyles();
  const axios = useAxios();

  const submitForm = (ev) => {
    ev.preventDefault();
    axios
      .post("/login", data)
      .then((res) => {
        const token = res.data.token;
        setToken(token);
        sessionStorage.setItem("jwt", token);
        history.push("/");
      })
      .catch((err) => {
        setError({ state: true, ...err.response.data });
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError({ ...error, state: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={error.state}
          onClose={handleClose}
          message={error.message}
          autoHideDuration={6000}
        />
        <form className={classes.form} noValidate onSubmit={submitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={data.email}
            onChange={(ev) => setData({ ...data, email: ev.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={(ev) => setData({ ...data, password: ev.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
