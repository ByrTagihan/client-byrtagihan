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
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CListGroup,
    CListGroupItem,
    CFormSelect,
} from "@coreui/react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function ListTagihan() {
    const [bill, setBill] = useState([]);
    const navigate = useNavigate();

    // Function get
    const get = async () => {
        try {
            const { data, status } = await axios.get(`https://api.byrtagihan.com/api/member/bill`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            if (status === 200) {
                setBill(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        get();
    }, []);

    return (
        <div>
            <CCard>
                <CCardBody>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow>
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
                                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
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
                </CCardBody>
            </CCard>
        </div>
    )
}

export default ListTagihan