import { CCard, CCardBody, CCardTitle, CCol, CRow } from "@coreui/react";
import React from "react";

function KotakMasuk() {
  return (
    <>
      <CCard style={{ background: "#D1E9F6", border: "none" }}>
        <CCardBody>
          <CRow>
            <CCol xs={1}><i style={{background:"white", padding:"10px", fontSize:"30px", borderRadius:"100%", color:"orange"}} class="fa-solid fa-bell"></i></CCol>
            <CCol>
              <CCardTitle style={{fontWeight:"bold"}}>Transaksi Kartu Digital</CCardTitle>
              <p>Transaksi Kartu AbuYaqu Mart Sebesar Rp 1.000.000</p>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
}

export default KotakMasuk;
