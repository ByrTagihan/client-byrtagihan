import {
  CBadge,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/baseURL";
import "../../css/KotakMasuk.css";

function KotakMasuk() {
  const [notif, setNotif] = useState([]);
  const navigate = useNavigate();

  const getAllData = async () => {
    if (localStorage.getItem("type_token") === "member") {
      await axios
        .get(`${API_DUMMY}/member/notif`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          //   setTotalPages(res.data.pagination.total_page);
          setNotif(res.data.data);
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
    <>
      {notif.map((data, index) => (
        <CCard style={{ background: "#D1E9F6", border: "none" }}>
          <CCardBody>
            <div className="card-kotak-masuk">
              {/* <CCol xs={1}> */}
              <div className="icon-notif">
                {" "}
                <i class="fa-solid fa-bell position-relative">
                  <CBadge
                    className="border border-light p-2"
                    color="danger"
                    position="top-end"
                    shape="rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </CBadge>
                </i>
              </div>
              {/* </CCol> */}
              {/* <CCol> */}
              <div>
              <CCardTitle style={{ fontWeight: "bold" }}>
                {data.subject}
              </CCardTitle>
              <p>{data.message}</p></div>
              {/* </CCol> */}
            </div>
          </CCardBody>
        </CCard>
      ))}
    </>
  );
}

export default KotakMasuk;
