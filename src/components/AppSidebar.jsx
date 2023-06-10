import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from '../assets/brand/logo-negative'
import { sygnet } from '../assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

// import "../css/AppSidebar.css"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Are You Sure You Want To Logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Success Logout",
          showConfirmButton: false,
          timer: 1500,
        });
        //Untuk munuju page selanjutnya
       navigate("/login");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear();
      }
    });
  };


  return (
    <CSidebar
    position="fixed"
    unfoldable={unfoldable}
    visible={sidebarShow}
    onVisibleChange={(visible) => {
      dispatch({ type: 'set', sidebarShow: visible })
    }}
  >
    <CSidebarBrand className="d-none d-md-flex" to="/home">
      <img src='https://o.remove.bg/downloads/10ac4362-d87e-43a9-ad06-f60b6185f4e8/branding-identity-corporate-b-logo-vector-design-template_460848-13934-removebg-preview.png' className="sidebar-brand-full" style={{width:"20%"}} width={10}/> 
      <p style={{marginRight:"20%", marginTop:"15px", fontWeight:"bold", fontSize:"20px"}}>Tagihan</p>
    </CSidebarBrand>
    <CSidebarNav>
      <SimpleBar>
        <AppSidebarNav items={navigation} />
      </SimpleBar>
    </CSidebarNav> 
    <CSidebarToggler
      className="d-none d-lg-flex"
      onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
    />
  </CSidebar>
  )
}

export default React.memo(AppSidebar)
