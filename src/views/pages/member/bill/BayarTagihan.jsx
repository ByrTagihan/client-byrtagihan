import React, { useEffect, useState } from "react";
import {
  CCard,
  CListGroup,
  CListGroupItem,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormSelect,
  CModalFooter,
  CAccordion,
  CAccordionHeader,
  CAccordionItem,
  CAccordionBody,
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/baseURL";
import Swal from "sweetalert2";

function BayarTagihan() {
  const [channel, setChannel] = useState([]);
  const [channel_id, setChannel_id] = useState("");
  const [visible, setVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [va_expired_date, setVa_expired_date] = useState("");
  const [channel_name, setChannel_name] = useState("");
  const [va_number, setVa_number] = useState("");
  const [bayar, setBayar] = useState({
    amount: "",
    va_expired_date: "",
    channel_name: "",
    va_number: "",
    descriptions: [],
  });
  const [role, setRole] = useState("");

  const GetChannel = async () => {
    if (role === "member") {
      try {
        const { data, status } = await axios.get(
          `${API_DUMMY}/member/channel`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        );
        if (status === 200) {
          setChannel(data.data);
          //console.log(data.data);
        }
      } catch (err) {
        //console.log(err);
      }
    } else {
      Swal.fire(
        "Peringatan",
        "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai siswa",
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

  const bayarTagihan = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      const data = {
        channel_id: channel_id,
      };
      await axios
        .post(`${API_DUMMY}/member/bill/${id}/payment`, data, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const byr = response.data.data;
          setBayar(byr);
          setAmount(byr.amount);
          setVa_expired_date(byr.va_expired_date);
          setChannel_name(byr.channel_name);
          setVa_number(byr.va_number);
          setShowCard(true); // Menampilkan card
        })
        .catch((error) => {
          //console.log(error);
          // Payment error
          if (
            error.response &&
            error.response.data &&
            error.response.data.description
          ) {
            const errorDescription = error.response.data.description;
            // Menggunakan data description dalam SweetAlert
            Swal.fire({
              title: "Error",
              text: errorDescription,
              icon: "warning",
            });
          }
        });
    } catch (error) {
      //console.log(error);
      // Request error
      Swal.fire({
        title: "Error",
        text: "Gagal melakukan permintaan pembayaran.",
        icon: "error",
      });
    }

    navigate(`/bayarTagihan/${id}`);
  };

  useEffect(() => {
    GetChannel();
    const userRoleFromServer = "member"; // Ganti dengan peran aktual dari data yang diterima
    setRole(userRoleFromServer);
  }, []);

  return (
    <div className="mb-5">
      {localStorage.getItem("type_token") === "Member" ? (
        <>
          {!showCard && (
            <CCard>
              <CListGroup flush>
                <CListGroupItem>
                  <b>Metode pembayaran</b>
                </CListGroupItem>
                <CListGroupItem>
                  <CFormSelect
                    aria-label="Default select example"
                    value={channel_id}
                    onChange={(e) => setChannel_id(e.target.value.toString())}
                  >
                    <option>Pilih metode pembayaran</option>
                    {channel.map((chan, i) => {
                      return (
                        <option value={chan.id} key={i}>
                          {chan.name}
                        </option>
                      );
                    })}
                  </CFormSelect>
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-end">
                  <CButton
                    color="danger"
                    className="me-2"
                    onClick={() => navigate(`/listTagihanMember`)}
                  >
                    Kembali
                  </CButton>
                  <CButton color="primary" onClick={bayarTagihan}>
                    Konfirmasi
                  </CButton>
                </CListGroupItem>
              </CListGroup>
            </CCard>
          )}
          {showCard && (
            <CCard>
              <CListGroup flush>
                <CListGroupItem>
                  <h3>Pembayaran</h3>
                </CListGroupItem>
                <CListGroupItem>
                  <p>Rincian: </p>
                  {bayar.descriptions.map((desc, index) => (
                    <ul key={index} className="ms-5">
                      <div className="d-flex justify-content-between">
                        <ul>
                          <li>{desc.description}:</li>
                        </ul>
                        <div>
                          <p className="text-end">
                            <b className="text-primary">Rp.{desc.amount}</b>
                          </p>
                        </div>
                      </div>
                    </ul>
                  ))}
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-between">
                  <p>Total pembayaran: </p>
                  <b className="text-primary">
                    Rp.
                    {bayar.descriptions.reduce(
                      (total, item) => total + item.amount,
                      0
                    )}
                  </b>
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-between">
                  <p>Jatuh tempo pada: </p>
                  <b className="text-primary">
                    {bayar.va_expired_date
                      ? new Date(bayar.va_expired_date)
                          .toISOString()
                          .slice(0, -5)
                      : ""}
                  </b>
                </CListGroupItem>
                <CListGroupItem>
                  <div className="d-flex justify-content-between">
                    <p>Bank: </p>
                    <b className="text-primary">{bayar.channel_name}</b>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>NO.Rekening: </p>
                    <b className="text-primary">{bayar.va_number}</b>
                  </div>
                </CListGroupItem>
                <CAccordion flush>
                  <CAccordionItem itemKey={1}>
                    <CAccordionHeader>
                      <p>Petunjuk Transfer</p>
                    </CAccordionHeader>
                    <CAccordionBody>
                      <p>1. Pilih Transfer Virtual Account Billing.</p>
                      <p>
                        2. Pilih Rekening Debet lalu masukkan nomor Virtual
                        Account{" "}
                        <b className="text-primary">{bayar.va_number}</b>.
                      </p>
                      <p>
                        3. Tagihan yang harus dibayar akan muncul konfirmasi.
                      </p>
                      <p>
                        4. Periksa informasi yang tertera dilayar. Pastikan
                        Merchant adalah byrtagihan. Total tagihan sudah benar?.
                        Jika benar, masukan password transaksi dan pilih lanjut
                      </p>
                    </CAccordionBody>
                  </CAccordionItem>
                </CAccordion>
                <CListGroupItem className="text-center">
                  <CButton
                    className="gap-2 col-4 mx-auto"
                    onClick={() => navigate(`/listTagihanMember`)}
                  >
                    Oke
                  </CButton>
                </CListGroupItem>
              </CListGroup>
            </CCard>
          )}
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}{" "}
    </div>
  );
}

export default BayarTagihan;
