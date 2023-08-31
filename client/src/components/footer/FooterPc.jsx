import React from "react";

const FooterPc = () => {
  const Members = [
    { url: "https://github.com/YebinYun", name: "윤 예빈" },
    { url: "https://github.com/greatjobcat", name: "최 유리" },
    { url: "https://github.com/WONHO22", name: "이 원호" },
    { url: "https://github.com/seonhoshin", name: "신 선호" },
    { url: "https://github.com/2DNDN", name: "박 두산" },
    { url: "https://github.com/Ernest45", name: "임 한준" },
    { url: "https://github.com/PeterAhnn", name: "안 형섭" },
  ];

  return (
    <footer className="flex flex-col h-52 py-8 bg-[#00647B] relative bottom-0 w-full">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img
            className="w-12 h-12"
            src="/images/삐삐Logo.png"
            alt="삐삐로고"
          />
          <span className="py-5 text-xl font-semibold text-white">
            © Copyright ⓒ 2023 삐삐
          </span>


          <ul className="flex text-xl font-semibold text-white">
            {Members.map((member, index) => (
              <li key={index} className="p-2 hover:bg-[#F5634A] rounded-2xl">
                <a href={member.url} target="_blank" rel="noreferrer">
                  {member.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default FooterPc;
