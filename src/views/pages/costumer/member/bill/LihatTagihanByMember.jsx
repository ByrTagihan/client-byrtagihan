import { cilBook, cilDescription, cilMoney, cilNotes, cilPencil, cilPlus, cilTrash, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../../../../../views/css/ListDataSiswa.css";

function LihatTagihanByMember() {
  const [unique_id, setUnique_id] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [list, setList] = useState([]);
  const [list1, setList1] = useState({
    unique_id: "",
    name: "",
    address: "",
    hp: "",
  });
  const param = useParams();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showEditSudahByr, setShowEditSudahByr] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [periode, setPeriode] = useState("");
  const [paid_id, setPaid_id] = useState("");
  const [paid_date, setPaid_date] = useState("");
  const [paid_amount, setPaid_amount] = useState("");
  const [limit, setLimit] = useState(10);
  const [sortedList, setSortedList] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");

  const getAll = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/customer/member/${param.id}/bill?page=${currentPage}&limit=${limit}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTotalPages(res.data.pagination.total_page);
        setList(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  }; const handleSearch = (event) => {
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
          data.description.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getAll2 = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/customer/member/${param.id}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setList1(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };
  useEffect(() => {
    getAll(0);
    getAll2(0);
  }, [currentPage, searchTerm, sortBy, limit]);

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      description,
      amount,
      periode,
    };
    try {
      await axios.post(
        `https://api.byrtagihan.com/api/customer/member/${param.id}/bill`,
        data,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
        // data,
        // {
        //   headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        // }
      );
      setShowAdd(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(data);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    Swal.fire({
      title: "Apakah data ini akan di hapus?",
      text: "Data changes are non-refundable!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cencel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(
          `https://api.byrtagihan.com/api/customer/member/${param.id}/bill/` +
            id,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          showConfirmButton: false,
        });
        console.log(id);
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

  const put = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      amount: amount,
      periode: periode,
      description: description,
    };
    console.log(data);

    try {
      await axios.put(
        `https://api.byrtagihan.com/api/customer/bill/` + idd,
        data,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      );
      // alert("Success")
      setShowEdit(false);
      Swal.fire({
        icon: "success",
        title: "Data berhasil diedit",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const putSudahByr = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      paid_date: paid_date,
      paid_amount: paid_amount,
    };
    console.log(data);

    try {
      await axios
        .put(
          `https://api.byrtagihan.com/api/customer/member/${param.id}/bill/${idd1}/paid`,
          data,
          {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          }
        )
        .then(() => {
          setShowEdit(false);
          Swal.fire({
            icon: "success",
            title: "Berhasil dibayar",
            showConfirmButton: false,
          });
        });
      // alert("Success")
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const putUnpaid = async (id) => {
    Swal.fire({
      title: "Yakin ingin membatalkan pembayaran ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cencel",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.put(
            `https://api.byrtagihan.com/api/customer/member/${param.id}/bill/${id}/unpaid`,
            {},
            {
              headers: {
                "auth-tgh": `jwt ${localStorage.getItem("token")}`,
              },
            }
          );
          Swal.fire({
            icon: "success",
            title: "Berhasil Membatalkan Pembayaran",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [idd1, setId1] = useState(0);
  const getByIdSudahByr = async (id) => {
    await axios
      .get(
        `https://api.byrtagihan.com/api/customer/member/${param.id}/bill/` + id,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setPaid_amount(res.data.data.paid_amount);
        setPaid_date(res.data.data.paid_date);
        setId1(res.data.data.id);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const [idd, setId] = useState(0);
  const getById = async (id) => {
    await axios
      .get("https://api.byrtagihan.com/api/customer/bill/" + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setPeriode(res.data.data.periode);
        setAmount(res.data.data.amount);
        setDescription(res.data.data.description);
        setId(res.data.data.id);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };
  return (
    <div>
      <div className="row">
        <div className="col" xs={12}>
          <div className="card mb-4">
            <div className="card-header">
              <div style={{ display: "flex" }}>
                <div className="col">
                  <h4>Lihat Tagihan By Member</h4>
                </div>
                <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}>
                <div className="col">
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
                <div className="col">
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
                <div className="col">
                  <button
                    onClick={() => setShowAdd(true)}
                    className="btn btn-primary float-end"
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
                  {/* <tr>
                    <th scope="col">No</th>
                    <th scope="col">Keterangan</th>
                    <th scope="col">Periode</th>
                    <th scope="col">Status</th>
                    <th scope="col">Tanggal Dibayar</th>
                    <th scope="col">Action</th>
                  </tr> */}
                  <tr>
                    <th scope="col" onClick={() => handleSort("no")}>
                      No{" "}
                      {sortConfig && sortConfig.key === "no" && (
                        (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("keterangan")}>
                      Keterangan{" "}
                      {sortConfig && sortConfig.key === "keterangan" && (
                        (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("periode")}>
                      Periode{" "}
                      {sortConfig && sortConfig.key === "periode" && (
                        (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("status")}>
                      status{" "}
                      {sortConfig && sortConfig.key === "status" && (
                        (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                    <th scope="col" onClick={() => handleSort("tanggal_dibayar")}>
                      Tanggal Dibayar{" "}
                      {sortConfig && sortConfig.key === "tanggal_dibayar" && (
                        (sortConfig.direction === 'ascending' ? '▲' : '▼')
                      )}
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedList.map((data, i) => (
                    <tr key={i}>
                      <td data-cell="No">{i + 1}</td>
                      <td data-cell="Deskripsi">{data.description}</td>
                      <td data-cell="Periode">{data.periode}</td>
                      <td data-cell="Status">
                        {" "}
                        {data.paid_id != 0 ? (
                          <span>Sudah Bayar</span>
                        ) : (
                          <span>Belum Bayar</span>
                        )}
                      </td>
                      <td data-cell="Tanggal">{data.paid_date}</td>
                      <td data-cell="Action" className="tdd">
                        <button
                          className="edit1"
                          type="submit"
                          onClick={() => {
                            setShowEdit(true);
                            getById(data.id);
                          }}
                        >
                          <a>
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
                        {data.paid_id != 0 ? (
                          <button
                            className="edit1"
                            type="submit"
                            onClick={() => putUnpaid(data.id)}
                            style={{ background: "green", color: "white" }}
                          >
                            Terbayar
                          </button>
                        ) : (
                          <button
                            className="edit1"
                            onClick={() => {
                              setShowEditSudahByr(true);
                              getByIdSudahByr(data.id);
                            }}
                            style={{ background: "green", color: "white" }}
                          >
                            Bayar
                          </button>
                        )}
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
         <Modal show={showAdd} onHide={!showAdd}>
         <form onSubmit={add}>
           <Modal.Header style={{ background: "#526D82" }}>
             <Modal.Title style={{ color: "white" }}>Modal Add</Modal.Title>
           </Modal.Header>
           <Modal.Body style={{ color: "black" }}>
             <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
               Deskripsi :
             </label>
             <CInputGroup className="mb-3">
               <CInputGroupText>
                <CIcon icon={cilDescription}/>
               </CInputGroupText>
               <CFormInput
                placeholder="Deskripsi"
                autoComplete="Deskripsi"
                type="text"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Periode :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
               <CIcon icon={cilNotes}/>
              </CInputGroupText>
              <CFormInput
                placeholder="periode"
                autoComplete="periode"
                type="date"
                value={periode}
                required
                onChange={(e) => setPeriode(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Amount :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilMoney}/>
              </CInputGroupText>
              <CFormInput
                placeholder="Amount"
                autoComplete="Amount"
                type="number"
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </CInputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAdd(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* MOdal Edit */}
      <Modal show={showEdit} onHide={!showEdit}>
        <form onSubmit={put}>
          <Modal.Header style={{ background: "#526D82" }}>
            <Modal.Title style={{ color: "white" }}>Modal Edit Pembayaran</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Deskripsi :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilDescription}/>
              </CInputGroupText>
              <CFormInput
                placeholder="Deskripsi"
                autoComplete="Deskripsi"
                type="text"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Periode :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilNotes}/>
              </CInputGroupText>
              <CFormInput
                placeholder="periode"
                autoComplete="periode"
                type="date"
                value={periode}
                required
                onChange={(e) => setPeriode(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Amount :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilMoney}/>
              </CInputGroupText>
              <CFormInput
                placeholder="Amount"
                autoComplete="Amount"
                type="number"
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </CInputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEdit(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showEditSudahByr} onHide={!showEditSudahByr}>
        <form onSubmit={putSudahByr}>
          <Modal.Header style={{ background: "#526D82" }}>
            <Modal.Title style={{ color: "white" }}>Modal Pembayaran</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Paid Date :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
               <CIcon icon={cilBook}/>
              </CInputGroupText>
              <CFormInput
                placeholder="Paid Date"
                autoComplete="Paid Date"
                type="date"
                value={paid_date}
                onChange={(e) => setPaid_date(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Paid Amount :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilBook}/>
              </CInputGroupText>
              <CFormInput
                placeholder="Paid Amount"
                autoComplete="Paid Amount"
                type="number"
                value={paid_amount}
                onChange={(e) => setPaid_amount(e.target.value)}
              />
            </CInputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowEditSudahByr(false)}
            >
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

export default LihatTagihanByMember;