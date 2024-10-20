import React, { useEffect } from "react";
import {
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilGraph,
  cilUserFemale,
  cibSuperuser,
  cilDollar,
  cilMoney,
  cilList,
  cilAccountLogout,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../../utils/baseURL";

import avatar8 from "./../../views/avatars/8.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AppHeaderDropdown = () => {
  const [foto, setFoto] = useState({
    picture: null,
  });
  const [rfid_number, setRfIdNumber] = useState("");
  const role = localStorage.getItem("type_token");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (rfid_number) {
      try {
        const response = await axios.get(
          `${API_DUMMY}/merchant/member/${rfid_number}/balance`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              AuthPrs: `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          }
        );
        const { name, balance } = response.data;

        // Redirect to the balance page with member info
        navigate("/cek-saldo", { state: { name, balance } });

        Swal.fire({
          icon: "success",
          title: "RFID Valid!",
          text: "Anda akan diarahkan ke halaman cek saldo.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "RFID Tidak Valid",
          text: "Nomor RFID tidak ditemukan atau salah, coba lagi.",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Input Kosong",
        text: "Harap masukkan nomor RFID.",
      });
    }
  };

  const logout = () => {
    Swal.fire({
      title: "Keluar Dari Akun Anda ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Success Logout",
          showConfirmButton: false,
          timer: 1500,
        });
        //Untuk munuju page selanjutnya
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear();
      }
    });
  };
  return (
    <CDropdown variant="nav-item" alignment={role === "member" ? "end" : ""}>
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {foto.picture ? (
          <img
            src={foto.picture}
            alt=""
            style={{ borderRadius: "100%", width: "2.5rem" }}
          />
        ) : (
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
            style={{ borderRadius: "100%", width: "2.5rem" }}
          />
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>
        {localStorage.getItem("type_token") === "customer" ? (
          <CDropdownItem href="/#/customerOrganization">
            <CIcon icon={cilGraph} className="me-2" />
            Organization
            {/* <CBadge color="info" className="ms-2">
              {customerOrganization.length}
            </CBadge> */}
          </CDropdownItem>
        ) : (
          <></>
        )}
        {localStorage.getItem("type_token") === "customer" ? (
          <CDropdownItem href="/#/customerMember">
            <CIcon icon={cibSuperuser} className="me-2" />
            Member
            {/* <CBadge color="info" className="ms-2">
              {customerMember.length}
            </CBadge> */}
          </CDropdownItem>
        ) : (
          <></>
        )}
        {localStorage.getItem("type_token") === "customer" ? (
          <CDropdownItem href="/#/customerBill">
            <CIcon icon={cilDollar} className="me-2" />
            Bill
            {/* <CBadge color="info" className="ms-2">
              {customerBill.length}
            </CBadge> */}
          </CDropdownItem>
        ) : (
          <></>
        )}

        {/* {localStorage.getItem("type_token") === "member" ? (
          <CDropdownItem href="/#/memberChannel">
            <CIcon icon={cilTask} className="me-2" />
            Channel
            <CBadge color="danger" className="ms-2">
              {memberchannel.length}
            </CBadge>
          </CDropdownItem>
        ) : (
          <></>
        )}
        {localStorage.getItem("type_token") === "member" ? (
          <CDropdownItem href="/#/listTagihanMember">
            <CIcon icon={cilMoney} className="me-2" />
            Bill
            <CBadge color="warning" className="ms-2">
              {customerBill.length}
            </CBadge>
          </CDropdownItem>
        ) : (
          <></>
        )} */}
        {localStorage.getItem("type_token") === "member" ? (
          <>
            <CDropdownItem href="/#/digitalCard">
              <CIcon icon={cilCreditCard} className="me-2" />
              Digital Card
              {/* <CBadge color="warning" className="ms-2">
              {customerBill.length}
            </CBadge> */}
            </CDropdownItem>
          </>
        ) : (
          <></>
        )}
        {localStorage.getItem("type_token") === "customer" ? (
          <CDropdownItem href="/#/customerProfile">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
        ) : (
          <></>
        )}

        {localStorage.getItem("type_token") === "user" ? (
          <CDropdownItem href="/#/userProfile">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
        ) : (
          <></>
        )}
        {localStorage.getItem("type_token") === "merchant" ? (
          <>
            <CDropdownItem href="/#/transaksi">
              <CIcon icon={cilDollar} className="me-2" />
              Transaksi
            </CDropdownItem>
            <CDropdownItem href="/#/listTransaksi">
              <CIcon icon={cilList} className="me-2" />
              List Transaksi
            </CDropdownItem>
            <CDropdownItem onClick={() => setVisible(!visible)}>
              <CIcon icon={cilCreditCard} className="me-2" />
              Cek Saldo
            </CDropdownItem>
          </>
        ) : (
          <></>
        )}

        {/* <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem> */}

        <CDropdownDivider />

        {localStorage.getItem("type_token") === "customer" ? (
          <CDropdownItem href="/#/gantiPasswordCustomer">
            <CIcon icon={cilLockLocked} className="me-2" />
            Ganti Password
          </CDropdownItem>
        ) : (
          <></>
        )}

        {localStorage.getItem("type_token") === "member" ? (
          <CDropdownItem href="/#/gantiPasswordMember">
            <CIcon icon={cilLockLocked} className="me-2" />
            Ganti Password
          </CDropdownItem>
        ) : (
          <></>
        )}

        <CDropdownItem onClick={logout}>
          {/* <div style={{padding:"none", background:"none", border:"none", textAlign:"left"}}> */}
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
          {/* </div> */}
        </CDropdownItem>
      </CDropdownMenu>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel">
        <form onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle id="LiveDemoExampleLabel">Cek Saldo</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="password"
              id="exampleFormControlInput1"
              label="Rfid Number"
              placeholder="*****"
              value={rfid_number}
              onChange={(e) => setRfIdNumber(e.target.value)}
              aria-describedby="exampleFormControlInputHelpInline"
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" type="Submit">
              Submit
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
// import React from 'react'

// function AppHeaderDropdown() {
//   return (
//     <div>AppHeaderDropdown</div>
//   )
// }

// export default AppHeaderDropdown
