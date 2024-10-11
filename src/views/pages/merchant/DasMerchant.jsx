import {
    CCallout,
    CCard,
    CCardBody,
    CCardTitle,
    CFormInput,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from "@coreui/react";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import Swal from "sweetalert2";
  import { API_DUMMY } from "../../../utils/baseURL";
  import { useNavigate } from "react-router-dom";

  function DashMerchant() {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total_page, setTotal_Page] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [limit, setLimit] = useState("10");
    const [sortDirection, setSortDirection] = useState("asc");
    const [startDate, setStartDate] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const navigate = useNavigate();
    const [balance, setBalance] = useState("");

    const get = async () => {
      if (localStorage.getItem("type_token") === "merchant") {
        try {
          const { data, status } = await axios.get(
            `${API_DUMMY}/merchant/payment?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&filter=${searchTerm}`,
            {
              headers: {
                "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
                AuthPrs: `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
              },
            }
          );
          if (status === 200) {
            setList(data.data);
            setTotal_Page(data.pagination.total_page);
          }
        } catch (err) {
          alert("Terjadi Kesalahan" + err);
        }
      } else {
        Swal.fire(
          "Peringatan",
          "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai merchant",
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

    const filteredByDate = list.filter((item) => {
      const itemDate = new Date(item.created_date).toISOString().split("T")[0];
      return startDate === "" || startDate === itemDate;
    });

    const filteredByMonth = list.filter((item) => {
      const itemMonth = new Date(item.created_date).toISOString().slice(0, 7); // Ambil "YYYY-MM" dari tanggal
      return startMonth === "" || startMonth === itemMonth;
    });

    const sortedlist = filteredByDate.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });

    const sortedlistMonth = filteredByMonth.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });

    const renderPageNumbers = () => {
      const pageNumbers = Array.from({ length: total_page }, (_, i) => i + 1);
      const displayedPages = [];

      if (total_page <= 5) {
        displayedPages.push(...pageNumbers);
      } else {
        if (currentPage <= 3) {
          displayedPages.push(
            ...pageNumbers.slice(0, 5),
            "dot",
            ...pageNumbers.slice(total_page - 1)
          );
        } else if (currentPage >= total_page - 2) {
          displayedPages.push(
            ...pageNumbers.slice(0, 1),
            "dot",
            ...pageNumbers.slice(total_page - 5)
          );
        } else {
          displayedPages.push(
            ...pageNumbers.slice(0, 1),
            "dot",
            ...pageNumbers.slice(currentPage - 2, currentPage + 1),
            "dot",
            ...pageNumbers.slice(total_page - 1)
          );
        }
      }

      return displayedPages.map((page, index) =>
        page === "dot" ? (
          <span key={`dot${index}`}>...</span>
        ) : (
          <li
            key={page}
            onClick={() => handlePageChange(page)}
            className={"page-item" + (currentPage === page ? " active" : "")}>
            <a className="page-link">{page}</a>
          </li>
        )
      );
    };

    useEffect(() => {
      const today = new Date().toISOString().split("T")[0];
      const currentMonth = new Date().toISOString().slice(0, 7);
      if (!startDate) setStartDate(today);
      if (!startMonth) setStartMonth(currentMonth);

      get();
    }, [
      currentPage,
      limit,
      searchTerm,
      sortBy,
      sortDirection,
      startDate,
      startMonth,
    ]);

    useEffect(() => {
      axios
        .get(`${API_DUMMY}/merchant/profile`, {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
            AuthPrs: `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
          },
        })
        .then((response) => {
          const profil = response.data.data;
          setBalance(profil.balance);
        })
        .catch((error) => {
          alert("Terjadi Kesalahan " + error);
        });
    }, []);

    const totalAmount = sortedlistMonth.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    const totalAmountHarian = sortedlist.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    return (
      <>
        <div style={{ display: "flex", gap: "20px" }}>
          <CCallout
            color="primary"
            style={{ background: "white", width: "100%" }}>
            <span style={{ fontWeight: "bold" }}> Balance</span> <br />
            Rp. {balance.toLocaleString("id-ID")}
          </CCallout>
          <CCallout
            color="primary"
            style={{ background: "white", width: "100%" }}>
            <span style={{ fontWeight: "bold" }}> Balance Perhari</span> <br />
            Rp. {totalAmountHarian.toLocaleString("id-ID")}
          </CCallout>
          <CCallout
            color="primary"
            style={{ background: "white", width: "100%" }}>
            <span style={{ fontWeight: "bold" }}> Balance Perbulan</span> <br />
            Rp. {totalAmount.toLocaleString("id-ID")}
          </CCallout>
        </div>
        <br />
        <CCard>
          <CCardBody>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CCardTitle>List Transaksi Harian</CCardTitle>
              <div>
                <CFormInput
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <hr />
            <br />
            <CTable className="table table2 responsive-3">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nama Organisasi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type Pembayaran</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Tanggal Transaksi
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {startDate && sortedlist.length > 0 ? (
                  sortedlist.map((data, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{data.organization_name}</CTableDataCell>
                      <CTableDataCell>{data.description}</CTableDataCell>
                      <CTableDataCell>{data.amount}</CTableDataCell>
                      <CTableDataCell>{data.trxtype_name}</CTableDataCell>
                      <CTableDataCell>{data.created_date}</CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="6" style={{ textAlign: "center" }}>
                      Tidak ada data yang ditampilkan.
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
        <br />
        <br />
        <CCard>
          <CCardBody>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CCardTitle>List Transaksi Bulanan</CCardTitle>
              <div>
                <CFormInput
                  type="month"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                />
              </div>
            </div>
            <hr />
            <br />
            <CTable className="table table2 responsive-3">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nama Organisasi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Type Pembayaran</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Tanggal Transaksi
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {sortedlistMonth.map((data, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{data.organization_name}</CTableDataCell>
                    <CTableDataCell>{data.description}</CTableDataCell>
                    <CTableDataCell>{data.trxtype_name}</CTableDataCell>
                    <CTableDataCell>{data.created_date}</CTableDataCell>
                    <CTableDataCell>{data.amount}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
              {/* <CSmartPagination
                size="lg"
                activePage={currentPage}
                pages={10}
                onActivePageChange={setCurrentPage}
              /> */}
            </CTable>
          </CCardBody>
        </CCard>
        <br />
        <br />
      </>
    );
  }

  export default DashMerchant;