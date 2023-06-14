import { cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/ListDataSiswa.css"

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

  const getAll = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/customer/member/${param.id}/bill`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setPages(res.data.data.total_page);
        setList(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
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
  }, []);

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
      await axios.put(
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
        title: "Data berhasil diedit",
        showConfirmButton: false,
      });
      })
      // alert("Success")
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const putUnpaid = async (id) => {
    // e.preventDefault();
    // e.persist();
    console.log(id);

    const data = {
    }

    try {
      await axios.put(
        `https://api.byrtagihan.com/api/customer/member/${param.id}/bill/${id}/unpaid`, data,{
          headers: {"auth-tgh": `jwt ${localStorage.getItem("token")}`},
        });
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

  // const [idd2, setId2] = useState(0);
  // const getUnpaid = async (id) => {
  //   await axios
  //     .get(
  //       `https://api.byrtagihan.com/api/customer/member/${param.id}/bill/` + id,
  //       {
  //         headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //       }
  //     )
  //     .then((res) => {
  //       setId2(res.data.data.id);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };

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
    <>
      <div
        style={{
          width:"100%",
          border: "1px solid gray",
          color: "white",
          background: "#526D82",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <div className="bungkus"
          style={{
            background: "#526D82",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <p className="listTagihan"
          >
            List Tagihan By Member
          </p>
          <CButton onClick={() => setShowAdd(true)}>Tambah Tagihan</CButton>
        </div>
        <table
          className="table table1 border responsive-3"
        >
          <thead className="thead-dark" style={{ color: "black" }}>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Keterangan</th>
              <th scope="col">Periode</th>
              <th scope="col">Status</th>
              <th scope="col">Tanggal Dibayar</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody
            className="bg-white"
          >
            {list.map((data, index) => {
              return (
                <tr key={index}>
                  <td data-cell="Id">{index + 1}</td>
                  <td data-cell="Deskripsi">{data.description}</td>
                  <td data-cell="Periode">{data.periode}</td>
                  {/* {paid_id == 0 ? (
                  <>
                    <td>Belum bayar</td>
                  </>
                ) : paid_id == 1 ? (
                  <>
                    <td>Sudah bayar</td>
                  </>
                ) : paid_id == 2 ? (
                  <>
                    <td>Sudah bayar</td>
                  </>
                ) : (
                  <></>
                )} */}
                  <td data-cell="Status">
                    {" "}
                    {data.paid_id != 0 ? (
                      <span>Sudah Bayar</span>
                    ) : (
                      <span>Belum Bayar</span>
                    )}
                  </td>
                  <td data-cell="Tanggal">{data.paid_date}</td>
                  <td data-cell="Action" className="tdd"
                  >
                    <button className="edit1"
                      type="submit"
                      onClick={() => {
                        setShowEdit(true);
                        getById(data.id);
                      }}
                    >
                      <a>
                        {" "}
                        <i className="fas fa-edit"></i>
                      </a>{" "}
                    </button>
                    <button className="edit1"
                      onClick={() => deleteData(data.id)}
                      style={{ background: "red", color: "white" }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    {data.paid_id != 0 ? (
                      <button className="edit1"
                      type="submit"
                      onClick={() => putUnpaid(data.id)}
                        style={{ background: "green", color: "white" }}
                      >
                        Terbayar
                      </button>
                    ) : (
                      <button className="edit1"
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
              );
            })}
          </tbody>
        </table>

        <div className="readonly">
          <div className="readonly1">
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Nisn : <span>{list1.unique_id}</span>
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Nama : <span>{list1.name}</span>
          </p>
          </div>
          <div className="readonly2">
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            No Hp : <span>{list1.hp}</span>
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Alamat : <span>{list1.address}</span>
          </p>
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
                <FontAwesomeIcon icon="fas fa-align-justify" />
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
                <FontAwesomeIcon icon="fas fa-table" />
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
                <FontAwesomeIcon icon="fas fa-sort-amount-up-alt" />
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
            <Modal.Title style={{ color: "white" }}>Modal Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Deskripsi :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <FontAwesomeIcon icon="fas fa-align-justify" />
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
                <FontAwesomeIcon icon="fas fa-table" />
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
                <FontAwesomeIcon icon="fas fa-sort-amount-up-alt" />
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
            <Modal.Title style={{ color: "white" }}>Modal Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Paid Date :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <FontAwesomeIcon icon="fas fa-table" />
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
                <FontAwesomeIcon icon="fas fa-table" />
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
    </>
  );
}

export default LihatTagihanByMember;
