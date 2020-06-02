import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

const defaultJwt = "<REMOVED FOR GITHUB> Put Jwt back here before running.";

const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: localStorage.getItem("email") || "",
    password: "",
    jwt: localStorage.getItem("jwt") || defaultJwt,
  });

  function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setValues({ ...values, [name]: value });

    if (typeof value === "string" && value.length > 0) {
      console.log("Saving to local storage...");
      console.log("Key = ", name);
      console.log("Value = ", value);

      localStorage.setItem(name, value);
    }
  }

  const destinationIsValid = (destination: string) => {
    try {
      const url = new URL(destination);
      const regex = /^((([a-z0-9\-_]+\.)+my_test\.com)|localhost)$/i;
      return regex.test(url.hostname);
    } catch (error) {
      console.error(error);
    }
  };

  function handleLogin(event: FormEvent) {
    event.preventDefault();

    let jwt = values.jwt;
    let url = new URLSearchParams(window.location.search).get("destination");

    if (url && destinationIsValid(url)) {
      let redirectMessage = "Redirecting to: ";
      let urlObject = new URL(url);

      urlObject.hash = `jwt=${jwt}`;
      redirectMessage += urlObject.toString().replace(jwt, "<jwt snipped...>");

      console.log(redirectMessage);

      window.location.assign(urlObject.toString());
    }
  }

  return (
    <section className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="input"
          placeholder="JWT"
          name="jwt"
          onChange={handleChangeValue}
          value={values.jwt}
        />
        <input
          className="input"
          placeholder="Email"
          name="email"
          onChange={handleChangeValue}
          value={values.email}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          onChange={handleChangeValue}
          value={values.password}
        />
        <button className="button" type="submit">
          Fake Login
        </button>
      </form>
      <button
        className="button-register"
        onClick={() => history.push("signup")}
      >
        ¡Signup!
      </button>
    </section>
  );
};
export default Login;
