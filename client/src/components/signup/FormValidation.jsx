import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import FormLayout from "./FormLayout";
import { useAuth } from "../../context/AuthContext"

const FormValidation = ({ path }) => {
  const [nickname, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const { register, login } = useAuth();


  const hasSpaces = (value) => {
    return /\s/.test(value);
  };
  
  const isNameValid = nickname.trim().length >= 3 && !hasSpaces(nickname);
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    email
  );
  const isPasswordValid = !hasSpaces(password) &&
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
        setNameError("Nick Name must be at least 3 characters long and cannot contain spaces.");
      }
      if (!isEmailValid) {
        setEmailError("Invalid email address.");
      }
      if (!isPasswordValid) {
        setPasswordError(
          "Password must be 8 to 15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character and cannot contain spaces."
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
        // 닉네임, 이메일 중복 체크여부 유저한테 알려줘야함 이럴경우 alert창 띄우고 해당 인풋 비우기(context 함수 건드리기)
        console.error('Registration failed:', error);
      }
    } else {
      // login logic 
      console.log("Logging in with data:", { email, password });
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
