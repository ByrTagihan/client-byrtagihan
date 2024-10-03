import React, { useEffect, useState } from "react";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CButton,
  CFormCheck,
  CContainer,
} from "@coreui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_DUMMY } from "../../../../utils/baseURL";
import "../../../css/ListDataSiswa.css";
import Swal from "sweetalert2";
import { useSelectedBillIds } from "./SelectedBillIdsContext";

function ListTagihan() {
  const [bill, setBill] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBills, setSelectedBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const { selectedBillIds, setSelectedBillIds } = useSelectedBillIds();

  // Function get
  const get = async () => {
    if (localStorage.getItem("type_token") === "member") {
      try {
        const { data, status } = await axios.get(`${API_DUMMY}/member/bill`, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          });
        if (status === 200) {
          setBill(data.data);
        }
      } catch (err) {
        console.log(err);
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

  // // Fungsi untuk melakukan pembayaran setelah konfirmasi
  // const handleBayarTagihan = async (billId) => {
  //   try {
  //     const response = await axios.post(
  //       `${API_DUMMY}/member/bill/${billId}/wallet`, // endpoint yang dipanggil
  //       {},
  //       {
  //         headers: {
  //           "auth-tgh": `jwt ${localStorage.getItem("token")}`, // pastikan token tersimpan
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       Swal.fire("Sukses", "Pembayaran berhasil!", "success");
  //       navigate("/dashboardNew"); // redirect ke halaman setelah pembayaran
  //     } else {
  //       Swal.fire("Gagal", "Pembayaran gagal, coba lagi nanti.", "error");
  //     }
  //   } catch (error) {
  //     Swal.fire(
  //       "Error",
  //       "Terjadi kesalahan saat memproses pembayaran.",
  //       "error"
  //     );
  //     console.error(error);
  //   }
  // };

  // // Fungsi untuk menampilkan dialog konfirmasi sebelum pembayaran
  // const confirmBayar = (billId) => {
  //   Swal.fire({
  //     title: "Konfirmasi Pembayaran",
  //     text: "Apakah Anda yakin ingin membayar tagihan ini?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Ya, bayar",
  //     cancelButtonText: "Tidak",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handleBayarTagihan(billId); // Panggil fungsi pembayaran jika pengguna memilih "Ya"
  //     }
  //   });
  // };

  // Fungsi untuk melakukan pembayaran setelah konfirmasi


  // Fungsi untuk melakukan pembayaran setelah pengecekan saldo

  const handleBayarTagihan = async (billId) => {
    try {
      const response = await axios.post(
        `${API_DUMMY}/member/bill/${billId}/wallet`, // Endpoint untuk pembayaran tagihan
        {},
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Pastikan token tersimpan
          },
        }
      );

      // Cek status respons untuk menentukan apakah saldo cukup
      if (response.status === 200) {
        const {amount } = response.data; // Ambil data saldo dan nominal tagihan dari respons API

        // Jika saldo cukup, munculkan SweetAlert untuk konfirmasi pembayaran
        const result = await Swal.fire({
          title: "Konfirmasi Pembayaran",
          text: `Saldo Anda mencukupi. Apakah Anda yakin ingin membayar tagihan sebesar Rp ${amount}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, bayar",
          cancelButtonText: "Tidak",
        });

        // Jika pengguna mengonfirmasi pembayaran
        if (result.isConfirmed) {
          // Lakukan proses pembayaran
          Swal.fire("Sukses", "Pembayaran berhasil!", "success");

          // Redirect ke halaman setelah pembayaran berhasil
          window.location.href = `${API_DUMMY}/api/merchant/payment/wallet`; // Redirect ke URL yang diinginkan
        }
      }
    } catch (error) {
      // Jika respons status 400 karena saldo tidak cukup
      if (error.response && error.response.status === 400) {
        Swal.fire(
          "Saldo Tidak Cukup",
          "Saldo Anda tidak mencukupi untuk membayar tagihan ini.",
          "warning"
        );
      } else {
        // Jika terjadi kesalahan lain
        Swal.fire(
          "Error",
          "Terjadi kesalahan saat memproses pembayaran.",
          "error"
        );
        console.error(error); // Log error untuk debugging
      }
    }
  };

  // Fungsi untuk langsung menampilkan konfirmasi pembayaran tanpa pengecekan saldo
  const confirmBayar = (billId) => {
    handleBayarTagihan(billId); // Langsung panggil fungsi pembayaran tanpa pengecekan saldo terpisah
  };


  // function select all
  const handleCheckboxChange = (id) => {
    const selectedIds = [...selectedBillIds];

    if (selectedIds.includes(id)) {
      const index = selectedIds.indexOf(id);
      selectedIds.splice(index, 1);
    } else {
      selectedIds.push(id);
    }

    setSelectedBillIds(selectedIds);
    setSelectAll(selectedIds.length === bill.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBillIds([]);
    } else {
      setSelectedBillIds(bill.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const calculateTotalPayment = () => {
    const selectedBills = bill.filter((bil) =>
      selectedBillIds.includes(bil.id)
    );
    return selectedBills.reduce((total, bil) => total + bil.amount, 0);
  };

  const handleSelectBilll = (billId) => {
    setSelectedBills(billId);
  };

  // function page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // function lunas
  const handleLunas = () => {
    Swal.fire({
      title: "Informasi",
      text: "Tagihan sudah lunas",
      icon: "info",
    });
  };

  const filteredBills = bill.filter((bill) =>
    bill.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBills = filteredBills.sort((a, b) => {
    if (sortBy === "description") {
      return a.description.localeCompare(b.description);
    } else {
      return a[sortBy] - b[sortBy];
    }
  });

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={"page-item " + (currentPage === i ? "active" : "")}
          aria-current="page"
          onClick={() => handlePageChange(i)}
        >
          <a className="page-link">{i}</a>
        </li>
      );
    }
    return pageNumbers;
  };

  useEffect(() => {
    get();
    const userRoleFromServer = "member"; // Ganti dengan peran aktual dari data yang diterima
    setRole(userRoleFromServer);
  }, []);

  return (
    <CContainer md>
      {localStorage.getItem("type_token") === "member" ? (
        <>
          {bill.length === 0 ? (
            <div className="text-center">
              <img
                src="https://www.pawoon.com/wp-content/uploads/2022/06/checklist-1.png"
                style={{ width: "6.75rem", height: "6.125rem" }}
              />
              <p>Tidak ada tagihan untuk saat ini</p>
              <CButton to="/home">silahkan kembali ke beranda</CButton>
            </div>
          ) : (
            <div>
              <CCard className="mb-5">
                <CCardBody>
                  <CTable className="table table2 responsive-3">
                    <CTableHead className="">
                      <CTableRow>
                        {/* <CTableHeaderCell scope="col">
                          <CFormCheck
                            id="flexCheckDefault"
                            onChange={handleSelectAll}
                            checked={selectAll}
                          />
                        </CTableHeaderCell> */}
                        <CTableHeaderCell scope="col">No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">
                          Keterangan
                        </CTableHeaderCell>
                        {/* <CTableHeaderCell scope="col">Periode</CTableHeaderCell> */}
                        <CTableHeaderCell scope="col">Nominal</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <CTableHeaderCell scope="col">
                          Tanggal dibayar
                        </CTableHeaderCell>
                        {/* <CTableHeaderCell scope="col">
                          Nominal dibayar
                        </CTableHeaderCell> */}
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody className="">
                      {bill.map((bil, index) => {
                        return (
                          <CTableRow key={index}>
                            {/* <CTableHeaderCell scope="row">
                              <CFormCheck
                                id={`flexCheckDefault${bil.id}`}
                                onChange={() => handleCheckboxChange(bil.id)}
                                checked={selectedBillIds.includes(bil.id)}
                              />
                            </CTableHeaderCell> */}

                            <CTableHeaderCell data-cell="No">
                              {index + 1}
                            </CTableHeaderCell>
                            <CTableDataCell data-cell="Deskripsi">
                              {bil.description}
                            </CTableDataCell>
                            {/* <CTableDataCell  data-cell="Periode">
                              {bil.periode}
                            </CTableDataCell> */}
                            <CTableDataCell  data-cell="Nominal">
                              {bil.amount}
                            </CTableDataCell>
                            <CTableDataCell  data-cell="Status">
                              {bil.paid_id === 0 ? (
                                <span>belum terbayar</span>
                              ) : bil.paid_id === 1 ? (
                                <span>terbayar manual</span>
                              ) : (
                                <span>terbayar oleh sistem</span>
                              )}
                            </CTableDataCell>
                            <CTableDataCell  data-cell="Tanggal Bayar">
                              {bil.paid_date}
                            </CTableDataCell>
                            {/* <CTableDataCell  data-cell="Nominal Bayar">
                              {bil.paid_amount}
                            </CTableDataCell> */}
                            <CTableDataCell  data-cell="Action">
                              {bil.amount <= bil.paid_amount ? (
                                <CButton color="danger" onClick={handleLunas}>
                                  Lunas
                                </CButton>
                              ) : (
                                <CButton
                                  onClick={() =>
                                    confirmBayar(bil.id, bil.amount)
                                  }
                                >
                                  Bayar
                                </CButton>
                              )}
                            </CTableDataCell>
                          </CTableRow>
                        );
                      })}
                    </CTableBody>
                  </CTable>
                  <ul className="pagination float-end">
                    <li
                      className={
                        "page-item " + (currentPage === 1 ? "disabled" : "")
                      }
                      disabled={currentPage === 1}
                    >
                      <a
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Previous
                      </a>
                    </li>
                    {getPageNumbers()}
                    <li
                      className={
                        "page-item " +
                        (currentPage === totalPages ? "disabled" : "")
                      }
                      disabled={currentPage === totalPages}
                    >
                      <a
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                </CCardBody>
              </CCard>
              {/* <CCard style={{marginBottom:"70px"}}>
                <CCardBody className="d-flex justify-content-between">
                  <CFormCheck
                    id="flexCheckDefault"
                    onChange={handleSelectAll}
                    checked={selectAll}
                    label="Pilih semua"
                  />
                  <p>Total Pembayaran: Rp.{calculateTotalPayment()}</p>
                  <CButton
                    disabled={selectedBillIds.length === 0}
                    onClick={() => navigate(`/bayarTagihan/all`)}
                  >
                    Bayar
                  </CButton>
                </CCardBody>
              </CCard> */}
            </div>
          )}
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
      <br />
      <br />
    </CContainer>
  );
}

export default ListTagihan;
