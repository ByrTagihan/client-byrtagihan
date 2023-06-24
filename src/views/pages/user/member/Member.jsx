import { CCard, CCardHeader, CCardBody, CTable, CTableRow, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormLabel, CCol, CFormInput, CInputGroup, CForm, CFormSelect, CInputGroupText, } from '@coreui/react';
import axios from 'axios';
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_DUMMY } from '../../../../utils/baseURL';

function Member() {
    const [member, setMember] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [costumer, setCostumer] = useState([]);
    const [show, setShow] = useState(false);
    const [organization_id, setOrganization_id] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [hp, setHp] = useState("");
    const [password, setPassword] = useState("");
    const [unique_id, setUnique_id] = useState("");
    const [customer_id, setCustomer_id] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState("fa-solid fa-eye-slash");
    const [currentPage, setCurrentPage] = useState(1);
    const [total_page, setTotal_Page] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [selectedMember, setSelectedMember] = useState([]);
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();

    // Function get
    const get = async () => {
        try {
            const { data, status } = await axios.get(`${API_DUMMY}/user/member`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            if (status === 200) {
                setMember(data.data);
                // console.log(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const Delete = async (id) => {
        Swal.fire({
            title: "Ingin menghapus data ?",
            // text: "Data changes are non-refundable!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${API_DUMMY}/user/member/${id}`, {
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

    const addMember = async (e) => {
        e.preventDefault();

        const data = {
            organization_id: organization_id,
            unique_id: unique_id,
            name: name,
            address: address,
            hp: hp,
            password: password,
            customer_id: customer_id,
        };

        try {
            const response = await axios.post(
                `${API_DUMMY}/user/member`,
                data,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            );

            setShow(false);
            Swal.fire({
                icon: "success",
                title: "Berhasil Ditambahkan",
                showConfirmButton: false,
                timer: 1500,
            });

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Gagal Menambahkan",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const GetOrganization = async () => {
        try {
            const { data, status } = await axios.get(`${API_DUMMY}/user/organization`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            if (status === 200) {
                setOrganization(data.data);
                // console.log(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const GetCostumer = async () => {
        try {
            const { data, status } = await axios.get(`${API_DUMMY}/user/customer`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            if (status === 200) {
                setTotal_Page(data.pagination.total_page);
                setCostumer(data.data);
                // console.log(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            setPasswordIcon("fa-solid fa-eye");
            return;
        }
        setPasswordType("password");
        setPasswordIcon("fa-solid fa-eye-slash");
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= total_page; i++) {
            pageNumbers.push(
                <li
                    key={i}
                    className={"page-item " + (currentPage === i ? "active" : "")}
                    aria-current="page"
                    onClick={() => handlePageChange(i)}
                >
                    <a className="page-link">{i}</a>
                </li>
            );
        }
        return pageNumbers;
    };

    const filteredMember = member.filter((member) => {
        if (member && member.description && searchTerm) {
            return member.description.toLowerCase().includes(searchTerm.toLowerCase())
        }
        return false;
    })

    const sortedMember = filteredMember.sort((a, b) => {
        if (sortBy === "description") {
            return a.description.localeCompare(b.description);
        } else {
            return a[sortBy] - b[sortBy];
        }
    });

    useEffect(() => {
        get();
        GetOrganization();
        GetCostumer();
    }, [currentPage, searchTerm, sortBy]);

    return (
        <div className='mb-5'>
            <CCard>
                <CCardHeader>
                    <div className='d-flex justify-content-between'>
                        <h4>Siswa</h4>
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            <div>
                                <CFormInput className="inputSearch"
                                    type="search"
                                    placeholder="search data"
                                    value={searchTerm} onChange={handleSearch}
                                />
                            </div>
                            <CButton onClick={() => setVisible(!visible)}>
                                <FontAwesomeIcon icon="fa-plus" />
                                Tambah data
                            </CButton>
                        </div>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Unique_id</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Sekolah</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                                <CTableHeaderCell scope="col">No.Hp</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {member.map((mem, index) => {
                                return (
                                    <CTableRow key={index}>
                                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                        <CTableDataCell>{mem.name}</CTableDataCell>
                                        <CTableDataCell>{mem.unique_id}</CTableDataCell>
                                        <CTableDataCell>{mem.organization_name}</CTableDataCell>
                                        <CTableDataCell>{mem.address}</CTableDataCell>
                                        <CTableDataCell>{mem.hp}</CTableDataCell>
                                        <CTableDataCell>
                                            <CButton onClick={() => navigate(`/editUserMember/${mem.id}`)}>
                                                <i className="fas fa-edit" style={{ color: 'white' }}></i>
                                            </CButton>
                                            {" "}
                                            <CButton onClick={() => Delete(mem.id)} className='btn-danger'>
                                                <i className="fas fa-trash-alt" style={{ color: 'white' }}></i>
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                )
                            })}
                        </CTableBody>
                    </CTable>
                    {/* Pagination */}
                    <div>
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
                            {getPageNumbers()}
                            <li
                                className={
                                    "page-item " +
                                    (currentPage === total_page ? "disabled" : "")
                                }
                                disabled={currentPage === total_page}
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
                </CCardBody>
            </CCard>

            {/* Modal add */}
            <CModal visible={visible}>
                <CModalHeader onClose={() => setVisible(false)}>
                    <CModalTitle>Tambah data siswa</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label text-dark">Unique id</CFormLabel>
                            <CCol sm={10}>
                                <CFormInput
                                    placeholder="Unique id"
                                    autoComplete="Unique id"
                                    onChange={(e) => setUnique_id(e.target.value)}
                                    value={unique_id}
                                />
                            </CCol>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label text-dark">Nama</CFormLabel>
                            <CCol sm={10}>
                                <CFormInput
                                    placeholder="Nama Siswa"
                                    autoComplete="Nama Siswa"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name} />
                            </CCol>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label text-dark">Alamat</CFormLabel>
                            <CCol sm={10}>
                                <CFormInput
                                    placeholder="Alamat"
                                    autoComplete="Alamat"
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address} />
                            </CCol>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label text-dark">No.Hp</CFormLabel>
                            <CCol sm={10}>
                                <CFormInput
                                    placeholder="No hp"
                                    autoComplete="No hp"
                                    onChange={(e) => setHp(e.target.value)}
                                    value={hp} />
                            </CCol>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label text-dark">Sekolah</CFormLabel>
                            <CCol sm={10}>
                                <CFormSelect aria-label="Default select example" value={organization_id} onChange={(e) =>
                                    setOrganization_id(e.target.value.toString())
                                }>
                                    <option>Pilih Sekolah</option>
                                    {organization.map((org, i) => {
                                        return (
                                            <option value={org.id} key={i}>{org.name}</option>
                                        )
                                    })}
                                </CFormSelect>
                            </CCol>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label text-dark">Password</CFormLabel>
                            <CInputGroupText>
                                <span
                                    onClick={togglePassword}
                                >
                                    <i className={passwordIcon}></i>
                                </span>
                            </CInputGroupText>
                            <CFormInput
                                type={passwordType}
                                placeholder="Password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label text-dark">Admin</CFormLabel>
                            <CCol sm={10}>
                                <CFormSelect aria-label="Default select example" value={customer_id} onChange={(e) =>
                                    setCustomer_id(e.target.value.toString())
                                }>
                                    <option>Pilih Admin Sekolah</option>
                                    {costumer.map((cos, i) => {
                                        return (
                                            <option value={cos.id} key={i}>{cos.name}</option>
                                        )
                                    })}
                                </CFormSelect>
                            </CCol>
                        </CInputGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton onClick={addMember}>Simpan</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default Member