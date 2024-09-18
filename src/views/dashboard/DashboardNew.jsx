import { Button } from "@coreui/coreui";
import CIcon from "@coreui/icons-react";
import {
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
// import { cisCreditCard } from '@coreui/icons';
// import { cidInfo } from '@coreui/icons';

function DashboardNew() {
  return (
    <>
      <div className="container-center">
        {/* <span>Test</span> */}{" "}
        <CCardTitle className="card-title-byr" style={{ marginTop: "-25%" }}>
          <hr />
          Selamat Datang Di <br /> <span>Bayar Tagihan Happy</span>
          <hr />
        </CCardTitle>
      </div>
      <CCard style={{ border: "none" }}>
        <CCardBody className="card-saldo">
          {/* <CRow> */}
          <div className="card-selamat-datang">
            <hr />
            <CCardTitle>
              Selamat Datang Di <br /> <span>Bayar Tagihan Happy</span>
            </CCardTitle>
            <hr />
          </div>
          <div className="card-info-saldo">
            <p>
              Saldo <br /> <CCardTitle className="strong">Rp 10.000</CCardTitle>
            </p>
            <CButton style={{ borderRadius: "20px" }}>
              <i class="fa-solid fa-circle-info"></i> Riwayat Isi Ulang
            </CButton>
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
          <CCallout color="primary" className="card-top-up">
            {/* <CCardBody> */}
            <CButton
              style={{
                background: "none",
                border: "none",
                color: "black",
              }}>
              {" "}
              <i
                // style={{
                //   color: "#3FA2F6",
                // }}
                class="fa-solid fa-credit-card top-up"></i>{" "}
              <span>Top Up</span>
            </CButton>
            {/* </CCardBody> */}
          </CCallout>
          {/* </div> */}
          {/* <div> */}
          <CCallout color="danger" className="card-top-up">
            <CButton
              style={{
                background: "none",
                border: "none",
                color: "black",
              }}>
              <i class="fa-solid fa-rectangle-list tagihan"></i>{" "}
              <span>Tagihan</span>
            </CButton>
          </CCallout>
          {/* </div> */}
          {/* <div> */}
          <CCallout color="success" className="card-top-up">
            <CButton
              style={{
                background: "none",
                border: "none",
                color: "black",
              }}><i class="fa-solid fa-user-check presensi"></i> <span>Presensi</span>
            </CButton>
          </CCallout>
          {/* </div> */}
          {/* <div> */}
          <CCallout color="warning" className="card-top-up">
            <CButton
              style={{
                background: "none",
                border: "none",
                color: "black",
              }}>
              <i class="fa-solid fa-coins coin"></i> <span>Transaksi</span>
            </CButton>
          </CCallout>
          {/* </div> */}
        </div>
        {/* </CContainer> */}
      </div>
      <DashboardMember />
    </>
  );
}

export default DashboardNew;
