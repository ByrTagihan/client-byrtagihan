import React, { useEffect } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
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
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../../utils/baseURL";

import avatar8 from "./../../views/avatars/8.jpg";

const AppHeaderDropdown = () => {
  const [foto, setFoto] = useState({
    picture: null,
  });

  const [list, setList] = useState([]);
  const [bills, setBills] = useState([]);
  const [message, setMessage] = useState([]);
  const [userchannel, setUserChannel] = useState([]);
  const [memberchannel, setMemberChannel] = useState([]);
  const [bill, setBill] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [customerOrganization, setCustomerOrganization] = useState([]);
  const [template, setTemplate] = useState([]);
  const [customerMember, setCustomerMember] = useState([]);
  const [customerBill, setCustomerBill] = useState([]);

  // const getAllTransaction = async () => {
  //   await axios
  //     .get(`${API_DUMMY}/user/transaction?limit=10000`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     })
  //     .then((res) => {
  //       setBills(res.data.data);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };

  // const getAllMessage = async () => {
  //   await axios
  //     .get(`${API_DUMMY}/user/message?limit=10000`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     })
  //     .then((res) => {
  //       setMessage(res.data.data);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };

  // const getAllPayment = async () => {
  //   await axios
  //     .get(`${API_DUMMY}/user/payment?limit=10000`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     })
  //     .then((res) => {
  //       setList(res.data.data);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };

  // const getAllUserChannel = async () => {
  //   await axios
  //     .get(`${API_DUMMY}/user/channel?limit=10000`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     })
  //     .then((res) => {
  //       setUserChannel(res.data.data);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };

  // // const getAllMemberChannel = async () => {
  // //   await axios
  // //     .get(`${API_DUMMY}/member/channel?limit=10000`, {
  // //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  // //     })
  // //     .then((res) => {
  // //       setMemberChannel(res.data.data);
  // //     })
  // //     .catch((error) => {
  // //       alert("Terjadi Kesalahan" + error);
  // //     });
  // // };

  // // const getAllBill = async () => {
  // //   await axios
  // //     .get(`${API_DUMMY}/member/bill`, {
  // //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  // //     })
  // //     .then((res) => {
  // //       setBill(res.data.data);
  // //     })
  // //     .catch((error) => {
  // //       alert("Terjadi Kesalahan" + error);
  // //     });
  // // };

  // const getAllOrganization = async () => {
  //   await axios
  //     .get(`${API_DUMMY}/user/organization?limit=10000`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     })
  //     .then((res) => {
  //       setOrganization(res.data.data);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };

  // const getAllTemplate = async () => {
  //   await axios
  //     .get(`${API_DUMMY}/user/template?limit=10000`, {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     })
  //     .then((res) => {
  //       setTemplate(res.data.data);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };
  // useEffect(() => {
  //   getAllPayment();
  //   getAllTransaction();
  //   getAllMessage();
  //   getAllUserChannel();
  //   // getAllMemberChannel();
  //   // getAllBill();
  //   getAllOrganization();
  //   getAllTemplate();
  //   // getCustomerOrganization();
  //   // getCustomerMember();
  //   // getCustomerBill();
  // }, []);
  return (
    <CDropdown variant="nav-item">
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
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>
        {localStorage.getItem("type_token") === "user" ? (
          <CDropdownItem href="/#/userOrganization">
            <CIcon icon={cilGraph} className="me-2" />
            Organization
            {/* <CBadge color="info" className="ms-2">
              {organization.length}
            </CBadge> */}
          </CDropdownItem>
        ) : (
          <></>
        )}
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
        {localStorage.getItem("type_token") === "user" ? (
          <CDropdownItem href="/#/mesage">
            <CIcon icon={cilEnvelopeOpen} className="me-2" />
            Messages
            {/* <CBadge color="success" className="ms-2">
              {message.length}
            </CBadge> */}
          </CDropdownItem>
        ) : (
          <></>
        )}
        {localStorage.getItem("type_token") === "user" ? (
          <CDropdownItem href="/#/userChannel">
            <CIcon icon={cilTask} className="me-2" />
            Channel
            {/* <CBadge color="danger" className="ms-2">
              {userchannel.length}
            </CBadge> */}
          </CDropdownItem>
        ) : (
          <></>
        )}
        {localStorage.getItem("type_token") === "user" ? (
          <CDropdownItem href="/#/UserTemplate">
            <CIcon icon={cilTask} className="me-2" />
            Template
            {/* <CBadge color="danger" className="ms-2">
              {template.length}
            </CBadge> */}
          </CDropdownItem>
        ) : (
          <></>
        )}
        {localStorage.getItem("type_token") === "member" ? (
          <CDropdownItem href="/#/memberChannel">
            <CIcon icon={cilTask} className="me-2" />
            Channel
            {/* <CBadge color="danger" className="ms-2">
              {memberchannel.length}
            </CBadge> */}
          </CDropdownItem>
        ) : (
          <></>
        )}
        {localStorage.getItem("type_token") === "member" ? (
          <CDropdownItem href="/#/listTagihanMember">
            <CIcon icon={cilCommentSquare} className="me-2" />
            Bill
            {/* <CBadge color="warning" className="ms-2">
              {customerBill.length}
            </CBadge> */}
          </CDropdownItem>
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

        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        {localStorage.getItem("type_token") === "user" ? (
          <CDropdownItem href="/#/payment">
            <CIcon icon={cilCreditCard} className="me-2" />
            Payments
            <CBadge color="secondary" className="ms-2">
              {list.length}
            </CBadge>
          </CDropdownItem>
        ) : (
          <></>
        )}
        {localStorage.getItem("type_token") === "user" ? (
          <CDropdownItem href="/#/transaction">
            <CIcon icon={cilFile} className="me-2" />
            Transaction
            <CBadge color="primary" className="ms-2">
              {bills.length}
            </CBadge>
          </CDropdownItem>
        ) : (
          <></>
        )}
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
      </CDropdownMenu>
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
