import React, { useEffect, useState } from 'react'
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CCard,
    CCardBody,
    CButton,
    CFormCheck,
} from "@coreui/react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { API_DUMMY } from '../../../../utils/baseURL';

function ListTagihan() {
    const [bill, setBill] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedBills, setSelectedBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const navigate = useNavigate();

    // Function get
    const get = async () => {
        try {
            const { data, status } = await axios.get(`${API_DUMMY}/member/bill`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            if (status === 200) {
                setBill(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedBills([]);
        } else {
            setSelectedBills(bill);
        }
        setSelectAll(!selectAll);
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

    const filteredBills = bill.filter((bill) =>
        bill.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedBills = filteredBills.sort((a, b) => {
        if (sortBy === 'description') {
            return a.description.localeCompare(b.description);
        } else {
            return a[sortBy] - b[sortBy];
        }
    });

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={"page-item " + (currentPage === i ? 'active' : '')} aria-current="page" onClick={() => handlePageChange(i)}>
                    <a className="page-link">{i}</a>
                </li>
            );
        }
        return pageNumbers;
    };

    useEffect(() => {
        get();
    }, []);

    return (
        <div>
            {bill.length === 0 ? (
                <div className='text-center'>
                    <img src="https://www.pawoon.com/wp-content/uploads/2022/06/checklist-1.png" style={{ width: '6.75rem', height: '6.125rem' }} />
                    <p>Tidak ada tagihan untuk saat ini</p>
                    <CButton to="/home">silahkan kembali ke beranda</CButton>
                </div>
            ) : (
                <div>
                    <CCard className='mb-5'>
                        <CCardBody>
                            <CTable>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">
                                            <CFormCheck id="flexCheckDefault" onChange={handleSelectAll} checked={selectAll} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Periode</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Nominal</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Tanggal dibayar</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Nominal dibayar</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {bill.map((bil, index) => {
                                        return (
                                            <CTableRow key={index}>
                                                <CTableHeaderCell scope="row">
                                                </CTableHeaderCell>
                                                <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                                <CTableDataCell>{bil.description}</CTableDataCell>
                                                <CTableDataCell>{bil.periode}</CTableDataCell>
                                                <CTableDataCell>{bil.amount}</CTableDataCell>
                                                <CTableDataCell>{bil.payment_id}</CTableDataCell>
                                                <CTableDataCell>{bil.paid_date}</CTableDataCell>
                                                <CTableDataCell>{bil.paid_amount}</CTableDataCell>
                                                <CTableDataCell><CButton onClick={() => navigate(`/bayarTagihan/${bil.id}`)}>Bayar</CButton></CTableDataCell>
                                            </CTableRow>
                                        )
                                    })}
                                </CTableBody>
                            </CTable>
                            <ul className="pagination float-end">
                                <li className={"page-item " + (currentPage === 1 ? 'disabled' : '')} disabled={currentPage === 1} >
                                    <a className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                                </li>
                                {getPageNumbers()}
                                <li className={"page-item " + (currentPage === totalPages ? 'disabled' : '')} disabled={currentPage === totalPages} >
                                    <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                                </li>
                            </ul>
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardBody className='d-flex justify-content-between'>
                            <CFormCheck id="flexCheckDefault" onChange={handleSelectAll} checked={selectAll} label="Pilih semua" />
                            <p>Total Pembayaran: Rp.{selectedBills.reduce((total, bil) => total + bil.amount, 0)}</p>
                            <CButton onClick={() => navigate(`/bayarSemuaTagihan`)}>Bayar Semua</CButton>
                        </CCardBody>
                    </CCard>
                </div>
            )}
        </div>
    )
}

export default ListTagihan