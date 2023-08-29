import React from "react";

const SignupLayout = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="text-[#00647B] text-7xl font-medium">Login!</div>
      <div className='flex flex-col'>
        <label for="email">Email</label>
        <input id="email" type="email" />
      </div>
      <div className='flex flex-col'>
        <label for="password">Password</label>
        <input 
         className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        id="password" type="password"/>
      </div>
      <button className='bg-[#00647B] text-white' type="submit">LOGIN</button>
    </div>
  );
};

export default SignupLayout;

// return (
//     <main
//       className={`flex justify-center w-full ${mainclassName}`}
//       style={style}
//     >
//       <div className={`flex w-full max-w-[1440px] ${divclassName}`}>
//         {children}
//       </div>
//     </main>
//   );
// };
