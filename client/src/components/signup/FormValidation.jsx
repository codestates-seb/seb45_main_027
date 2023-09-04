import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import FormLayout from "./FormLayout";
import { useAuth } from "../../context/AuthContext"

const FormValidation = ({ path }) => {
  const [nickname, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const { register, login } = useAuth();


  const isNameValid = nickname.trim().length >= 3 && !nickname.includes(" ");
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    email
  );
  const isPasswordValid = !password.includes(" ") &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,15}$/g.test(
      password
    ); 

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (path === "signup") {
      if (!isNameValid) {
        setNameError("Nick Name must be at least 3 characters.");
      }
      if (!isEmailValid) {
        setEmailError("Invalid email address.");
      }
      if (!isPasswordValid) {
        setPasswordError(
          "Password must be 8 to 15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      }

      if (!isNameValid || !isEmailValid || !isPasswordValid) {
        return;
      }

      // signup logic
      console.log("Signing up with data:", { nickname, email, password });
      try {
        await register(email, password);
      } catch (error) {
        // Handle registration error
        console.error('Registration failed:', error);
      }
    } else {
      // login logic 
      console.log("Logging in with data:", { email, password });
      // You can make an API call to validate the user's credentials
      try {
        await login(email, password);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <FormLayout
      path={path}
      name={nickname}
      email={email}
      password={password}
      nameError={nameError}
      emailError={emailError}
      passwordError={passwordError}
      handleNameChange={handleNameChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default FormValidation;
