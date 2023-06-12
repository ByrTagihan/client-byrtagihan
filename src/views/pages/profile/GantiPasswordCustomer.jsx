import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const GantiPasswordCustomer = () => {
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_new_password, setConfirm_new_password] = useState("");

  const [password_lama, setPasswordLama] = useState("old_password");

  // const Puta = async (e) => {
  //   e.preventDefault();
  //   e.persist();

  //   const data = {
  //     old_password: old_password,
  //     new_password: new_password,
  //     confirm_new_password: confirm_new_password,
  //   };

  //   try {
  //     await axios.put(
  //       `https://api.byrtagihan.com/api/customer/password`,
  //       data,
  //       {
  //         headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //       }
  //     );

  //     if (new_password === confirm_new_password) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Password Tersimpan",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     } else if (old_password !== password_lama) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Password tidak sesuai dengan sebelumnya",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Different Password Confirmation",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 1500);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

 const Put = async (e, status) => {
  e.preventDefault();
    e.persist();

    const data = {
      old_password: old_password,
      new_password: new_password,
      confirm_new_password: confirm_new_password,
    };

    try {
      await axios.put(
        `https://api.byrtagihan.com/api/customer/password`,
        data,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      if (status ===  200) {
        Swal.fire({
          icon: "success",
          title: "Sukses mengedit password",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Password lama tidak sesuai",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
 }


// const Put = async (status) => {
//   const data = {
//     old_password: old_password,
//     new_password: new_password,
//     confirm_new_password: confirm_new_password,
//   };

//     if (status === 200) {
//       axios.put(
//         `https://api.byrtagihan.com/api/customer/password`,
//         data,
//         {
//           headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
//         }
//       ).then((res) => {
//         if (res.data.data.Edit === true) {
//           Swal.fire({
//             icon: "success",
//             title: "Sukses!",
//             showConfirmButton: false,
//             timer: 5500,
//           });

//           setTimeout(() => {
//             window.location.reload();
//           }, 1500);
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Tidak bisa",
//             showConfirmButton: false,
//             timer: 5500,
//           });
//         }
//       });
//     }
//   };
// };

  return (
    <div>
      <div className="bg-light min-vh-99 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={Put}>
                      <h3 style={{ color: "gray" }}>Ganti Password</h3>
                      <br />
                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ width: "26.5vh" }}>
                          Password Lama
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Password Lama"
                          autoComplete="passwordLama"
                          type="password"
                          onChange={(e) => setOld_password(e.target.value)}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText style={{ width: "26.5vh" }}>
                          Password Baru
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Password Baru"
                          autoComplete="passwordBaru"
                          type="password"
                          onChange={(e) => setNew_password(e.target.value)}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-4">
                        <CInputGroupText>Konfirmasi Password</CInputGroupText>
                        <CFormInput
                          placeholder="Konfirmasi Password Baru"
                          autoComplete="konfirmasiPasswordBaru"
                          type="password"
                          onChange={(e) =>
                            setConfirm_new_password(e.target.value)
                          }
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
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default GantiPasswordCustomer;
