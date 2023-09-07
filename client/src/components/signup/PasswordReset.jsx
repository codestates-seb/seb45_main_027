import React, { useState } from "react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [step, setStep] = useState("email"); // "email", "code", "newPassword"

  const handleEmailSubmit = async () => {
    try {
      // 이메일이 존재하는지 확인
      //await axios.post(`${baseURL}/auth/oauth`, { email });

      setStep("code");
    } catch (error) {
      alert("Email does not exist.");
      console.error("Password reset initiation failed:", error);
    }
  };

  const handleVerificationCodeSubmit = async () => {
    try {
      // 서버에서 유저 이메일로 인증코드 전송(새 비밀번호)
      // 서버로 이메일과 유저가 입력한 인증코드를 보내줌
      //await axios.post(`${baseURL}/auth/oauth`, { email, verificationCode });


      // 인증코드가 일치하면 새 비밀번호 입력창으로 이동? 아님 유저보고 알아서 하게 함? 후자일경우 이 밑으로 다 지운다
      setStep("newPassword");
    } catch (error) {
      console.error("Verification code validation failed:", error);
    }
  };

  const handleNewPasswordSubmit = async () => {
    try {
        // 새 비밀번호가 유효한지 추후 추가 예정
      if (newPassword !== confirmNewPassword) {
        console.error("Passwords do not match.");
        return;
      }

      //await axios.post(`${baseURL}/auth/oauth`, { email, verificationCode, newPassword });
      // 다 성공하면 로그인 페이지로 이동? 홈으로 이동?
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <div>
      {step === "email" && (
        <div>
          <h2>Find Password</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleEmailSubmit}>Submit</button>
        </div>
      )}

      {step === "code" && (
        <div>
          <h2>Enter Verification Code</h2>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerificationCodeSubmit}>Submit</button>
        </div>
      )}

      {step === "newPassword" && (
        <div>
          <h2>Set New Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button onClick={handleNewPasswordSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;
