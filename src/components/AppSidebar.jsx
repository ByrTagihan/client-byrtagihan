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

import "../css/AppSidebar.css"
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
    <CSidebarBrand className="d-none d-md-flex" to="/">
      <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
      <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
    </CSidebarBrand>
    <CSidebarNav>
      <SimpleBar>
        <AppSidebarNav items={navigation} />
          <button style={{marginTop: "110%", background:"none", color: "white", width: "100%"}} onClick={logout}>Logout</button>
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
