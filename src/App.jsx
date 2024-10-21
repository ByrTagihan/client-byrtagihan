// App.js
import React, { Component, Suspense, useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import "./scss/style.scss";
import "./css/Style.css";
import ResetPassword from "./views/pages/reset/ForgotPasswor";
import PrivateRoute from "./utils/PrivateRoute";
import ForgotPasswordSiswa from "./views/pages/reset/ForgotPasswordSiswa";
import UserVerification from "./views/pages/user/VerificationCode";
import CustomerVerification from "./views/pages/costumer/VerificationCodeCustomer";
import ForgotPassUser from "./views/pages/reset/ForgotPassUser";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
import { analytics } from "../src/Firebase";
import { logEvent } from "firebase/analytics";
import PresensiHome from "./views/pages/user/newfeature/PresensiHome";
import PresensiLeave from "./views/pages/user/newfeature/PresensiLeave";

class App extends Component {
  render() {
    const LogPageView = () => {
      const location = useLocation();

      useEffect(() => {
        logEvent(analytics, "page_view", {
          page_path: location.pathname + location.search,
        });
      }, [location]);

      return null;
    };
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/presensiHome" name="Presens Home" element={<PresensiHome />} />
            <Route exact path="/presensileave" name="presensiLeave" element={<PresensiLeave />} />
            <Route
              exact
              path="/userVerification"
              name="userVerification"
              element={<UserVerification />}
            />
            <Route
              exact
              path="/costumerVerification"
              name="costumerVerification"
              element={<CustomerVerification />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              exact
              path="/reset"
              name="Reset"
              element={<ResetPassword />}
            />
            <Route
              exact
              path="/forgotPasswordSiswa"
              name="Forgot Password Siswa"
              element={<ForgotPasswordSiswa />}
            />
            <Route
              exact
              path="/forgotPassUser"
              name="Forgot Password Siswa"
              element={<ForgotPassUser />}
            />
            <Route
              path="*"
              name="Dashboard"
              element={
                <PrivateRoute>
                  <DefaultLayout />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
        <LogPageView />
      </HashRouter>
    );
  }
}

export default App;
