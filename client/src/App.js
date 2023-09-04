import "./index.css";
import { Routes, Route, useLocation } from "react-router-dom";
import HeaderPc from "./components/header/HeaderPc";
// import HeaderMobile from "./components/header/HeaderMobile";
import HiddenFooter from "./components/footer/HiddenFooter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyInfo from "./pages/MyInfo";
import Main from "./pages/Main";
import ShowRoom from "./pages/ShowRoom";
import Tips from "./pages/Tips";
import Map from "./pages/Map";
import WriteShowRoom from "./pages/WriteShowRoom";
import WriteTips from "./pages/WriteTips";
import ViewShowRoom from "./pages/ViewShowRoom";
import ViewTips from "./pages/ViewTips";
import AccountSetting from "./pages/AccountSetting";

const headerPaths = [
  "myinfo",
  "showroom",
  "tips",
  "map",
  "login",
  "signup",
  "showroom/write",
  "tips/write",
  "showroom/:id/view",
  "tips/:id/view",
  "account",
  "",
];
const footerPaths = [
  "login",
  "signup",
  "myinfo",
  "showroom",
  "tips",
  "showroom/write",
  "tips/write",
  "showroom/:id/view",
  "tips/:id/view",
  "",
];

function App() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const isHeader = headerPaths.includes(path);
  const isFooter = footerPaths.includes(path);

  return (
    <>
      {isHeader && <HeaderPc />}
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/myinfo"} element={<MyInfo />} />
        <Route path={"/account"} element={<AccountSetting />} />
        <Route path={"/showroom"} element={<ShowRoom />} />
        <Route path={"/tips"} element={<Tips />} />
        <Route path={"/map"} element={<Map />} />
        <Route path={"/showroom/write"} element={<WriteShowRoom />} />
        <Route path={"/showroom/:id/view"} element={<ViewShowRoom />} />
        <Route path={"/tips/write"} element={<WriteTips />} />
        <Route path={"/tips/:id/view"} element={<ViewTips />} />
      </Routes>

      {/* {isFooter && <HiddenFooter />} */}
    </>
  );
}

export default App;
