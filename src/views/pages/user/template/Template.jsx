import { CFormInput } from "@coreui/react";
import React from "react";
import "../../../../views/css/ListDataSiswa.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../../../utils/baseURL";
import Swal from "sweetalert2";
import { cilPencil, cilPlus, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function Template() {
  const [listTemplate, setListTemplate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [limit, setLimit] = useState(10);
  const [sortedList, setSortedList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const navigate = useNavigate();

  const getAll = async () => {
    if (localStorage.getItem("type_token") === "user") {
      await axios
        .get(`${API_DUMMY}/user/template?page=${currentPage}&limit=${limit}`, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
          })
        .then((res) => {
          setTotalPages(res.data.pagination.total_page);
          setListTemplate(res.data.data);
          //console.log(res.data.data);
        })
        .catch((error) => {
          alert("Terjadi Kesalahan" + error);
        });
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let sortedData = [...listTemplate];
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
  }, [sortConfig, searchTerm, listTemplate]);

  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };

  const filteredTemplate = listTemplate.filter((bill) =>
    bill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTemplate = filteredTemplate.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a[sortBy] - b[sortBy];
    }
  });

  useEffect(() => {
    getAll();
  }, [currentPage, searchTerm, sortBy, limit]);

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

  const deleteT = async (id) => {
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
        axios.delete(`${API_DUMMY}/user/template/` + id, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("token")}`, // Token auth-tgh
              "AuthPrs": `Bearer ${localStorage.getItem("token_presensi")}`, // Token AuthPrs
            },
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
  return (
    <div className="row">
      {localStorage.getItem("type_token") === "user" ? (
        <>
          <div className="col" xs={12}>
            <div className="inputSearch1">
              <CFormInput
                type="search"
                placeholder="search data"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="inputSearch1">
              <select
                className="form-select"
                value={limit}
                onChange={handleChangeLimit}
              >
                <option value="1">Show 1 Entries</option>
                <option value="10">Show 10 Entries</option>
                <option value="100">Show 100 Entries</option>
                {/* Tambahkan lebih banyak pilihan sesuai kebutuhan */}
              </select>
            </div>
            <div className="card mb-4">
              <div className="card-header">
                <div style={{ display: "flex" }}>
                  <div className="col">
                    <h4>Template</h4>
                  </div>
                  <div className="">
                    <Link to="/tambahTemplate">
                      <button className="btn btn-primary float-end">
                        <CIcon icon={cilPlus} /> Tambah
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body table-container">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="inputSearch">
                    <select
                      className="form-select"
                      value={limit}
                      onChange={handleChangeLimit}
                    >
                      <option value="1">Show 1 Entries</option>
                      <option value="10">Show 10 Entries</option>
                      <option value="100">Show 100 Entries</option>
                      {/* Tambahkan lebih banyak pilihan sesuai kebutuhan */}
                    </select>
                  </div>
                  <div className="inputSearch">
                    <CFormInput
                      type="search"
                      placeholder="search data"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <table className="table responsive-3 table1">
                  <thead>
                    <tr>
                      <th scope="col" onClick={() => handleSort("no")}>
                        No{" "}
                        {sortConfig &&
                          sortConfig.key === "no" &&
                          (sortConfig.direction === "ascending" ? "▲" : "▼")}
                      </th>
                      <th scope="col" onClick={() => handleSort("nama")}>
                        Nama{" "}
                        {sortConfig &&
                          sortConfig.key === "nama" &&
                          (sortConfig.direction === "ascending" ? "▲" : "▼")}
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("created_date")}
                      >
                        Created date{" "}
                        {sortConfig &&
                          sortConfig.key === "created_date" &&
                          (sortConfig.direction === "ascending" ? "▲" : "▼")}
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("updated_date")}
                      >
                        Updated date{" "}
                        {sortConfig &&
                          sortConfig.key === "updated_date" &&
                          (sortConfig.direction === "ascending" ? "▲" : "▼")}
                      </th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedList.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td data-cell="Id" scope="row">
                            {" "}
                            {index + 1}
                          </td>
                          <td data-cell="Name">{data.name}</td>
                          <td data-cell="Create Date">{data.created_date}</td>
                          <td data-cell="Update Date">{data.updated_date}</td>
                          <td data-cell="Action">
                            <div className="tdd">
                              <button
                                className="edit1"
                                type="button"
                                style={{ background: "blue" }}
                                onClick={() =>
                                  navigate(`/EditTemplate/${data.id}`)
                                }
                              >
                                {" "}
                                <CIcon icon={cilPencil} />
                              </button>
                              <button
                                onClick={() => deleteT(data.id)}
                                className="edit1"
                                style={{ background: "red", color: "white" }}
                              >
                                <CIcon icon={cilTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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

export default Template;
