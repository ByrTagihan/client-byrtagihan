import {
  CAlert,
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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
  const [visible, setVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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

  const [idd, setId] = useState(0);
  const getById = async (id) => {
    try {
      const tokenType = localStorage.getItem("type_token");
      const token = localStorage.getItem("token");

      // Cek apakah user adalah "member"
      if (tokenType === "member") {
        // Fetch data notifikasi
        const response = await axios.get(`${API_DUMMY}/member/notif/${id}`, {
          headers: { "auth-tgh": `jwt ${token}` },
        });

        // Set state dengan data yang didapat dari response
        const { subject, message, id: notifId } = response.data.data;
        setSubject(subject);
        setMessage(message);
        setId(notifId);

        // Tandai notifikasi sebagai 'readed'
        await axios.put(`${API_DUMMY}/member/notif/${id}/readed`, null, {
          headers: { "auth-tgh": `jwt ${token}` },
        });

      } else {
        // Jika bukan member, tampilkan pesan peringatan
        Swal.fire(
          "Peringatan",
          "Anda tidak diizinkan mengakses API ini. Jika ingin melihat halaman ini maka login dulu sebagai admin",
          "error"
        ).then((result) => {
          // Redirect ke halaman utama
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 1500);

          // Bersihkan localStorage
          localStorage.clear();
        });
      }

    } catch (error) {
      // Tampilkan pesan error jika terjadi kesalahan
      console.error("Terjadi Kesalahan:", error);
      alert("Terjadi Kesalahan: " + error.message);
    }
  };


  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      {notif.map((data, index) => (
        <CCard key={index} style={{ background: "none", border: "none" }}>
          {/* <CCardBody> */}
          <CButton
            onClick={() => {
              setVisible(!visible);
              getById(data.id);
            }}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              textAlign: "left",
              color: "black",
            }}>
            <CAlert color="info" className="card-kotak-masuk shadow">
              {/* <CCol xs={1}> */}
              <CAvatar
                color="white"
                size="lg"
                className="icon-notif"
                textColor="white">
                <i className="fa-solid fa-bell position-relative">
                  {data.readed == true ? (
                    <></>
                  ) : (
                    <>
                      <CBadge
                        className="border border-light p-2"
                        color="danger"
                        position="top-end"
                        shape="rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                      </CBadge>
                    </>
                  )}
                </i>
              </CAvatar>
              {/* <div className="icon-notif">
                {" "}
                <i className="fa-solid fa-bell position-relative">
                  {data.readed == true ? (
                    <></>
                  ) : (
                    <>
                      <CBadge
                        className="border border-light p-2"
                        color="danger"
                        position="top-end"
                        shape="rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                      </CBadge>
                    </>
                  )}
                </i>
              </div> */}
              {/* </CCol> */}
              {/* <CCol> */}
              <div className="notif-name">
                <CCardTitle style={{ fontWeight: "bold" }}>
                  {data.subject}
                </CCardTitle>
                <p>{data.message}</p>
              </div>
              {/* </CCol> */}
            </CAlert>
          </CButton>
          {/* </CCardBody> */}
        </CCard>
      ))}
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel">
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Detail Notifikasi</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h4>{subject}</h4>
          <p>{message}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default KotakMasuk;
