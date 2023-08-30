import React from "react";

const FormLayout = ({ path }) => {
  const inputStyle =
    "px-4 py-3.5 mb-6 border rounded-full focus:outline-none focus:ring focus:border-blue-300";
  const labelStyle = "text-3xl font-medium mb-2 ml-2";
  const buttonStyle =
    "bg-[#00647B] text-white text-5xl font-medium rounded-full px-[5%] py-[5%] mt-[10%] mx-[8%] hover:bg-[#00647B]/80";

  return (
    <form className="flex flex-col text-4xl mx-[10%]">
      {path === "signup" && (
        <>
          <label for="name" className={`${labelStyle}`}>
            Nick Name
          </label>
          <input className={`${inputStyle}`} id="name" type="text" />
        </>
      )}

      <label for="email" className={`${labelStyle}`}>
        Email
      </label>
      <input className={`${inputStyle}`} id="email" type="email" />

      <label for="password" className={`${labelStyle}`}>
        Password
      </label>
      <input className={`${inputStyle}`} id="password" type="password" />

      <button className={`${buttonStyle}`} type="submit">
        SIGN UP
      </button>
    </form>
  );
};

export default FormLayout;
