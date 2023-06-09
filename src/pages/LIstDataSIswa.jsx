import React, { useEffect, useState } from "react";
// import "../css/ListDataSiswa.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser } from "@coreui/icons";
import Swal from "sweetalert2";
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

  const getAll = async () => {
    await axios
      .get(`https://api.byrtagihan.com/api/customer/member`, {
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

  const [idd, setId] = useState(0);
  const getById = async (id) => {
    await axios
      .get("https://api.byrtagihan.com/api/customer/member/" + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUnique_id(res.data.data.unique_id);
        setName(res.data.data.name);
        setAddress(res.data.data.address);
        setHp(res.data.data.hp);
        setId(res.data.data.id);
        console.log(res.data.data);
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
    console.log(data);

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
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` }
        }
        // data,
        // {
        //   headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        // }
      );
      console.log(unique_id);
      setShow(false);
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
        console.log(id);
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

  useEffect(() => {
    getAll(0);
  }, []);

  return (
    <div>
      <button
        type="button"
        style={{
          backgroundColor: "#213555",
          color: "white",
          float: "right",
          marginBottom: "20px",
        }}
        onClick={() => setShow(true)}
      >
        Add
      </button>

      <table class="table border" style={{ textAlign: "center" }}>
        <thead
          class="thead-dark"
          style={{ backgroundColor: "#213555", color: "white" }}
        >
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nisn</th>
            <th scope="col">Name</th>
            <th scope="col">hp</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white" style={{ textAlign: "center" }}>
          {list.map((data, index) => {
            return (
              <tr key={data.index}>
                <td>{index + 1}</td>
                <td>{data.unique_id}</td>
                <td>{data.name}</td>
                <td>{data.hp}</td>
                <td>{data.address}</td>
                <td style={{ display: "flex", gap: "5px", width: "100%" }}>
                  <button
                    type="button"
                    style={{ background: "none", marginLeft: "20%" }}
                    // onClick={() => {
                    //   setShow2(true);
                    //   getById(data.id);
                    // }}
                  >
                    <a href={"/#/Editlistdatasiswa/" + data.id}>
                      {" "}
                      <i class="fas fa-edit"></i>
                    </a>{" "}
                  </button>
                  <button
                    onClick={() => deleteData(data.id)}
                    style={{ background: "none" }}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <button
                    onClick={() => {
                      setShow1(true);
                      getById(data.id);
                    }}
                    style={{ background: "none" }}
                  >
                    <i class="fas fa-unlock-alt"></i>
                  </button>
                  <button>
                   <a href={"/#/datatagihan/" + data.id}> <i class="fas fa-money-bill"></i></a>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal Edit Password*/}
      <Modal show={show1} onHide={!show1}>
        <form onSubmit={put}>
          <Modal.Header>
            <Modal.Title style={{ color: "black" }}>
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
          <Modal.Header>
            <Modal.Title style={{ color: "black" }}>Modal Add</Modal.Title>
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
                onChange={(e) => setName(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              hp :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="hp"
                autoComplete="hp"
                type="number"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Adress :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="Adress"
                autoComplete="Adress"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
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
