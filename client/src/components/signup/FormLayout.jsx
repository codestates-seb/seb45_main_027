const FormLayout = ({
  path,
  name,
  email,
  password,
  nameError,
  emailError,
  passwordError,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
}) => {

  const inputStyle =
    "text-2xl px-4 py-3.5 mb-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300";
  const labelStyle = "text-3xl font-medium mt-6 mb-2 ml-2";
  const buttonStyle =
    "bg-[#00647B] text-white text-5xl font-medium rounded-full px-[5%] py-[5%] mt-[10%] mx-[8%] hover:bg-[#00647B]/80";
  const errorMessageStyle = "text-xl text-red-600 mb-8 ml-2";
  return (
    <form className="flex flex-col text-4xl mx-[10%] w-[290px] sm:w-[380px]" onSubmit={handleSubmit} noValidate>
      {path === "signup" && (
        <>
          <label htmlFor="name" className={`${labelStyle}`}>
            Nick Name
          </label>
          <input
            className={`${inputStyle}`}
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          {nameError && <div className={errorMessageStyle}>{nameError}</div>}
        </>
      )}

      <label htmlFor="email" className={`${labelStyle}`}>
        Email
      </label>
      <input
        className={`${inputStyle}`}
        id="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && <div className={errorMessageStyle}>{emailError}</div>}

      <label htmlFor="password" className={`${labelStyle}`}>
        Password
      </label>
      <input
        className={`${inputStyle}`}
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {passwordError && (
        <div className={errorMessageStyle}>{passwordError}</div>
      )}

      <button className={`${buttonStyle}`} type="submit">
        {path === "signup" ? `SIGN UP` : `LOGIN`}
      </button>
    </form>
  );
};

export default FormLayout;