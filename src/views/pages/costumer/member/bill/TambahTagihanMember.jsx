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
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../../utils/baseURL";

function TambahTagihanMember() {
  const param = useParams();
  const [description, setKeterangan] = useState("");
  const [periode, setPeriode] = useState();
  const [paid_amount, setPaid_amount] = useState("");

  const Add = async (e) => {
    if (localStorage.getItem("typer_token") === "customer") {
      e.preventDefault();
      e.persist();

      const data = {
        description: description,
        periode: periode,
        paid_amount: paid_amount,
      };

      try {
        await axios.post(`${API_DUMMY}/customer/member/9/bill`, data, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          });
        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire(
        "Peringatan",
        "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai admin",
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

  return (
    <div>
      {localStorage.getItem("type_token") === "customer" ? (
        <>
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
                    value={description}
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
                    value={periode}
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
                    onChange={(e) => setPaid_amount(e.target.value)}
                    value={paid_amount}
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
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </div>
  );
}

export default TambahTagihanMember;
