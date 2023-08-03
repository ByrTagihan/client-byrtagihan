
import React, { useEffect, useState } from "react";
import "../../../../views/css/ListDataSiswa.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import {
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilAddressBook,
  cilLockLocked,
  cilLockUnlocked,
  cilMoney,
  cilPencil,
  cilPhone,
  cilPlus,
  cilTrash,
  cilUser,
} from "@coreui/icons";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function LIstDataSIswa() {
  const [name, setName] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState("fa-solid fa-eye-slash");
  const [list, setList] = useState([]);
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const [listData, setListData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [limit, setLimit] = useState(10);
  const [sortedList, setSortedList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  const [role, setRole] = useState("");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordIcon("fa-solid fa-eye");
      return;
    }
    setPasswordType("password");
    setPasswordIcon("fa-solid fa-eye-slash");
  };

  const getAll = async () => {
    if (localStorage.getItem("type_token") === "customer") {
    await axios
      .get(
        `https://api.byrtagihan.com/api/customer/member?page=${currentPage}&limit=${limit}&filter=${searchTerm}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setTotalPages(res.data.pagination.total_page || 1);
        console.log(res.data.pagination.total_page);
        setList(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
    } else {
      Swal.fire(
        'Peringatan',
        'Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai admin',
        'error'      
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
    setCurrentPage(1);
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
        return (
          data.unique_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.hp.toString().includes(searchTerm) ||
          data.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    setSortedList(sortedData);
  }, [sortConfig, searchTerm, list]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
  };

  const [idd, setId] = useState(0);
  const getById = async (id) => {
    if (role === "customer") {
    await axios
      .get(`https://api.byrtagihan.com/api/customer/member/` + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUnique_id(res.data.data.unique_id);
        setName(res.data.data.name);
        setAddress(res.data.data.address);
        setHp(res.data.data.hp);
        setId(res.data.data.id);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
    } else {
      Swal.fire(
        'Peringatan',
        'Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai admmin',
        'error'      
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

  useEffect(() => {
    const userRoleFromServer = "customer"; // Ganti dengan peran aktual dari data yang diterima
    setRole(userRoleFromServer);
  }, []);

  const put = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      password: password,
    };

    try {
      await axios.put(
        `https://api.byrtagihan.com/api/customer/member/${idd}/password`,
        data,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      setShow1(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      unique_id,
      name,
      address,
      hp,
      password,
    };
    try {
      await axios.post(
        `http://staging-api.byrtagihan.com/api/customer/member`,
        data,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
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

  const deleteData = async (id) => {
    Swal.fire({
      title: "Anda ingin Menghapus Data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("https://api.byrtagihan.com/api/customer/member/" + id, {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        });
        Swal.fire({
          icon: "success",
          title: "Berhasil Menghapus!",
          showConfirmButton: false,
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

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
        displayedPages.push(...pageNumbers.slice(0, 5), 'dot', ...pageNumbers.slice(totalPages - 1));
      } else if (currentPage >= totalPages - 2) {
        displayedPages.push(...pageNumbers.slice(0, 1), 'dot', ...pageNumbers.slice(totalPages - 5));
      } else {
        displayedPages.push(
          ...pageNumbers.slice(0, 1),
          'dot',
          ...pageNumbers.slice(currentPage - 2, currentPage + 1),
          'dot',
          ...pageNumbers.slice(totalPages - 1)
        );
      }
    }
  
    return displayedPages.map((page, index) =>
      page === 'dot' ? (
        <span key={`dot${index}`}>...</span>
      ) : (
        <li
          key={page}
          onClick={() => handlePageChange(page)}
          className={"page-item" + (currentPage === page ? ' active' : '')}
        >
          <a className="page-link">{page}</a>
        </li>
      )
    );
  };
  
  return (
    <div>
      {localStorage.getItem("type_token") === "customer" ? (
        <>
      <div className="row">
        <div className="col" xs={12}>
          <div className="inputSearch1">
            <CFormInput
              type="search"
              style={{
                marginBottom: "2px",
                width: "20em",
                marginRight: "14px",
                marginTop: "1px",
              }}
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
                  <h4>List Data Siswa</h4>
                </div>
                <div className="col">

                <Link to="/addListDataSiswa">
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
                  gap: "10px",
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
                    style={{
                      marginBottom: "2px",
                      width: "20em",
                      marginRight: "14px",
                      marginTop: "1px",
                    }}
                    placeholder="search data"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <table className="table table1 responsive-3">
                <thead>
                  <tr>
                    <th scope="col" onClick={() => handleSort("id")}>
                      Id{" "}
                      {sortConfig &&
                        sortConfig.key === "id" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th scope="col" onClick={() => handleSort("unique_id")}>
                      Nisn{" "}
                      {sortConfig &&
                        sortConfig.key === "unique_id" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th scope="col" onClick={() => handleSort("name")}>
                      Name{" "}
                      {sortConfig &&
                        sortConfig.key === "name" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th scope="col" onClick={() => handleSort("hp")}>
                      hp{" "}
                      {sortConfig &&
                        sortConfig.key === "hp" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th scope="col" onClick={() => handleSort("address")}>
                      Address{" "}
                      {sortConfig &&
                        sortConfig.key === "address" &&
                        (sortConfig.direction === "ascending" ? "▲" : "▼")}
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedList.map((data, index) => {
                    return (
                      <tr key={data.index}>
                        <td data-cell="Id" scope="row">
                          {index + 1}
                        </td>
                        <td data-cell="Nisn">{data.unique_id}</td>
                        <td data-cell="Nama">{data.name}</td>
                        <td data-cell="Handphone">{data.hp}</td>
                        <td data-cell="Alamat">{data.address}</td>
                        <td data-cell="Action">
                          <div className="tdd">
                            <button
                              className="edit1"
                              type="button"
                              style={{ background: "blue" }}
                            >
                              <a
                                style={{ color: "white" }}
                                href={"/#/Editlistdatasiswa/" + data.id}
                              >
                                {" "}
                                <CIcon icon={cilPencil} />
                              </a>{" "}
                            </button>
                            <button
                              className="edit1"
                              onClick={() => deleteData(data.id)}
                              style={{ background: "red", color: "white" }}
                            >
                              <CIcon icon={cilTrash} />
                            </button>
                            <button
                              className="edit1"
                              onClick={() => {
                                setShow1(true);
                                getById(data.id);
                              }}
                              style={{ background: "orange", color: "white" }}
                            >
                              <CIcon icon={cilLockLocked} />
                            </button>
                            <button
                              className="edit1"
                              style={{ background: "green" }}
                            >
                              <a
                                style={{ color: "white" }}
                                href={"/#/lihattagihanmember/" + data.id}
                              >
                                {" "}
                                <CIcon icon={cilMoney} />
                              </a>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <div></div>
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

      {/* Modal Edit Password*/}
      <Modal show={show1} onHide={!show1}>
        <form onSubmit={put}>
          <Modal.Header style={{ background: "#526D82" }}>
            <Modal.Title style={{ color: "white" }}>
              Modal Edit Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <label
              style={{
                fontWeight: "bold",
                marginLeft: "4px",
                marginBottom: "20px",
              }}
            >
              Password :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
              <span
                    onClick={togglePassword}
                  >
                    <i class={passwordIcon}></i>
                  </span>
              </CInputGroupText>
              <CFormInput
                placeholder="Password"
                autoComplete="Password"
                type={passwordType}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </CInputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow1(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* modal add */}
      <Modal show={show} onHide={!show}>
        <form onSubmit={add}>
          <Modal.Header style={{ background: "#526D82" }}>
            <Modal.Title style={{ color: "white" }}>Modal Add</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              NIK :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="NIK"
                autoComplete="NIK"
                type="text"
                value={unique_id}
                required
                onChange={(e) => setUnique_id(e.target.value)}
              />
            </CInputGroup>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
      ):(
        <><p>Page Tidak Tersedia</p></>
      )}</div>
  );
}

export default LIstDataSIswa;