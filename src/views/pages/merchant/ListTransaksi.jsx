import {
  CCard,
  CCardBody,
  CCardTitle,
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

function ListTransaksi() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total_page, setTotal_Page] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [limit, setLimit] = useState("10");
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();

  const get = async () => {
    if (localStorage.getItem("type_token") === "merchant") {
      try {
        const { data, status } = await axios.get(
          `${API_DUMMY}/merchant/payment?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&filter=${searchTerm}`,
         {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          }
        );
        if (status === 200) {
          setList(data.data);
          //console.log(data.data);
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
        //Untuk munuju page selanjutnya
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear();
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredlists = list.filter((list) =>
    list.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedlist = list.sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });

  // untuk limit
  const handleLimit = (event) => {
    setLimit(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

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
    get();
  }, [currentPage, limit, searchTerm, sortBy, sortDirection]);
  return (
    <>
      <CCard>
        <CCardBody>
          <CCardTitle>List Transaksi</CCardTitle>
          <br />
          <CTable className="table table2 responsive-3">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama Organisasi</CTableHeaderCell>
                <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
                <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type Pembayaran</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredlists.map((data, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell data-cell="No" scope="row">
                    {index + 1}
                  </CTableHeaderCell>
                  <CTableDataCell data-cell="Nama Organisasi">
                    {data.organization_name}
                  </CTableDataCell>
                  <CTableDataCell data-cell="Deskripsi">
                    {data.description}
                  </CTableDataCell>
                  <CTableDataCell data-cell="Amount">
                    {data.amount}
                  </CTableDataCell>
                  <CTableDataCell data-cell="Type Pembayaran">
                    {data.trxtype_name}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <br />
      <br />    
    </>
  );
}

export default ListTransaksi;
