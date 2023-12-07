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
import { useNavigate, useParams } from "react-router-dom";
import { API_DUMMY } from "../../../../utils/baseURL";
import "../../../css/ListDataSiswa.css";
import Swal from "sweetalert2";
import { useSelectedBillIds } from "./SelectedBillIdsContext";
// import {useSelectedBillIds} from "../../member/bill/SelectedBillIdsContext"

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
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
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
          onClick={() => handlePageChange(i)}>
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
    <div>
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
                  <CTable className="table table1 responsive-3">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">
                          <CFormCheck
                            id="flexCheckDefault"
                            onChange={handleSelectAll}
                            checked={selectAll}
                          />
                        </CTableHeaderCell>
                        <CTableHeaderCell scope="col">No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">
                          Keterangan
                        </CTableHeaderCell>
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
                            <CTableHeaderCell scope="row">
                              {/*<CFormCheck onChange={handleSelectBilll(bill.id)}/>*/}
                              <CFormCheck
                                id={`flexCheckDefault${bil.id}`}
                                onChange={() => handleCheckboxChange(bil.id)}
                                checked={selectedBillIds.includes(bil.id)}
                              />
                            </CTableHeaderCell>

                            <CTableHeaderCell data-cell="No">
                              {index + 1}
                            </CTableHeaderCell>
                            <CTableDataCell data-cell="Deskripsi">
                              {bil.description}
                            </CTableDataCell>
                            <CTableDataCell data-cell="Periode">
                              {bil.periode}
                            </CTableDataCell>
                            <CTableDataCell data-cell="Nominal">
                              {bil.amount}
                            </CTableDataCell>
                            <CTableDataCell data-cell="Status">
                              {bil.paid_id === 0 ? (
                                <span>belum terbayar</span>
                              ) : bil.paid_id === 1 ? (
                                <span>terbayar manual</span>
                              ) : (
                                <span>terbayar oleh sistem</span>
                              )}
                            </CTableDataCell>
                            <CTableDataCell data-cell="Tanggal Bayar">
                              {bil.paid_date}
                            </CTableDataCell>
                            <CTableDataCell data-cell="Nominal Bayar">
                              {bil.paid_amount}
                            </CTableDataCell>
                            <CTableDataCell data-cell="Action">
                              {bil.amount <= bil.paid_amount ? (
                                <CButton color="danger" onClick={handleLunas}>
                                  Lunas
                                </CButton>
                              ) : (
                                <CButton
                                  onClick={() =>
                                    navigate(`/bayarTagihan/${bil.id}`)
                                  }>
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
                      disabled={currentPage === 1}>
                      <a
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                      </a>
                    </li>
                    {getPageNumbers()}
                    <li
                      className={
                        "page-item " +
                        (currentPage === totalPages ? "disabled" : "")
                      }
                      disabled={currentPage === totalPages}>
                      <a
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                      </a>
                    </li>
                  </ul>
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
                  <p>Total Pembayaran: Rp.{calculateTotalPayment()}</p>
                  <CButton
                    disabled={selectedBillIds.length === 0}
                    onClick={() => navigate(`/bayarTagihan/all`)}>
                    Bayar
                  </CButton>
                </CCardBody>
              </CCard>
            </div>
          )}
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </div>
  );
}

export default ListTagihan;
