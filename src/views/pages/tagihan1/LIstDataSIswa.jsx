import React, { useEffect, useState } from "react";
import "../../../views/css/ListDataSiswa.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import {
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser } from "@coreui/icons";
import Swal from "sweetalert2";
// import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

function LIstDataSIswa() {
  const [name, setName] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [list, setList] = useState([]);
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  // const [show2, setShow2] = useState(false);
  // const [show3, setShow3] = useState(false);
  // const [pages, setPages] = useState(0);
  const [listData, setListData] = useState("");
  // const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [sortedList, setSortedList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const getAll = async () => {
    await axios
      .get(
        `https://api.byrtagihan.com/api/customer/member?page=${currentPage}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setTotalPages(res.data.pagination.total_page);
        console.log(res.data.pagination.total_page);
        setList(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handleSort = (event) => {
  //   setSortBy(event.target.value);
  // };

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

  const filteredListDataSiswa = list.filter((bill) =>
    bill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedListDataSiswa = filteredListDataSiswa.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a[sortBy] - b[sortBy];
    }
  });

  // const handlePageChange = page => {
  //   getAll(page, limit)
  // }

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLimit(newPerPage);
  // }

  const handleFilter = (e) => {
    const newData = filteredCountries.filter((row) =>
      row.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setList(newData);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const [idd, setId] = useState(0);
  const getById = async (id) => {
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
        // console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const put = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      password: password,
    };
    // console.log(data);

    try {
      await axios.put(
        `https://api.byrtagihan.com/api/customer/member/${idd}/password`,
        data,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      // alert("Success")
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
        // data,
        // {
        //   headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        // }
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
        axios.delete("https://api.byrtagihan.com/api/customer/member/" + id, {
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

  useEffect(() => {
    getAll();
  }, [currentPage, searchTerm, sortBy]);

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
          <a class="page-link">{i}</a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h4>List Data Siswa</h4>
                </div>
                <div className="col">
                  <CFormInput
                    type="search"
                    style={{
                      marginBottom: "2px",
                      width: "30%",
                      width: "20em",
                      marginRight: "14px",
                      marginTop: "1px",
                    }}
                    placeholder="search data"
                    value={searchTerm}
                    onChange={handleSearch}
                    // value={channel}
                    // onChange={(e) => setChannel(e.target.value)}
                  />
                </div>
                <div className="col">
                  <button
                    onClick={() => setShow(true)}
                    className="btn btn-primary float-end"
                  >
                    <FontAwesomeIcon icon="fa-plus" /> Tambah Data
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body table-container">
              <table className="table table1 responsive-3">
                <thead>
                  <tr>
                    <th scope="col" onClick={() => handleSort("id")}>
                      Id{" "}
                      {sortConfig && sortConfig.key === "id" && (
                        <FontAwesomeIcon
                          icon={
                            sortConfig.direction === "ascending"
                              ? "fa-sort-up"
                              : "fa-sort-down"
                          }
                        />
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("unique_id")}>
                      Nisn{" "}
                      {sortConfig && sortConfig.key === "unique_id" && (
                        <FontAwesomeIcon
                          icon={
                            sortConfig.direction === "ascending"
                              ? "fa-sort-up"
                              : "fa-sort-down"
                          }
                        />
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("name")}>
                      Name{" "}
                      {sortConfig && sortConfig.key === "name" && (
                        <FontAwesomeIcon
                          icon={
                            sortConfig.direction === "ascending"
                              ? "fa-sort-up"
                              : "fa-sort-down"
                          }
                        />
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("hp")}>
                      hp{" "}
                      {sortConfig && sortConfig.key === "hp" && (
                        <FontAwesomeIcon
                          icon={
                            sortConfig.direction === "ascending"
                              ? "fa-sort-up"
                              : "fa-sort-down"
                          }
                        />
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("address")}>
                      Address{" "}
                      {sortConfig && sortConfig.key === "address" && (
                        <FontAwesomeIcon
                          icon={
                            sortConfig.direction === "ascending"
                              ? "fa-sort-up"
                              : "fa-sort-down"
                          }
                        />
                      )}
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
                                <i className="fas fa-edit"></i>
                              </a>{" "}
                            </button>
                            <button
                              className="edit1"
                              onClick={() => deleteData(data.id)}
                              style={{ background: "red", color: "white" }}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                            <button
                              className="edit1"
                              onClick={() => {
                                setShow1(true);
                                getById(data.id);
                              }}
                              style={{ background: "orange", color: "white" }}
                            >
                              <i className="fas fa-unlock-alt"></i>
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
                                <i className="fas fa-money-bill"></i>
                              </a>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <div>
                  {/* <DataTable
                  columns={columns}
                  data={list}
                  pagination
                  paginationServer 
                  paginationTotalRows={totalPages}
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handlePerRowsChange}
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 15, 25, 50]}
                  paginationComponentOptions={{
                    rowsPerPageText: 'Records per page:',
                    rangeSeparatorText: 'out of',
                  }}
                /> */}
                </div>
              </table>
              <ul class="pagination float-end">
                <li style={{cursor:"pointer"}}
                  className={
                    "page-item" + (currentPage === 1 ? "disabled" : "")
                  }
                  disabled={currentPage === 1}
                >
                  <a style={{cursor:"pointer"}}
                    class="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </a>
                </li>
                {getPageNumbers()}
                <li style={{cursor:"pointer"}}
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
                <CIcon icon={cilUser} />
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
                <FontAwesomeIcon icon="fas fa-file-signature" />
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
                <FontAwesomeIcon icon="fas fa-mobile" />
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
                <FontAwesomeIcon icon="fas fa-map-marker-alt" />
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
                <FontAwesomeIcon icon="fas fa-unlock-alt" />
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
    </div>
  );
}

export default LIstDataSIswa;