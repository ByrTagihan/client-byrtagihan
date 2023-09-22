import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableRow,
  CTableHead,
  CTableBody,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CCol,
  CFormInput,
  CInputGroup,
  CForm,
  CFormSelect,
  CInputGroupText,
} from "@coreui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";
import CIcon from "@coreui/icons-react";
import { cilPencil, cilPlus, cilTrash } from "@coreui/icons";
import "../../../css/ListDataSiswa.css";

function Member() {
  const [member, setMember] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total_page, setTotal_Page] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [limit, setLimit] = useState("10");
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();

  // Function get
  const get = async () => {
    if (localStorage.getItem("type_token") === "user") {
      try {
        const { data, status } = await axios.get(
          `${API_DUMMY}/user/member?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&filter=${searchTerm}`,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        );
        if (status === 200) {
          setMember(data.data);
          //console.log(data.data);
          setTotal_Page(data.pagination.total_page);
        }
      } catch (err) {
        alert("Terjadi Kesalahan" + err);
      }
    } else {
      Swal.fire(
        "Peringatan",
        "Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai guru",
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

  const Delete = async (id) => {
    Swal.fire({
      title: "Anda Ingin Menghapus Data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_DUMMY}/user/member/${id}`, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          showConfirmButton: false,
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const filteredMembers = member.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMember = member.sort((a, b) => {
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
          className={"page-item" + (currentPage === page ? " active" : "")}
        >
          <a className="page-link">{page}</a>
        </li>
      )
    );
  };

  useEffect(() => {
    get(0);
  }, [currentPage, limit, searchTerm, sortBy, sortDirection]);

  return (
    <div className="mb-5">
      {localStorage.getItem("type_token") === "user" ? (
        <>
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <h4>Siswa</h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <div>
                    <CFormInput
                      className="inputSearch"
                      type="search"
                      placeholder="search data"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>

                  <div className="col">
                    <Link to="/tambahMember">
                      <button className="btn btn-primary float-end">
                        <CIcon icon={cilPlus} /> Tambah
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Unique_id</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sekolah</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                    <CTableHeaderCell scope="col">No.Hp</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredMembers.map((mem, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableHeaderCell data-cell="No" scope="row">
                          {index + 1}
                        </CTableHeaderCell>
                        <CTableDataCell data-cell="Name">
                          {mem.name}
                        </CTableDataCell>
                        <CTableDataCell data-cell="Unique_Id">
                          {mem.unique_id}
                        </CTableDataCell>
                        <CTableDataCell data-cell="Sekolah">
                          {mem.organization_name}
                        </CTableDataCell>
                        <CTableDataCell data-cell="Alamat">
                          {mem.address}
                        </CTableDataCell>
                        <CTableDataCell data-cell="NO Hp">
                          {mem.hp}
                        </CTableDataCell>
                        <CTableDataCell data-cell="Action ">
                          <button
                            onClick={() =>
                              navigate(`/editUserMember/${mem.id}`)
                            }
                            className="edit1"
                            style={{ background: "blue" }}
                          >
                            {" "}
                            <CIcon icon={cilPencil} />
                          </button>{" "}
                          <button
                            onClick={() => Delete(mem.id)}
                            className="edit1"
                            style={{ background: "red", color: "white" }}
                          >
                            <CIcon icon={cilTrash} />
                          </button>
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
              {/* Pagination */}
              <div>
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
                  {renderPageNumbers()}
                  <li
                    className={
                      "page-item " +
                      (currentPage === total_page ? "disabled" : "")
                    }
                    disabled={currentPage === total_page}
                  >
                    <a
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </CCardBody>
          </CCard>
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}{" "}
    </div>
  );
}

export default Member;
