import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const location = useLocation();

  if (!localStorage.getItem('token')) { 
    return <Navigate to='/login' state={{ from: location }} />
  }

  return children
}

export default PrivateRoute