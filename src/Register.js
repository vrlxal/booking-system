import React, { useRef } from "react";
import Input from "./Input";
import { Button } from "@mui/material";

const RegisterPage = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    // You might want to implement your own validation logic here
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    console.log("Username: ", username);
    console.log("Password: ", password);

    // Then send username and password to your backend to register the user...
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Input
          title="Username"
          type="text"
          name="username"
          id="username"
          ref={usernameRef}
          autoComplete="username"
        />
        <Input
          title="Password"
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          autoComplete="new-password"
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
