import React, { useEffect } from "react";
import {
  CAvatar,
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
  const [channel, setChannel] = useState([]);
  const [channell, setChannell] = useState("");

  const getAll = async () => {
    await axios
      .get(`${API_DUMMY}/customer/profile`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setFoto(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllTransaction = async () => {
    await axios
      .get(`${API_DUMMY}/user/transaction?limit=10000`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setBills(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllMessage = async () => {
    await axios
      .get(`${API_DUMMY}/user/message`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setMessage(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllPayment = async () => {
    await axios
      .get(`${API_DUMMY}/user/payment?limit=10000`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setList(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const getAllChannel = async () => {
    await axios
      .get(`${API_DUMMY}/user/channel?limit=10000`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setChannel(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll();
    getAllPayment();
    getAllTransaction();
    getAllMessage();
    getAllChannel();
  }, []);
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
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="/#/mesage">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            {message.length}
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="/#/userChannel">
          <CIcon icon={cilTask} className="me-2" />
          Channel
          <CBadge color="danger" className="ms-2">
            {channel.length}
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem href="/#/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        {/* {localStorage.getItem(
          "type_token" === "user" ? ( */}
            <CDropdownItem href="/#/payment">
              <CIcon icon={cilCreditCard} className="me-2" />
              Payments
              <CBadge color="secondary" className="ms-2">
                {list.length}
              </CBadge>
            </CDropdownItem>
        {/* //   ) : (
        //     <></>
        //   )
        // )} */}
        <CDropdownItem href="/#/transaction">
          <CIcon icon={cilFile} className="me-2" />
          Transaction
          <CBadge color="primary" className="ms-2">
            {bills.length}
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="/#/gantiPasswordCustomer">
          <CIcon icon={cilLockLocked} className="me-2" />
          Ganti Password
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
