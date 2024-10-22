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
  const [profile, setprofile] = useState({
    picture: "",
  });
  const [picture, setPicture] = useState("");
  const [rfid_number, setRfIdNumber] = useState("");
  const role = localStorage.getItem("type_token");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [saldo, setSaldo] = useState({});
  const [visible, setVisible] = useState(false);
  const [visibleSaldo, setVisibleSaldo] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        console.log("data: ", response.data.dat);
        setSaldo(response.data.data);
        // setBalance(response.data.balance);
        // setName(response.data.name);
        // setSaldo(
        //   response.data.map((dt) => {
        //     dt.name;
        //     dt.balance;
        //   })
        // );
        // console.log("saldo: ",
        //   response.data.map((dt) => {
        //     dt.name;
        //     dt.balance;
        //   })
        // );

        setVisible(false);
        // Swal.fire({
        //   icon: "success",
        //   title: "RFID Valid!",
        //   text: "Anda akan diarahkan ke halaman cek saldo.",
        //   timer: 2000,
        //   showConfirmButton: false,
        // });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "RFID Tidak Valid",
          text: "Nomor RFID tidak ditemukan atau salah, coba lagi.",
        });
        console.log("error: ", error);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Input Kosong",
        text: "Harap masukkan nomor RFID.",
      });
    }
  };

  useEffect(() => {
    if (rfid_number) {
      const response = axios.get(
        `${API_DUMMY}/merchant/member/${rfid_number}/balance`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
            AuthPrs: `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
          },
        }
      );
      console.log("data: ", response.data);
      setSaldo(response.data);
      console.log("name: ", saldo.name);
    }
    let url;
    if (role == "merchant") {
      url = `${API_DUMMY}/merchant/profile`;
    } else if (role == "user") {
      url = `${API_DUMMY}/user/profile`;
    } else if (role == "member") {
      url = `${API_DUMMY}/member/profile`;
    } else if (role == "customer") {
      url = `${API_DUMMY}/customer/profile`;
    }
    if (url) {
      axios
        .get(url, {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
            AuthPrs: `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
          },
        })
        .then((response) => {
          const profil = response.data.data;
          setPicture(profil.picture);
          console.log("profile: ", response.data.data);
        })
        .catch((error) => {
          alert("Terjadi Kesalahan " + error);
        });
    }
  }, []);

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

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };
  return (
    <CDropdown variant="nav-item" alignment={role === "member" ? "end" : ""}>
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {picture ? (
          <img
            src={picture}
            alt=""
            style={{ borderRadius: "100%", width: "2.5rem" }}
          />
        ) : (
          <img
            src="https://freesvg.org/img/abstract-user-flat-4.png"
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
            <CDropdownItem href="/#/profileMerchant">
              <CIcon icon={cilUser} className="me-2" />
              Profile
            </CDropdownItem>
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
              label="Tab Kartu"
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
            <CButton
              color="primary"
              type="Submit"
              onClick={() => setVisibleSaldo(true)}>
              Submit
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
      <CModal
        visible={visibleSaldo}
        onClose={() => setVisibleSaldo(false)}
        aria-labelledby="LiveDemoExampleLabel">
        {/* <form onSubmit={handleSubmit}> */}
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Info Saldo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* {saldo.map((dt, index) => ( */}
          <>
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label="Nama"
              placeholder="Nama Member"
              value={saldo.name}
              aria-describedby="exampleFormControlInputHelpInline"
              readOnly
            />
            <br />
            <CFormInput
              type="text"
              id="exampleFormControlInput1"
              label="Sisa Saldo"
              placeholder="Sisa Saldo"
              value={formatRupiah(saldo.balance)}
              aria-describedby="exampleFormControlInputHelpInline"
              readOnly
            />
          </>
          {/* ))} */}
          <br />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleSaldo(false)}>
            Close
          </CButton>
        </CModalFooter>
        {/* </form> */}
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