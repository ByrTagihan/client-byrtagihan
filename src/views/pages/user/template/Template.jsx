import { CFormInput } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../../../../views/css/ListDataSiswa.css"
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { API_DUMMY } from '../../../../utils/baseURL';
import Swal from 'sweetalert2';

function Template() {
    const [listTemplate, setListTemplate] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');

    const getAll = async () => {
        await axios
          .get(
            `${API_DUMMY}/user/template?pages=${currentPage}`,
            {
              headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            }
          )
          .then((res) => {
            setTotalPages(res.data.pagination.total_page);
            setListTemplate(res.data.data);
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
    
      const filteredTemplate = listTemplate.filter((bill) =>
        bill.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      const sortedTemplate = filteredTemplate.sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else {
          return a[sortBy] - b[sortBy];
        }
      });
    
      useEffect(() => {
        getAll();
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

      const deleteT = async (id) => {
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
            axios.delete(`${API_DUMMY}/user/template/` + id, {
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
              <h4>Template</h4>
            </div>
            <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
            <div className='inputSearch'>
              <CFormInput
                type="search"
                placeholder="search data"
                value={searchTerm} onChange={handleSearch} 
              />
            </div>
            <div className="">
              <button
                className="btn btn-primary float-end"
              >
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
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Create Date</th>
                <th scope="col">Update Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                {sortedTemplate.map((data, index) => {
                    return (
                        <tr key={index}>
                  <td data-cell="Id" scope="row"> {data.id}
                  </td>
                  <td data-cell="Name">{data.name}</td>
                  <td data-cell="Create Date">{data.created_date}
                  </td>
                  <td data-cell="Update Date">{data.updated_date}
                  </td>
                  <td data-cell="Action">
                    <div className="tdd">
                      <button
                        className="edit1"
                        type="button"
                        style={{ background: "blue" }}
                        // onClick={() => {
                        //   setShowEdit(true);
                        //   getById(data.id);
                        // }}
                      >
                        {" "}
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => deleteT(data.id)}
                        className="edit1"
                        style={{ background: "red", color: "white" }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
             
                    )
                })}
               
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

    {/* <Modal show={show} onHide={!show}>
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
    {/* <Modal show={showEdit} onHide={!showEdit}>
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
    </Modal>  */}
  </div>
  )
}

export default Template