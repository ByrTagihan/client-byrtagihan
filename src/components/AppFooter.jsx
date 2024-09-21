import React, { useEffect, useState } from "react";
import {
  CBadge,
  CButton,
  CCard,
  CCol,
  CContainer,
  CFooter,
  CNavLink,
  CRow,
} from "@coreui/react";
import "../css/AppFooter.css";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { API_DUMMY } from "../utils/baseURL";
import Swal from "sweetalert2";

const AppFooter = () => {
  const location = useLocation();
  const [notif, setNotif] = useState([]);

  const isActive = (path) => location.pathname === path;

  const getAllData = async () => {
    if (localStorage.getItem("type_token") === "member") {
      await axios
        .get(`${API_DUMMY}/member/notif`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          //   setTotalPages(res.data.pagination.total_page);
          setNotif(res.data.data.filter((notif) => !notif.readed));
          console.log(res.data.data);
          //console.log(res.data.data);
        })
        .catch((error) => {
          console.log("Terjadi Kesalahan" + error);
        });
    } else {
      Swal.fire(
        "Peringatan",
        "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai member",
        "error"
      ).then((result) => {
        //Untuk munuju page selanjutnya
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear();
      });
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <CFooter className="shadow" style={{ background: "white" }}>
      <CContainer>
        <div className="navbottom">
          <CNavLink
            component={NavLink}
            to="/"
            className={isActive("/") ? "active" : ""}>
            <i className="fa-solid fa-house"></i>{" "}
            {isActive("/") && (
              <span className="span1">Beranda</span>
            )}
          </CNavLink>

          {/* <CNavLink
            component={NavLink}
            to="/bill"
            className={isActive("/bill") ? "active" : ""}>
            <i className="fa-regular fa-rectangle-list"></i>{" "}
            {isActive("/bill") && <span className="span1">Bill</span>}
          </CNavLink> */}

          <CNavLink
            style={{ position: "relative" }}
            component={NavLink}
            to="/notifikasi"
            className={isActive("/notifikasi") ? "active" : ""}>
            <CBadge color="danger" position="top-end" shape="rounded-pill">
              {notif.length}{" "}
              <span className="visually-hidden">unread messages</span>
            </CBadge>
            <i className="fa-solid fa-bell"> </i>
            {isActive("/notifikasi") && (
              <span className="span1">Notifikasi</span>
            )}{" "}
          </CNavLink>
          {/* <CCol> */}
          <CNavLink
            component={NavLink}
            to="/memberProfile"
            className={isActive("/memberProfile") ? "active" : ""}>
            <i class="fa-solid fa-user"></i>{" "}
            {isActive("/memberProfile") && (
              <span className="span1">Profile</span>
            )}
          </CNavLink>
          {/* </CCol> */}
        </div>
      </CContainer>
    </CFooter>
  );
};

export default React.memo(AppFooter);
