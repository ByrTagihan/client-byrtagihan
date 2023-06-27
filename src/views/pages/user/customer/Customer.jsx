import {
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllData } from "../../../../utils/controller";
import "../../../../views/css/ListDataSiswa.css";
import { API_DUMMY } from "../../../../utils/baseURL";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import {
  cibGmail,
  cilAddressBook,
  cilArrowCircleTop,
  cilArrowTop,
  cilCheck,
  cilLockLocked,
  cilMobile,
  cilPencil,
  cilPhone,
  cilPlus,
  cilSortAlphaDown,
  cilSortAlphaUp,
  cilSortAscending,
  cilSortDescending,
  cilTerminal,
  cilTrash,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function Customer() {
  const [userCustomer, setUserCustomer] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState("");

  const deleteE = async (id) => {
    Swal.fire({
      title: "Do you want to delete ?",
      text: "Data changes are non-refundable!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cencel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_DUMMY}/user/customer/` + id, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          showConfirmButton: false,
        });
        // console.log(id);
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };
  const [userCustomer1, setUserCustomer1] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortedList, setSortedList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [limit, setLimit] = useState(10);

  const getAllData1 = async () => {
    await axios
      .get(`${API_DUMMY}/user/customer?page=${currentPage}&limit=${limit}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTotalPages(res.data.pagination.total_page);
        setUserCustomer1(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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
    let sortedData = [...userCustomer1];
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
        return (
          data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.email.toLowerCase().includes(searchTerm) ||
          data.hp.toString().includes(searchTerm.toLowerCase()) ||
          data.active.toString().includes(searchTerm.toLowerCase())
        );
      });
    }
    setSortedList(sortedData);
  }, [sortConfig, searchTerm, userCustomer1]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleChangeLimit = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUserCustomer = userCustomer1.filter((bill) =>
    bill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const sortedUserCustomer = filteredUserCustomer.sort((a, b) => {
  //   if (sortBy === 'name') {
  //     return a.name.localeCompare(b.name);
  //   } else {
  //     return a[sortBy] - b[sortBy];
  //   }
  // });

  useEffect(() => {
    getAllData1();
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

    return displayedPages.map((page) =>
      page === "dot" ? (
        <span
          className="border"
          key="dot"
          style={{
            width: "40px",
            textAlign: "center",
            borderRight: "none",
            borderLeft: "none",
          }}
        >
          ...
        </span>
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

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      name,
      active,
      email,
      address,
      hp,
      password,
    };
    try {
      await axios.post(`${API_DUMMY}/user/customer`, data, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      // console.log(unique_id);
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      // console.log(data);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col" xs={12}>
          <div className="inputSearch1">
            <CFormInput
              type="search"
              placeholder="search Nama"
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
                  <h4>Customer</h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
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
                  <div>
                    <CFormInput
                      className="inputSearch"
                      type="search"
                      placeholder="search data"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => setShow(true)}
                      className="btn btn-primary"
                    >
                      <CIcon icon={cilPlus} /> Tambah Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body table-container">
              <table className="table responsive-3 table1">
                <thead>
                  <tr>
                    <th scope="col" onClick={() => handleSort("no")}>
                      No{" "}
                      {sortConfig && sortConfig.key === "no" && (
                        (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("email")}>
                      Email{" "}
                      {sortConfig && sortConfig.key === "email" && (
                         (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("nama")}>
                      Nama{" "}
                      {sortConfig && sortConfig.key === "nama" && (
                        (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("hp")}>
                      hp{" "}
                      {sortConfig && sortConfig.key === "hp" && (
                         (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("active")}>
                      Active{" "}
                      {sortConfig && sortConfig.key === "active" && (
                         (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedList.map((data, i) => (
                    <tr key={i}>
                      <td scope="row" data-cell="No">
                        {i + 1}
                      </td>
                      <td data-cell="Email">{data.email}</td>
                      <td data-cell="Name">{data.name}</td>
                      <td data-cell="Hp">{data.hp}</td>
                      <td data-cell="Active">{data.active}</td>
                      <td data-cell="Action">
                        <div className="tdd">
                          <button
                            className="edit1"
                            type="button"
                            style={{ background: "blue" }}
                          >
                            <a
                              href={"/#/editUserCustomer/" + data.id}
                              style={{ color: "white" }}
                            >
                              {" "}
                              <CIcon icon={cilPencil} />
                            </a>{" "}
                          </button>
                          <button
                            className="edit1"
                            onClick={() => deleteE(data.id)}
                            style={{ background: "red", color: "white" }}
                          >
                            <CIcon icon={cilTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          </div>
        </div>
      </div>

      <Modal show={show} onHide={!show}>
        <form onSubmit={add}>
          <Modal.Header style={{ background: "#526D82" }}>
            <Modal.Title style={{ color: "white" }}>Modal Add</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Name :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
              <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="Name"
                autoComplete="Name"
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              hp :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
              <CIcon icon={cilPhone} />
              </CInputGroupText>
              <CFormInput
                placeholder="hp"
                autoComplete="hp"
                type="number"
                value={hp}
                required
                onChange={(e) => setHp(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Adress :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
              <CIcon icon={cilAddressBook} />
              </CInputGroupText>
              <CFormInput
                placeholder="Adress"
                autoComplete="Adress"
                type="text"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Password :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
              <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                placeholder="Password"
                autoComplete="Password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Email :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
              <CIcon icon={cibGmail} />
              </CInputGroupText>
              <CFormInput
                placeholder="email"
                autoComplete="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Active :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
              <CIcon icon={cilCheck} />
              </CInputGroupText>
              <CFormInput
                placeholder="Active"
                autoComplete="Active"
                type="text"
                value={active}
                required
                onChange={(e) => setActive(e.target.value)}
              />
            </CInputGroup>
          </Modal.Body>
          <Modal.Footer>
            <CButton variant="secondary" onClick={() => setShow(false)}>
              Close
            </CButton>
            <CButton
              className="btn btn-primary"
              variant="primary"
              type="submit"
            >
              Save Changes
            </CButton>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Customer;
