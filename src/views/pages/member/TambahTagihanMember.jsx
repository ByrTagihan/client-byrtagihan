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
import Swal from "sweetalert2";


function TambahTagihanMember() {

    const Add = async (e) => {
        e.preventDefault();
        e.persist();
    
        try {
          await axios.post(
            `https://api.byrtagihan.com/api/customer/member/${localStorage.getItem("id")}/bill`,{
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
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText style={{ width: "20vh" }}>
                Periode
              </CInputGroupText>
              <CFormInput
                placeholder="Periode..."
                autoComplete="periode"
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
              />
            </CInputGroup>

            <CRow>
              <CCol xs={6}>
                <button style={{backgroundColor: "#213555"}} type="submit"  className="px-3 py-1.5">
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
