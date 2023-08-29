import "./App.css";
import { Routes, Route } from "react-router-dom";
import HeaderPc from "./components/header/HeaderPc";
import FooterPc from "./components/footer/FooterPc";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Myinfo from "./pages/Myinfo";
import Main from "./pages/Main";
import ShowRoom from "./pages/ShowRoom";
import Tips from "./pages/Tips";
import Map from "./pages/Map";

function App() {
  return (
    <>
      <HeaderPc />
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/myinfo"} element={<Myinfo />} />
        <Route path={"/showroom"} element={<ShowRoom />} />
        <Route path={"/tips"} element={<Tips />} />
        <Route path={"/map"} element={<Map />} />
      </Routes>

      <FooterPc />
    </>
  );
}

export default App;
