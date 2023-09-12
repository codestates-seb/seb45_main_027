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
    "text-2xl px-4 py-3 mb-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full";
  const labelStyle =
    "flex justify-start text-2xl font-medium mt-6 mb-2 ml-2 Showcard-Gothic text-lg ";
  const buttonStyle =
    "flex self-center justify-center w-full my-8 bg-[#00647B] hover:bg-[#00647bb4] shadow py-4 px-6 text-2xl font-semibold text-white rounded-md";
  const errorMessageStyle = "text-xl text-red-600 mb-8 ml-2";
  return (
    <form
      className="flex flex-col justify-center items-start text-4xl mx-[10%] px-[10%] w-[320px] md:w-[380px]"
      onSubmit={handleSubmit}
      noValidate>
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

      <label
        htmlFor="email"
        className={`${labelStyle}`}>
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

      <label
        htmlFor="password"
        className={`${labelStyle}`}>
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

      <button className={`${buttonStyle} `} type="submit">
        <span>{path === "signup" ? `SIGN UP` : `LOGIN`}</span>
      </button>
    </form>
  );
};

export default FormLayout;
