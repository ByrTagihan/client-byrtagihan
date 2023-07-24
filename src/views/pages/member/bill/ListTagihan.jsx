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
} from "@coreui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../../../utils/baseURL";

function ListTagihan() {
  const [bill, setBill] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBills, setSelectedBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState("10");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const navigate = useNavigate();


  const getAll = async () => {
    await axios
      .get(
        `${API_DUMMY}/member/bill?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&search=${searchTerm}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setTotalPages(res.data.pagination.total_page);
        setBill(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll(0);
  }, [currentPage, limit, searchTerm]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBills([]);
    } else {
      setSelectedBills(bill);
    }
    setSelectAll(!selectAll);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedPages = [];

    if (totalPages <= 5) {
      displayedPages.push(...pageNumbers);
    } else {
      if (currentPage <= 3) {
        displayedPages.push(
          ...pageNumbers.slice(0, 5),
          "dot",
          ...pageNumbers.slice(totalPages - 1)
        );
      } else if (currentPage >= totalPages - 2) {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(totalPages - 5)
        );
      } else {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          "dot",
          ...pageNumbers.slice(currentPage - 2, currentPage + 1),
          "dot",
          ...pageNumbers.slice(totalPages - 1)
        );
      }
    }

    return displayedPages.map((page) =>
      page === "dot" ? (
        <span key="dot">...</span>
      ) : (
        <li
          key={page}
          onClick={() => handlePageChange(page)}
          className={"page-item " + (currentPage === page ? "active" : "")}
        >
          <a class="page-link">{page}</a>
        </li>
      )
    );
  };

  // useEffect(() => {
  //   get();
  // }, []);

  return (
    <div>
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
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">
                      <CFormCheck
                        id="flexCheckDefault"
                        onChange={handleSelectAll}
                        checked={selectAll}
                      />
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Periode</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nominal</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Tanggal dibayar
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      Nominal dibayar
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {bill.map((bil, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row"></CTableHeaderCell>
                        <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{bil.description}</CTableDataCell>
                        <CTableDataCell>{bil.periode}</CTableDataCell>
                        <CTableDataCell>{bil.amount}</CTableDataCell>

                        <CTableDataCell>{bil.payment_id}</CTableDataCell>
                        
                        <CTableDataCell>{bil.paid_date}</CTableDataCell>
                        <CTableDataCell>{bil.paid_amount}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            onClick={() => navigate(`/bayarTagihan/${bil.id}`)}
                          >
                            Bayar
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>

                 {/* Pagination */}
              <div>
                <ul class="pagination float-end">
                  <li
                    className={
                      "page-item " + (currentPage === 1 ? "disabled" : "")
                    }
                    disabled={currentPage === 1}
                  >
                    <a
                      class="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </a>
                  </li>
                  {renderPageNumbers()}
                  <li
                    className={
                      "page-item " +
                      (currentPage === totalPages ? "disabled" : "")
                    }
                    disabled={currentPage === totalPages}
                  >
                    <a
                      class="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody className="d-flex justify-content-between">
              <CFormCheck
                id="flexCheckDefault"
                onChange={handleSelectAll}
                checked={selectAll}
                label="Pilih semua"
              />
              <p>
                Total Pembayaran: Rp.
                {selectedBills.reduce((total, bil) => total + bil.amount, 0)}
              </p>
              <CButton onClick={() => navigate(`/bayarSemuaTagihan`)}>
                Bayar Semua
              </CButton>
            </CCardBody>
          </CCard>
        </div>
      )}
    </div>
  );
}

export default ListTagihan;
