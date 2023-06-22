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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
// import ReactPaginate from "react-paginate"; Aku hapus ya fat :)

function Customer() {
  const [userCustomer, setUserCustomer] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState("");
  const [organization, setOrganization] = useState("");

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

  const [pagee, setPagee] = useState(1);
  const [customer, setCustomer] = useState("");
  // const [limit, setLimit] = useState(0);
  // const [startIndex, setStartIndex] = useState();
  // const [lastIndex, setLastIndex] = useState();
  // const getAllData = async (pages = 0, limit = 2) => {
  //   await axios
  //     .get(
  //       `${API_DUMMY}/user/customer?page=${pages}&limit=${limit}&name=${customer}`,
  //       {
  //         headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //       }
  //     )
  //     .then((res) => {
  //       setPagee(res.data.pagination.total_page);
  //       console.log(res.data.pagination.total_page);
  //       setUserCustomer(res.data.data);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };
  const [userCustomer1, setUserCustomer1] = useState([]);
  // const getAllData1 = async (pages = 0, limit = 2) => {
  //   await axios
  //     .get(
  //       `${API_DUMMY}/user/customer?page=${pages}&limit=${limit}&name=${customer}`,
  //       {
  //         headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //       }
  //     )
  //     .then((res) => {
  //       setPagee(res.data.pagination.total_page);
  //       setUserCustomer1(res.data.data);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan" + error);
  //     });
  // };

  
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  // const getAllData1 = async () => {
  //   const response = await axios.get(
  //     `${API_DUMMY}/user/customer?name=${customer}?pages=${currentPage}`,
  //     {
  //       headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
  //     }
  //   );
  //   setUserCustomer1(response.data.data);
  //   // setPagee(response.data.pagination.page);
  //   setTotalPages(response.data.pagination.total_page);
  //   // console.log(response.data.pagination.page);
  //   // console.log("total " + response.data.pagination.total_page);
  // };

  const getAllData1 = async () => {
    await axios
      .get(
        `${API_DUMMY}/user/customer?pages=${currentPage}`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
        }
      )
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

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredUserCustomer = userCustomer1.filter((bill) =>
    bill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUserCustomer = filteredUserCustomer.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return a[sortBy] - b[sortBy];
    }
  });

  useEffect(() => {
    getAllData1();
  }, [currentPage, searchTerm, sortBy]);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={"page-item " + (currentPage === i  ? 'active' : '')}  aria-current="page" onClick={() => handlePageChange(i)}>
          <a class="page-link">{i}</a>
        </li>
      );
    }
    return pageNumbers;
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
    // <>
    //   <form onSubmit={searchData} style={{ display: "flex", gap: "10px" }}>
    //     {/* <select
    //       style={{ marginBottom: "10px", width: "30%" }}
    //       onChange={(e) => setCustomer(e.target.value)}
    //       class="form-select form-select-sm"
    //       aria-label=".form-select-sm example"
    //     >
    //       <option selected>Filter data</option>
    //       {userCustomer1.map((down, idx) => {
    //         return (
    //           <option key={idx} value={down.id}>
    //             <p>{down.name}</p>
    //           </option>
    //         );
    //       })}
    //     </select> */}
    //     {/* <CButton
    //       style={{
    //         width: "8%",
    //         padding: "0px",
    //         marginBottom: "10px",
    //         paddingBottom: "0px",
    //       }}
    //       type="submit"
    //     >
    //       Search
    //     </CButton> */}
    //   </form>
    //   <div
    //     style={{
    //       border: "1px solid gray",
    //       color: "white",
    //       background: "#526D82",
    //       borderRadius: "5px",
    //       marginBottom: "30px",
    //     }}
    //   >
    //     <div
    //       style={{
    //         background: "#526D82",
    //         borderTopRightRadius: "10px",
    //         borderTopLeftRadius: "10px",
    //         display: "flex",
    //         justifyContent: "space-between",
    //         padding: "5px",
    //       }}
    //     >
    //       <p className="listTagihan">User/Customer</p>

    //       <div
    //         style={{
    //           background: "#526D82",
    //           borderTopRightRadius: "10px",
    //           borderTopLeftRadius: "10px",
    //           display: "flex",
    //           justifyContent: "space-between",
    //         }}
    //       >
    //         <CFormInput
    //           type="search"
    //           style={{
    //             marginBottom: "2px",
    //             width: "30%",
    //             width: "20em",
    //             marginRight: "14px",
    //             marginTop: "1px",
    //           }}
    //           placeholder="search data"
    //           value={customer}
    //           onChange={(e) => setCustomer(e.target.value)}
    //         />
    //         <CButton onClick={() => setShow(true)}>Tambah Data</CButton>
    //       </div>
    //     </div>
    //     <div className="table-container">
    //       <table className="table table1 border responsive-3">
    //         <thead className="thead-dark" style={{ color: "black" }}>
    //           <tr>
    //             <th scope="col">No</th>
    //             <th scope="col">Email</th>
    //             <th scope="col">Nama</th>
    //             <th scope="col">Hp</th>
    //             <th scope="col">Active</th>
    //             <th scope="col">action</th>
    //           </tr>
    //         </thead>
    //         <tbody className="bg-white ">
    //           {userCustomer1.map((data, index) => {
    //             return (
    //               <tr key={index}>
    //                 <td data-cell="Id">{index + 1}</td>
    //                 <td data-cell="Email">{data.email}</td>
    //                 <td data-cell="Nama">{data.name}</td>
    //                 <td data-cell="No Hp">{data.hp}</td>
    //                 <td data-cell="Active">{data.active}</td>
    //                 <td data-cell="Action" className="tdd">
    //                   <button
    //                     className="edit1"
    //                     type="button"
    //                     style={{ background: "blue" }}
    //                   >
    //                     <a
    //                       href={"/#/editUserCustomer/" + data.id}
    //                       style={{ color: "white" }}
    //                     >
    //                       {" "}
    //                       <i className="fas fa-edit"></i>
    //                     </a>{" "}
    //                   </button>
    //                   <button
    //                     className="edit1"
    //                     onClick={() => deleteE(data.id)}
    //                     style={{ background: "red", color: "white" }}
    //                   >
    //                     <i className="fas fa-trash-alt"></i>
    //                   </button>
    //                 </td>
    //               </tr>
    //             );
    //           })}
    //         </tbody>
    //       </table>
    //     </div>

    //     {/* modal add */}
    //     <Modal show={show} onHide={!show}>
    //       <form onSubmit={add}>
    //         <Modal.Header style={{ background: "#526D82" }}>
    //           <Modal.Title style={{ color: "white" }}>Modal Add</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body style={{ color: "black" }}>
    //           <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
    //             Name :
    //           </label>
    //           <CInputGroup className="mb-3">
    //             <CInputGroupText>
    //               <FontAwesomeIcon icon="fas fa-file-signature" />
    //             </CInputGroupText>
    //             <CFormInput
    //               placeholder="Name"
    //               autoComplete="Name"
    //               type="text"
    //               value={name}
    //               required
    //               onChange={(e) => setName(e.target.value)}
    //             />
    //           </CInputGroup>
    //           <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
    //             hp :
    //           </label>
    //           <CInputGroup className="mb-3">
    //             <CInputGroupText>
    //               <FontAwesomeIcon icon="fas fa-mobile" />
    //             </CInputGroupText>
    //             <CFormInput
    //               placeholder="hp"
    //               autoComplete="hp"
    //               type="number"
    //               value={hp}
    //               required
    //               onChange={(e) => setHp(e.target.value)}
    //             />
    //           </CInputGroup>
    //           <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
    //             Adress :
    //           </label>
    //           <CInputGroup className="mb-3">
    //             <CInputGroupText>
    //               <FontAwesomeIcon icon="fas fa-map-marker-alt" />
    //             </CInputGroupText>
    //             <CFormInput
    //               placeholder="Adress"
    //               autoComplete="Adress"
    //               type="text"
    //               value={address}
    //               required
    //               onChange={(e) => setAddress(e.target.value)}
    //             />
    //           </CInputGroup>
    //           <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
    //             Password :
    //           </label>
    //           <CInputGroup className="mb-3">
    //             <CInputGroupText>
    //               <FontAwesomeIcon icon="fas fa-unlock-alt" />
    //             </CInputGroupText>
    //             <CFormInput
    //               placeholder="Password"
    //               autoComplete="Password"
    //               type="password"
    //               value={password}
    //               required
    //               onChange={(e) => setPassword(e.target.value)}
    //             />
    //           </CInputGroup>
    //           <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
    //             Email :
    //           </label>
    //           <CInputGroup className="mb-3">
    //             <CInputGroupText>
    //               <FontAwesomeIcon icon="fas fa-at" />
    //             </CInputGroupText>
    //             <CFormInput
    //               placeholder="email"
    //               autoComplete="email"
    //               type="email"
    //               value={email}
    //               required
    //               onChange={(e) => setEmail(e.target.value)}
    //             />
    //           </CInputGroup>
    //           <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
    //             Active :
    //           </label>
    //           <CInputGroup className="mb-3">
    //             <CInputGroupText>
    //               <FontAwesomeIcon icon="fas fa-check-square" />
    //             </CInputGroupText>
    //             <CFormInput
    //               placeholder="Active"
    //               autoComplete="Active"
    //               type="text"
    //               value={active}
    //               required
    //               onChange={(e) => setActive(e.target.value)}
    //             />
    //           </CInputGroup>
    //         </Modal.Body>
    //         <Modal.Footer>
    //           <CButton variant="secondary" onClick={() => setShow(false)}>
    //             Close
    //           </CButton>
    //           <CButton
    //             className="btn btn-primary"
    //             variant="primary"
    //             type="submit"
    //           >
    //             Save Changes
    //           </CButton>
    //         </Modal.Footer>
    //       </form>
    //     </Modal>
    //     <ReactPaginate
    //       breakLabel="..."
    //       nextLabel="next >"
    //       onPageChange={changePage}
    //       pageRangeDisplayed={5}
    //       pageCount={pages}
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
    //     />
    //   </div>
    // </>
    <div>
      <div className="row">
        <div className="col" xs={12}>
        <div className='inputSearch1'>
              <CFormInput
                type="search"
                placeholder="search data"
                value={searchTerm} onChange={handleSearch} 
              />
            </div>
          <div className="card mb-4">
            <div className="card-header">
              <div style={{display:"flex"}}>
                <div className="col">
                  <h4>Customer</h4>
                </div>
            <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                <div>
                <CFormInput className="inputSearch"
                  type="search"
                  placeholder="search data"
                  value={searchTerm} onChange={handleSearch} 
                />
              </div>
                <div>
                  <button onClick={() => setShow(true)} className="btn btn-primary">
                    <FontAwesomeIcon icon="fa-plus" /> Tambah Data
                  </button>
                </div>
                </div>
              </div>
            </div>
            <div className="card-body table-container">
              <table className="table responsive-3 table1">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Email</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Hp</th>
                    <th scope="col">Active</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUserCustomer.map((data, i) => (
                    <tr key={i}>
                      <td scope="row" data-cell="No">{i + 1}</td>
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
                            <i className="fas fa-edit"></i>
                          </a>{" "}
                        </button>
                        <button
                          className="edit1"
                          onClick={() => deleteE(data.id)}
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
      <ul class="pagination float-end">
            <li className={"page-item " + (currentPage === 1 ? 'disabled' : '')} disabled={currentPage === 1} >
              <a class="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
            </li>
            {getPageNumbers()}
            <li className={"page-item " + (currentPage === totalPages ? 'disabled' : '')} disabled={currentPage === totalPages} >
              <a class="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
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
              <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
                Email :
              </label>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <FontAwesomeIcon icon="fas fa-at" />
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
                  <FontAwesomeIcon icon="fas fa-check-square" />
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
