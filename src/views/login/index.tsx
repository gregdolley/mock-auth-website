import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setValues({ ...values, [name]: value });
  }

  const destinationIsValid = (destination:string) => {
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

    let jwt =
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjo5NzY4LCJuYW1lIjoiT3JnTGFiIEFkbWluMyJ9LCJleHAiOjE2MjE0MDU1MzQsIm5iZiI6MTU4OTg2OTUzMywiY2xpZW50Ijp7ImlkIjoxNDIsImxvZ2luIjoiYWRtaW4iLCJhZG1pbiI6dHJ1ZX0sImJvb2ttYXJrIjoibmVvNGo6Ym9va21hcms6djE6dHgxMTcyIn0.bzRED7vzSr_Ts_DULZs5uYEsExqAtkDTRkfulP5TyME";
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
