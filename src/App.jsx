import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Login'
import Home from './pages/Home'
import Hero from './pages/Hero'
import NotFound from './pages/NotFound'

function App({iconList}) {
  return (
    <>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<Navigate to="/Home" />}
        />
        <Route
          exact path="/"
          element={
            <PrivateRoute>
              <Home />
           </PrivateRoute>
          }
        >          
        <Route
          path="Home"
          element={<Hero iconList={iconList}/>}
        />
        </Route>
        <Route path="/*" element={<NotFound/>} />
        </Routes>
    </>
  )
}

export default App
