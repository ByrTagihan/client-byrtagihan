import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../../../utils/baseURL";
import Swal from "sweetalert2";
import { CFormInput } from "@coreui/react";
import "../../../../css/UserOrganization.css";
import { cilPencil, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import "../../../css/ListDataSiswa.css";

function Organization() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedList, setSortedList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const getAll = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/organization?page=${currentPage}&limit=${limit}&name=${searchTerm}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        // setTotalPages(res.data.pagination.total_page);
        // //console.log(res.data.pagination.total_page);
        setList(res.data.data);
        //console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll(0);
  }, [currentPage, limit, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleLimit = (event) => {
    setLimit(event.target.value);
  };

  useEffect(() => {
    let sortedData = [...list];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    if (searchTerm !== "") {
      sortedData = sortedData.filter((data) => {
        return data.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    setSortedList(sortedData);
  }, [sortConfig, searchTerm, list]);

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayedPages = [];

    if (totalPages <= 5) {
      displayedPages.push(...pageNumbers);
    } else {
      if (currentPage <= 3) {
        displayedPages.push(...pageNumbers.slice(0, 5), "dot", totalPages);
      } else if (currentPage >= totalPages - 2) {
        displayedPages.push(1, "dot", ...pageNumbers.slice(totalPages - 5));
      } else {
        displayedPages.push(
          1,
          "dot",
          ...pageNumbers.slice(currentPage - 2, currentPage + 1),
          "dot",
          totalPages
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
        axios.delete(`${API_DUMMY}/user/organization/` + id, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menghapus",
          showConfirmButton: false,
        });
        //console.log(id);
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };
  return (
    <div>
      {localStorage.getItem("type_token") === "user" ? (
        <>
          <div className="row">
            <div className="col" xs={12}>
              <div className="card mb-4">
                <div className="card-header">
                  <div className="row">
                    <div className="col">
                      <h4 className="textt">Organization</h4>
                    </div>

                    <div className="col">
                      <Link to="/tambahOrganization">
                        <button className="btn btn-primary float-end">
                          <CIcon icon={cilPlus} /> Tambah
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="row">
                      <div className="row">
                        <div className="col">
                          <select
                            className="shows form-select"
                            value={limit}
                            onChange={handleLimit}
                          >
                            <option value="1">Show 1 Entries</option>
                            <option value="10">Show 10 Entries</option>
                            <option value="100">Show 100 Entries</option>
                          </select>
                        </div>

                        <div className="col">
                          <CFormInput
                            className="filter-data-o"
                            type="search"
                            placeholder="search data"
                            value={searchTerm}
                            onChange={handleSearch}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="tabel-organization table responsive-3 table1">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Alamat</th>
                          <th scope="col">No Hp</th>
                          <th scope="col">Email</th>
                          <th scope="col">Kota</th>
                          <th scope="col">Provinsi</th>
                          <th scope="col">Saldo</th>
                          <th scope="col">No Rekening</th>
                          <th scope="col">Nama Rekening</th>
                          <th scope="col">Nama Bank</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedList.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td data-cell="Id">{index + 1}</td>
                              <td data-cell="Name">{data.name}</td>
                              <td data-cell="Address">{data.address}</td>
                              <td data-cell="HP">{data.hp}</td>
                              <td data-cell="Email">{data.email}</td>
                              <td data-cell="City">{data.city}</td>
                              <td data-cell="Provinsi">{data.provinsi}</td>
                              <td data-cell="Provinsi">{data.balance}</td>
                              <td data-cell="Create Date">
                                {data.bank_account_number}
                              </td>
                              <td data-cell="Update Date">
                                {data.bank_account_name}
                              </td>
                              <td data-cell="Update Date">{data.bank_name}</td>
                              <td data-cell="Action">
                                <div className="tdd">
                                  <button
                                    style={{ background: "blue" }}
                                    onClick={() =>
                                      navigate(`/editOrganization/${data.id}`)
                                    }
                                    type="button"
                                    className="edit1"
                                  >
                                    <CIcon
                                      icon={cilPencil}
                                      style={{ color: "white" }}
                                    />
                                  </button>

                                  <button
                                    style={{ background: "red" }}
                                    onClick={() => Delete(data.id)}
                                    type="button"
                                    className="edit1"
                                  >
                                    <CIcon
                                      icon={cilTrash}
                                      style={{ color: "white" }}
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {/* <div>
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
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Page Tidak Tersedia</p>
        </>
      )}
    </div>
  );
}

export default Organization;
