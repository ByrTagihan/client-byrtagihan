import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom';

const DefaultLayout = () => {
let navigate = useNavigate();
const token = localStorage.getItem("token"); 
const parsedToken = JSON.parse(atob(token.split('.')[1])); 
const expirationTimestamp = parsedToken.exp; 

const isTokenExpired = () => {
  const currentTime = Math.floor(Date.now() / 1000); 
  return currentTime > expirationTimestamp;
};

const handleLogout = () => {
  console.log('Token expired. Logging out...');
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
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
