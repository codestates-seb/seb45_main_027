import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import FormLayout from "./FormLayout";
import { useAuth } from "../../context/AuthContext";

const FormValidation = ({ path }) => {
  const [nickname, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange, clearInput] = useInput("");
  const { register, login } = useAuth();

  const hasSpaces = (value) => {
    return /\s/.test(value);
  };

  const validateForm = () => {
    const nameError = validateName();
    const emailError = validateEmail();
    const passwordError = validatePassword();
    return { nameError, emailError, passwordError };
  };

  const validateName = () => {
    if (path === "signup") {
      if (!nickname) {
        return "닉네임을 입력하세요.";
      }
      if (nickname.length < 2 || nickname.length > 10) {
        return "닉네임은 2글자 이상 10글자 이하이어야 합니다.";
      }
      if (hasSpaces(nickname)) {
        return "닉네임에 공백을 사용할 수 없습니다.";
      }
    }
    return "";
  };

  const validateEmail = () => {
    if (!email) {
      return "이메일을 입력하세요.";
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return "유효한 이메일을 입력하세요.";
    }
    return "";
  };

  const validatePassword = () => {
    if (!password) {
      return "비밀번호를 입력하세요.";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&()+|=])[A-Za-z\d~!@#$%^&()+|=]{6,15}$/.test(password)) {
      return "비밀번호는 6글자 이상 15글자 이하이어야 하며 영문, 숫자, 특수문자를 포함해야 합니다.";
    }
    return "";
  };

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFormChange = () => {
    const { nameError, emailError, passwordError } = validateForm();
    setNameError(nameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleFormChange();

    if (path === "signup") {
      if (nameError || emailError || passwordError) {
        return;
      }
      // signup logic
      console.log("Signing up with data:", { email, nickname, password });
      try {
        await register(email, nickname, password);
      } catch (error) {}
    } else {
      // login logic
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
      handleNameChange={(e) => {
        handleNameChange(e);
        handleFormChange();
      }}
      handleEmailChange={
        (e) => {
          handleEmailChange(e);
          handleFormChange();
        }}
      handlePasswordChange={(e) => {
        handlePasswordChange(e);
        handleFormChange();
      }}
      handleSubmit={handleSubmit}
    />
  );
};

export default FormValidation;
