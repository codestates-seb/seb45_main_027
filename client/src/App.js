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
import EditShowRoom from "./pages/EditShowRoom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/userContext";
import Verify from "./pages/Verify";
import { Toaster } from "react-hot-toast";

const headerPaths = [
  "myinfo",
  "showroom",
  "tips",
  "map",
  "login",
  "signup",
  "verify",
  "edit",
  "",
];
const footerPaths = [
  "login",
  "signup",
  "verify",
  "myinfo",
  "showroom",
  "tips",
  "edit",
  "",
];

function App() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const isHeader = headerPaths.includes(path);
  const isFooter = footerPaths.includes(path);

  return (
    <AuthProvider>
      <UserProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          {isHeader && <HeaderPc />}
          <div className="flex-grow">
            <Routes>
              <Route path={"/"} element={<Main />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/signup"} element={<Signup />} />
              <Route path={"/verify"} element={<Verify />} />
              <Route path={"/myinfo/:id"} element={<MyInfo />} />
              <Route path={"/showroom"} element={<ShowRoom />} />
              <Route path={"/tips"} element={<Tips />} />
              <Route path={"/map"} element={<Map />} />
              <Route path={"/showroom/write"} element={<WriteShowRoom />} />
              <Route path={"/showroom/:feedId"} element={<ViewShowRoom />} />
              <Route path={"/tips/write"} element={<WriteTips />} />
              <Route path={"/tips/:tipId"} element={<ViewTips />} />
              <Route
                path={"/showroom/edit/:feedId"}
                element={<EditShowRoom />}
              />
            </Routes>
          </div>
          {isFooter && <HiddenFooter />}
        </div>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
