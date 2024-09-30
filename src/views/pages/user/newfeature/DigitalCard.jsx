import React from "react";
import "../../../css/DigitalCard.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../../../../src/utils/baseURL";

function DigitalCard() {
  const [member, setMember] = useState({});
  const navigate = useNavigate();

  // Function get
  const get = async () => {
    if (localStorage.getItem("type_token") === "member") {
      try {
        const { data, status } = await axios.get(`${API_DUMMY}/member/card`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        if (status === 200) {
          console.log("Data dari API:", data); // Periksa seluruh data
          console.log("Data.data:", data.data); // Periksa data.data
          console.log("name: ", data.data.name);

          // Pastikan bahwa data.data adalah array
          // if (Array.isArray(data.data)) {
          setMember(data.data);
          // } else {
          //   console.error("Data yang diterima bukan array");
          //   setMember([]); // Atur state ke array kosong jika data tidak valid
          // }
        }
      } catch (err) {
        console.error("Terjadi Kesalahan", err); // Gunakan console.error untuk kesalahan
      }
    } else {
      Swal.fire(
        "Peringatan",
        "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai member",
        "error"
      ).then((result) => {
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear();
      });
    }
  };

  useEffect(() => {
    get();
    console.log("member name: ", member.name);
  }, []);
  return (
    <div className="container card-container">
      {localStorage.getItem("type_token") === "member" ? (
        <>
          <div className="card-header">
            {/* <button className="back-button">&larr;</button> */}
            <h2>Digital Card</h2>
          </div>

          {/* {Array.isArray(member) && member.length > 0 ? (
          member.map((mem) => ( */}
          <div>
            <div className="card-info">
              <div className="card-balance">
                <h3 className="card-owner">
                  {member.name}
                  {/* KRISNA ABDUL RASYID PUSPITO SUGIYARTO */}
                </h3>
                <p className="balance-label">Card Balance</p>
                <h1 className="balance">Rp {member.balance}</h1>
                <p className="nfc-id">NFC ID: {member.va_wallet}</p>
              </div>
            </div>

            <div className="info-section">
              <h4>Information Card</h4>
              <div className="info-details">
                <div className="info-item">
                  <span className="label">Maximum Accumulation Limit</span>
                  <span className="colon">:</span>
                  <span className="value">{member.max_accumulate_limit}</span>
                </div>
                <div className="info-item">
                  <span className="label">Daily Limit</span>
                  <span className="colon">:</span>
                  <span className="value">{member.daily_limit}</span>
                </div>
                <div className="info-item">
                  <span className="label">Last Sync</span>
                  <span className="colon">:</span>
                  <span className="value">-</span>
                </div>
              </div>
            </div>
          </div>
          {/* //   ))
              // ) : (
              //   <p>No members available</p>
              // )} */}

          <div className="menu-section">
            <h4>Card Menu</h4>
            <div className="menu-buttons">
              <button className="menu-button sync-button">
                <span className="icon-wrapper">
                  <i className="fa-solid fa-rotate"></i>
                </span>
                Sync History
              </button>
              <button className="menu-button help-button">
                <span className="icon-wrapper">
                  <i className="fa-solid fa-question"></i>
                </span>
                Help
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
      <br />
      <br />
    </div>
  );
}

export default DigitalCard;
