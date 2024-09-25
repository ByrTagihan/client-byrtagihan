import React, { useEffect } from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import { useNavigate } from "react-router-dom";
import { CContainer } from "@coreui/react";
import "../css/DefaultLayout.css";

const DefaultLayout = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const parsedToken = JSON.parse(atob(token.split(".")[1]));
  const expirationTimestamp = parsedToken.exp;
  const role = localStorage.getItem("type_token");

  const isTokenExpired = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > expirationTimestamp;
  };

  const handleLogout = () => {
    //console.log('Token expired. Logging out...');
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    localStorage.clear();
  };

  useEffect(() => {
    const checkTokenExpiration = setInterval(() => {
      if (isTokenExpired()) {
        handleLogout();
        clearInterval(checkTokenExpiration);
      }
    }, 1000);
    return () => clearInterval(checkTokenExpiration);
  }, []);

  return (
    <>
      {localStorage.getItem("type_token") == "member" ? (
        <></>
      ) : (
        <>
          <AppSidebar />
        </>
      )}
      <div className={role === "member" ? "containerhp" : ""}>
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          {/* <div style={{background:"blue"}}>p</div> */}
          {localStorage.getItem("type_token") == "member" ? (
            <>
              <AppFooter />
            </>
          ) : (
            <></>
          )}
          <div className={role != "member" ? "px-4" : ""}>
            <AppContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
