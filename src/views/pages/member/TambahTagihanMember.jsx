import {
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function TambahTagihanMember() {
  const [memberId, setMemberId] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [periode, setPeriode] = useState();
  const [amount, setAmount] = useState(0);

  const Add = async (e) => {
    e.preventDefault();
    e.persist();

    // const data = {
    //   description: keterangan,
    //   periode: periode,
    //   amount: amount,
    // };

    try {
      await axios.post(
        `https://api.byrtagihan.com/api/customer/member/1/bill`,
        // data,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Sukses Menambahkan Tagihan",
        showConfirmButton: false,
        timer: 1500,
      });
      // alert("sukses")
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CCard className="p-4">
        <CCardBody>
          <CForm onSubmit={Add}>
            <h3 style={{ color: "gray" }}>Tambah Tagihan Siswa</h3>
            <br />
            <CInputGroup className="mb-3">
              <CInputGroupText style={{ width: "20vh" }}>
                Keterangan
              </CInputGroupText>
              <CFormInput
                placeholder="Keterangan..."
                autoComplete="keterangan"
                id="description"
                type="text"
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText style={{ width: "20vh" }}>
                Periode
              </CInputGroupText>
              <CFormInput
                placeholder="Periode..."
                autoComplete="periode"
                type="date"
                onChange={(e) => setPeriode(e.target.value)}
              />
            </CInputGroup>

            <CInputGroup className="mb-4">
              <CInputGroupText style={{ width: "20vh" }}>
                Nominal
              </CInputGroupText>
              <CFormInput
                placeholder="Nominal..."
                autoComplete="nominal"
                type="number"
                onChange={(e) => setAmount(e.target.value)}
              />
            </CInputGroup>

            <CRow>
              <CCol xs={6}>
                <button
                  style={{ backgroundColor: "#213555" }}
                  type="submit"
                  className="px-3 py-1.5"
                >
                  Tambah
                </button>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default TambahTagihanMember;
