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
import { API_DUMMY } from "../../../../../utils/baseURL";

function EditTagihanMember() {
  const Put = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      await axios.put(`${API_DUMMY}/customer/member/9/bill/7`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Tersimpan",
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
          <CForm onSubmit={Put}>
            <h3 style={{ color: "gray" }}>Edit Tagihan Siswa</h3>
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
              <CFormInput placeholder="Periode..." autoComplete="periode" />
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
                <button
                  style={{ backgroundColor: "#213555" }}
                  type="submit"
                  className="px-3 py-1.5"
                >
                  Simpan
                </button>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default EditTagihanMember;
