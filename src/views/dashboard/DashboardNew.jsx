import { Button } from "@coreui/coreui";
import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CButton,
  CCallout,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import React from "react";
import "../css/DashboardNew.css";
import DashboardMember from "./DashboardMember";
import transaksi from "../../assets/images/transaksi.png";
import card from "../../assets/images/card.png";
// import { cisCreditCard } from '@coreui/icons';
// import { cidInfo } from '@coreui/icons';

function DashboardNew() {
  return (
    <div className="px-0">
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
      <CCard style={{ border: "none", background:"none" }}>
        <CCardBody className="card-saldo shadow">
          {/* <CRow> */}

          <div className="card-info-saldo" style={{color:"black"}}>
            <p>
              Saldo <br /> <CCardTitle className="strong">Rp 10.000</CCardTitle>
            </p>
            <CButton style={{ borderRadius: "20px" }}>
              <i className="fa-solid fa-circle-info"></i> Riwayat Isi Ulang
            </CButton>
          </div>
          <div className="card-selamat-datang px-3 py-2">
            {/* <hr /> */}
            {/* <img style={{ width: "100px" }} src={card} alt="" /> */}
            <i className="fa-solid fa-credit-card"></i>
            {/* <hr /> */}
          </div>
          {/* </CRow> */}
        </CCardBody>
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
              <span>Top Up</span>
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
              <span>Tagihan</span>
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
              <span>Presensi</span>
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
                src="https://cdn-icons-png.flaticon.com/512/9011/9011669.png"
                alt=""
              />
              <span>Transaksi</span>
            </CButton>
          </div>
          {/* </div> */}
        </div>
        {/* </CContainer> */}
      </div>
      {/* <DashboardMember /> */}
    </div>
  );
}

export default DashboardNew;
