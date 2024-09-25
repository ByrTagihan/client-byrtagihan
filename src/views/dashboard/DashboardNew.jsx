import { Button } from "@coreui/coreui";
import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CButton,
  CCallout,
  CCard,
  CCardBody,
  CCardTitle,
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CCol,
  CContainer,
  CImage,
  CNavLink,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import "../css/DashboardNew.css";
import DashboardMember from "./DashboardMember";
import transaksi from "../../assets/images/transaksi.png";
import card from "../../assets/images/card.png";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_DUMMY } from "../../utils/baseURL";
import { Container } from "react-bootstrap";
// import { cisCreditCard } from '@coreui/icons';
// import { cidInfo } from '@coreui/icons';

function DashboardNew() {
  const [banner, setBanner] = useState([]);
  const navigate = useNavigate();

  const getAllData = async () => {
    if (localStorage.getItem("type_token") === "member") {
      await axios
        .get(`${API_DUMMY}/member/banner`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          //   setTotalPages(res.data.pagination.total_page);
          setBanner(res.data.data);
          console.log("banner: ", res.data.data);
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
      {/* <div style={{background:"blue"}}>
<p>Test</p>
    </div> */}

      {/* <div _ngcontent-kku-c80="" className="card mb-4 card-bg">
        <div
          _ngcontent-kku-c217=""
          className="d-flex flex-column justify-content-center py-5">
          <div _ngcontent-kku-c217="" className="row gx-4 align-items-center h-100">
            <div _ngcontent-kku-c217="" className="col-xl-6 col-xxl-12">
              <div
                _ngcontent-kku-c217=""
                className="text-center text-xl-start text-xxl-center px-4 mb-4 mb-xl-0 mb-xxl-4">
                <h3
                  _ngcontent-kku-c217=""
                  className="title-text"
                  style={{ fontWeight: "bold" }}>
                  Selamat Datang diBayar Tagihan Happy
                </h3>
                <p _ngcontent-kku-c217="" className="text-gray-700 mb-0">
                  Solusi praktis untuk membayar semua tagihan Anda! Nikmati
                  kemudahan dan kenyamanan dalam membayar tagihan, kapan saja
                  dan di mana saja. Bebas ribet, bayar tagihan jadi lebih Happy!
                </p>
              </div>
            </div>
            <div _ngcontent-kku-c217="" className="col-xl-6 col-xxl-12 text-center">
              <img
                _ngcontent-kku-c217=""
                src={transaksi}
                className="img-fluid"
                // style="max-width: 26rem;"
                style={{ maxWidth: "22rem" }}
              />
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="container-center">
        <CCardTitle className="card-title-byr" style={{ marginTop: "-25%" }}>
          <hr />
          Selamat Datang Di <br /> <span>Bayar Tagihan Happy</span>
          <hr />
        </CCardTitle>
      </div> */}
      <CCarousel className="itemcarousel" controls transition="crossfade">
        {banner.map((data, index) => (
          <CCarouselItem key={index} className="carousel-item ">
            {/* Gambar carousel */}
            <CImage
              className="d-block w-100 carousel-image"
              src={data.url_file}
              alt={`slide ${index + 1}`}
            />
            {/* Div untuk background gradien */}
            <div className="bg"><p style={{color:"transparent"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, commodi!</p></div>
          </CCarouselItem>
        ))}
      </CCarousel>

      <Container md className="px-3">
        <CCard style={{ border: "none", background: "none" }}>
          <div className="card-saldo shadow">
            {/* <CRow> */}

            <div className="card-info-saldo px-3" style={{ color: "black" }}>
              <i class="fa-solid fa-wallet"></i>
              <div>
                <p>
                  Saldo <br />{" "}
                  <CCardTitle className="strong">Rp 10.000</CCardTitle>
                </p>
              </div>
              {/* <CButton style={{ borderRadius: "20px" }}>
              <i className="fa-solid fa-circle-info"></i> Riwayat Isi Ulang
            </CButton> */}
            </div>
            <div className="card-selamat-datang px-4 py-2">
              <button>
                <i class="fa-solid fa-plus icon1"></i> <p>TopUp</p>
              </button>
              <button>
                <i class="fa-solid fa-plus icon1"></i>
                <p>Bayar</p>
              </button>
              <button>
              <i class="fa-solid fa-ellipsis-vertical icon2"></i>
                <p>Lainya</p>
              </button>
              {/* <CButton>
              <i class="fa-solid fa-coins"></i>
              <p>Transaksi</p>
            </CButton>
            <CButton>
              <i class="fa-solid fa-user"></i>
              <p>Presensi</p>
            </CButton> */}
              {/* <hr /> */}
              {/* <img style={{ width: "100px" }} src={card} alt="" /> */}
              {/* <i className="fa-solid fa-credit-card"></i> */}
              {/* <hr /> */}
            </div>
            {/* </CRow> */}
          </div>
        </CCard>
        <div className="card-menu">
          {/* <CCardBody> */}
          <h4>Menu</h4>
          {/* </CCardBody> */}
          {/* <CContainer> */}
          <div className="menu-card">
            {/* <div> */}
            <div className="card-top-up shadow-sm">
              {/* <CCardBody> */}
              <CButton
                style={{
                  background: "none",
                  border: "none",
                  color: "black",
                  fontWeight: "bold",
                }}>
                {" "}
                <img
                  src="https://cdn-icons-png.freepik.com/512/3757/3757881.png"
                  alt=""
                />
                {/* <i
                // style={{
                //   color: "#3FA2F6",
                // }}
                className="fa-solid fa-credit-card top-up"></i>{" "} */}
                <p>Top Up</p>
              </CButton>
              {/* </CCardBody> */}
            </div>
            {/* </div> */}
            {/* <div> */}
            <div className="card-top-up shadow-sm">
              <CButton
                style={{
                  background: "none",
                  border: "none",
                  color: "black",
                  fontWeight: "bold",
                }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1345/1345063.png"
                  alt=""
                />
                {/* <CBadge
                className="border border-light p-2"
                color="danger"
                position="top-end"
                shape="rounded-circle">
                <span className="visually-hidden">New alerts</span>
              </CBadge> */}
                {/* <i className="fa-solid fa-rectangle-list tagihan"></i>{" "} */}
                <p>Tagihan</p>
              </CButton>
            </div>
            {/* </div> */}
            {/* <div> */}
            <div className="card-top-up shadow-sm">
              <CButton
                style={{
                  background: "none",
                  border: "none",
                  color: "black",
                  fontWeight: "bold",
                }}>
                <img
                  src="https://cdn-icons-png.freepik.com/256/6645/6645221.png?semt=ais_hybrid"
                  alt=""
                />
                {/* <i className="fa-solid fa-user-check presensi"></i>{" "} */}
                <p>Presensi</p>
              </CButton>
            </div>
            {/* </div> */}
            {/* <div> */}
            <CNavLink
              to="/pagetransaction"
              component={NavLink}
              className="card-top-up shadow-sm">
              <CButton
                style={{
                  background: "none",
                  border: "none",
                  color: "black",
                  fontWeight: "bold",
                }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9011/9011669.png"
                  alt=""
                />
                <p>Transaksi</p>
              </CButton>
            </CNavLink>
            {/* </div> */}
          </div>
          {/* </CContainer> */}
        </div>
        {/* <DashboardMember /> */}
      </Container>
    </>
  );
}

export default DashboardNew;
