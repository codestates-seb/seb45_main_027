import React from 'react';

const FormLayout = ({labelStyle, inputStyle, buttonStyle, path}) => {
    return (
      <form className="flex flex-col text-4xl mx-[10%]">
        {path === 'signup' && (<><label for="name" className={`${labelStyle}`}>
          Nick Name
        </label>
        <input className={`${inputStyle}`} id="name" type="text" /></>)}

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
}

export default FormLayout