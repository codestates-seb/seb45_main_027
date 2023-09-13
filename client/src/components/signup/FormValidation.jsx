import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import FormLayout from "./FormLayout";
import { useAuth } from "../../context/AuthContext"

const FormValidation = ({ path }) => {
  const [nickname, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange, clearInput] = useInput("");
  const { register, login } = useAuth();


  const hasSpaces = (value) => {
    return /\s/.test(value);
  };
  
  const isNameValid = nickname.trim().length >= 2 && nickname.trim().length <= 10 && !hasSpaces(nickname);
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    email
  );
  const isPasswordValid = !hasSpaces(password) &&
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&()+|=])[A-Za-z\d~!@#$%^&()+|=]{6,15}$/.test(
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
        setNameError("닉네임은 2글자 이상 10글자 이하로 입력해주세요. 공백은 사용할 수 없습니다.");
      }
      if (!isEmailValid) {
        setEmailError("유요한 이메일을 입력해주세요.");
      }
      if (!isPasswordValid) {
        setPasswordError(
          "비밀번호는 6글자 이상 15글자 이하로 입력해주세요. 영문, 숫자, 특수문자가 반드시 포함되어야 하며 공백은 사용할 수 없습니다."
        );
      }

      if (!isNameValid || !isEmailValid || !isPasswordValid) {
        return;
      }

      // signup logic
      console.log("Signing up with data:", { email, nickname, password });
      try {
        await register(email, nickname, password);
      } catch (error) {
      }
    } else {
      // login logic 
      //console.log("Logging in with data:", { email, password });
      try {
        await login(email, password);
      } catch (error) {
        clearInput(password);
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
