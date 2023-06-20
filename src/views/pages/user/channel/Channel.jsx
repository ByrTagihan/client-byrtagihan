import {
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import React from "react";
import "../../../../views/css/ListDataSiswa.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";
import ReactPaginate from "react-paginate";

function Channel() {
  const [userChannel, setUserChannel] = useState([]);
  const [active, setActive] = useState(true);
  const [activeFalse, setActiveFalse] = useState(false);
  const [activeTrue, setActiveTrue] = useState(true);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [channel, setChannel] = useState("");
  const [query, setQuery] = useState("");
  const getAllData = async () => {
    await axios
      .get(`${API_DUMMY}/user/channel?name=${channel}`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // setTotalPage(res.data.pagination.total_page);
        // setPage(res.data.pagination.page);
        // console.log(res.data.pagination.total_page);
        setUserChannel(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan" + error);
      });
  };

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      name,
      active,
    };
    try {
      await axios.post(`${API_DUMMY}/user/channel`, data, {
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

  const [idd, setId] = useState(0);
  const getById = async (id) => {
    await axios
      .get(`${API_DUMMY}/user/channel/` + id, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setActive(res.data.data.active);
        setName(res.data.data.name);
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
      active: activeFalse,
      name: name,
    };
    // console.log(data);

    try {
      await axios.put(`${API_DUMMY}/user/channel/${idd}`, data, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
      });
      // alert("Success")
      setShowEdit(false);
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
  useEffect(() => {
    getAllData(0);
  }, [page, channel]);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(1);
    setChannel(query);
  };

  const deleteE = async (id) => {
    Swal.fire({
      title: "Apakah Anda ingin menghapus?",
      text: "Perubahan data tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Cencel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://api.byrtagihan.com/api/user/channel/` + id, {
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
  return (
    // <>

    // <CFormInput className="inputSearch1"
    //       type="search"
    //       placeholder="search data"
    //       value={channel}
    //       onChange={(e) => setChannel(e.target.value)}
    //     />
    // <div
    //   style={{
    //     border: "1px solid gray",
    //     color: "white",
    //     background: "#526D82",
    //     borderRadius: "10px",
    //     marginBottom: "30px",
    //   }}
    // >
    //   <div
    //     style={{
    //       background: "#526D82",
    //       borderTopRightRadius: "10px",
    //       borderTopLeftRadius: "10px",
    //       display: "flex",
    //       justifyContent: "space-between",
    //       padding: "5px",
    //     }}
    //   >
    //     <p className="listTagihan">User/Channel</p>
    //     <div
    //     style={{
    //       background: "#526D82",
    //       borderTopRightRadius: "10px",
    //       borderTopLeftRadius: "10px",
    //       display: "flex",
    //       justifyContent: "space-between"
    //     }}>
    //   <CFormInput className="inputSearch"
    //       type="search"
    //       placeholder="search data"
    //       value={channel}
    //       onChange={(e) => setChannel(e.target.value)}
    //     />
    //     <CButton onClick={() => setShow(true)}>Tambah Data</CButton>
    //     </div>
    //   </div>
    //   <div className="table-container">
    //     <table className="table table1 border responsive-3">
    //       <thead className="thead-dark" style={{ color: "black" }}>
    //         <tr>
    //           <th scope="col">No</th>
    //           <th scope="col">Nama Bank</th>
    //           <th scope="col">Active</th>
    //         </tr>
    //       </thead>
    //       <tbody className="bg-white ">
    //         {userChannel.map((data, index) => {
    //           return (
    //             <tr key={index}>
    //               <td data-cell="Id">{index + 1}</td>
    //               <td data-cell="Nama Bank">{data.name}</td>
    //               <td data-cell="Active">
    //                 {data.active === true ? (
    //                   <span>true</span>
    //                 ):(
    //                   <span>false</span>
    //                 )}
    //               </td>
    //               <td data-cell="Action" className="tdd">
    //                 <button
    //                   className="edit1"
    //                   type="button"
    //                   style={{ background: "blue" }}
    //                   onClick={() => {
    //                     setShowEdit(true);
    //                     getById(data.id);
    //                   }}
    //                 >
    //                   {" "}
    //                   <i className="fas fa-edit"></i>
    //                 </button>
    //                 <button
    //                 onClick={() => deleteE(data.id)}
    //                   className="edit1"
    //                   style={{ background: "red", color: "white" }}
    //                 >
    //                   <i className="fas fa-trash-alt"></i>
    //                 </button>
    //               </td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>

    //   {/* modal add */}
    //   <Modal show={show} onHide={!show}>
    //     <form onSubmit={add}>
    //       <Modal.Header style={{ background: "#526D82" }}>
    //         <Modal.Title style={{ color: "white" }}>Modal Add</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body style={{ color: "black" }}>
    //         <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
    //           Name :
    //         </label>
    //         <CInputGroup className="mb-3">
    //           <CInputGroupText>
    //             <FontAwesomeIcon icon="fas fa-file-signature" />
    //           </CInputGroupText>
    //           <CFormInput
    //             placeholder="Name"
    //             autoComplete="Name"
    //             type="text"
    //             value={name}
    //             required
    //             onChange={(e) => setName(e.target.value)}
    //           />
    //         </CInputGroup>
    //         <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
    //           Active :
    //         </label>
    //         <CInputGroup className="mb-3">
    //           <CInputGroupText>
    //             <FontAwesomeIcon icon="fas fa-map-marker-alt" />
    //           </CInputGroupText>
    //           <CFormInput
    //             //   placeholder="Adress"
    //             //   autoComplete="Adress"
    //             type="text"
    //             value={activeTrue}
    //             required
    //             onChange={(e) => setActiveTrue(e.target.value)}
    //           />
    //         </CInputGroup>
    //       </Modal.Body>
    //       <Modal.Footer>
    //         <CButton variant="secondary" onClick={() => setShow(false)}>
    //           Close
    //         </CButton>
    //         <CButton
    //           className="btn btn-primary"
    //           variant="primary"
    //           type="submit"
    //         >
    //           Save Changes
    //         </CButton>
    //       </Modal.Footer>
    //     </form>
    //   </Modal>

    //   {/* modal edit */}
    //   <Modal show={showEdit} onHide={!showEdit}>
    //     <form onSubmit={put}>
    //       <Modal.Header style={{ background: "#526D82" }}>
    //         <Modal.Title style={{ color: "white" }}>Modal Edit</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body style={{ color: "black" }}>
    //         <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
    //           Name :
    //         </label>
    //         <CInputGroup className="mb-3">
    //           <CInputGroupText>
    //             <FontAwesomeIcon icon="fas fa-file-signature" />
    //           </CInputGroupText>
    //           <CFormInput
    //             placeholder="Name"
    //             autoComplete="Name"
    //             type="text"
    //             value={name}
    //             required
    //             onChange={(e) => setName(e.target.value)}
    //           />
    //         </CInputGroup>
    //         <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
    //           Active :
    //         </label>
    //         <CInputGroup className="mb-3">
    //           <CInputGroupText>
    //             <FontAwesomeIcon icon="fas fa-map-marker-alt" />
    //           </CInputGroupText>
    //           <CFormInput
    //             //   placeholder="Adress"
    //             //   autoComplete="Adress"
    //             type="text"
    //             value={activeFalse}
    //             required
    //             onChange={(e) => setActiveFalse(e.target.value)}
    //           />
    //         </CInputGroup>
    //       </Modal.Body>
    //       <Modal.Footer>
    //         <CButton variant="secondary" onClick={() => setShowEdit(false)}>
    //           Close
    //         </CButton>
    //         <CButton
    //           className="btn btn-primary"
    //           variant="primary"
    //           type="submit"
    //         >
    //           Save Changes
    //         </CButton>
    //       </Modal.Footer>
    //     </form>
    //   </Modal>
    //   {/* <ReactPaginate
    //       breakLabel="..."
    //       nextLabel="next >"
    //       onPageChange={changePage}
    //       pageRangeDisplayed={5}
    //       pageCount={totalPage}
    //       previousLabel="< previous"
    //       renderOnZeroPageCount={null}
    //       marginPagesDisplayed={2}
    //       containerClassName="pagination justify-content-center"
    //       pageClassName="page-item"
    //       pageLinkClassName="page-link"
    //       previousClassName="page-item"
    //       previousLinkClassName="page-link"
    //       nextClassName="page-item"
    //       nextLinkClassName="page-link"
    //       activeClassName="active"
    //     /> */}

    // </div>
    // </>
    <div className="row">
      <div className="col" xs={12}>
        <div className="card mb-4">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h4>Channel</h4>
              </div>
              <div className="col" style={{marginLeft:"50%"}}>
                <CFormInput
                  type="search"
                  placeholder="search data"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
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
            <table className="table responsive-3 table1">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama Bank</th>
                  <th scope="col">Active</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userChannel.map((data, i) => (
                  <tr key={i}>
                    <th data-cell="No" scope="row">
                      {i + 1}
                    </th>
                    <td data-cell="Name">{data.name}</td>
                    <td data-cell="Active">
                      {data.active === true ? (
                        <span>true</span>
                      ) : (
                        <span>false</span>
                      )}
                    </td>
                    <td data-cell="Action">
                      <div className="tdd">
                        <button
                          className="edit1"
                          type="button"
                          style={{ background: "blue" }}
                          onClick={() => {
                            setShowEdit(true);
                            getById(data.id);
                          }}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => deleteE(data.id)}
                          className="edit1"
                          style={{ background: "red", color: "white" }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Active :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <FontAwesomeIcon icon="fas fa-map-marker-alt" />
              </CInputGroupText>
              <CFormInput
                //   placeholder="Adress"
                //   autoComplete="Adress"
                type="text"
                value={activeTrue}
                required
                onChange={(e) => setActiveTrue(e.target.value)}
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

      {/* modal edit */}
      <Modal show={showEdit} onHide={!showEdit}>
        <form onSubmit={put}>
          <Modal.Header style={{ background: "#526D82" }}>
            <Modal.Title style={{ color: "white" }}>Modal Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
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
              Active :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <FontAwesomeIcon icon="fas fa-map-marker-alt" />
              </CInputGroupText>
              <CFormInput
                //   placeholder="Adress"
                //   autoComplete="Adress"
                type="text"
                value={activeFalse}
                required
                onChange={(e) => setActiveFalse(e.target.value)}
              />
            </CInputGroup>
          </Modal.Body>
          <Modal.Footer>
            <CButton variant="secondary" onClick={() => setShowEdit(false)}>
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

export default Channel;
