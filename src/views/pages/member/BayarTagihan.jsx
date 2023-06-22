import React, { useEffect, useState } from 'react'
import {
    CCard,
    CListGroup,
    CListGroupItem,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormSelect,
    CModalFooter,
    CAccordion,
    CAccordionHeader,
    CAccordionItem,
    CAccordionBody,
} from "@coreui/react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function BayarTagihan() {
    const [channel, setChannel] = useState([]);
    const [channel_id, setChannel_id] = useState("")
    const [visible, setVisible] = useState(false)
    const [showCard, setShowCard] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [va_expired_date, setVa_expired_date] = useState("");
    const [channel_name, setChannel_name] = useState("");
    const [va_number, setVa_number] = useState("");
    const [bayar, setBayar] = useState({
        amount: "",
        va_expired_date: "",
        channel_name: "",
        va_number: "",
    });

    const GetChannel = async () => {
        try {
            const { data, status } = await axios.get(`https://api.byrtagihan.com/api/member/channel`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            if (status === 200) {
                setChannel(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const bayarTagihan = async (e) => {
        e.preventDefault();
        e.persist();

        try {
            const data = {
                channel_id: channel_id,
            };
            // console.log(data);
            await axios.post(
                `https://api.byrtagihan.com/api/member/bill/${id}/payment`,
                data,
                {
                    headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
                }
            )
                .then(response => {
                    // Mengakses data respons di sini
                    // console.log(response.data.data);
                    const byr = response.data.data;
                    setBayar(byr);
                    setAmount(byr.amount);
                    setVa_expired_date(byr.va_expired_date);
                    setChannel_name(byr.channel_name);
                    setVa_number(byr.va_number);
                })
            setShowCard(true); // Menampilkan card
            setVisible(false); // Menyembunyikan modal
        } catch (error) {
            console.log(error);
        }

        navigate(`/bayarTagihan/${id}`)
    };

    useEffect(() => {
        GetChannel();
    }, []);

    return (
        <div className='mb-5'>
            {!showCard && (
                <div className='text-center mb-3'>
                    <CButton onClick={() => setVisible(!visible)}>Metode Pembayaran</CButton>
                </div>
            )}
            <CModal visible={visible}>
                <CModalHeader>
                    <CModalTitle>Metode Pembayaran</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CListGroup flush>
                        <CListGroupItem>
                            <CFormSelect
                                aria-label="Default select example"
                                value={channel_id} onChange={(e) =>
                                    setChannel_id(e.target.value.toString())
                                }>

                                <option>Pilih metode pembayaran</option>
                                {channel.map((chan, i) => {
                                    return (
                                        <option value={chan.id} key={i}>{chan.name}</option>
                                    )
                                })}
                            </CFormSelect>
                        </CListGroupItem>
                    </CListGroup>
                </CModalBody>
                {!showCard && (
                    <CModalFooter className='pt-5'>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            Batal
                        </CButton>
                        <CButton color="primary" onClick={bayarTagihan}>Konfirmasi</CButton>
                    </CModalFooter>
                )}
            </CModal>
            {showCard && (
                <CCard>
                    <CListGroup flush>
                        <CListGroupItem>
                            <h3>Pembayaran</h3>
                        </CListGroupItem>
                        <CListGroupItem>
                            <p>Rincian: </p>
                            {bayar.descriptions.map((desc, index) => (
                                <ul key={index} className="ms-5">
                                    <p className='d-flex justify-content-between'><li>{desc.description}: <b className='text-primary'>Rp.{desc.amount}</b></li></p>
                                </ul>
                            ))}
                        </CListGroupItem>
                        <CListGroupItem className='d-flex justify-content-between'><p>Total pembayaran: </p><b className='text-primary'>Rp.{bayar.descriptions.reduce((total, item) => total + item.amount, 0)}</b></CListGroupItem>
                        <CListGroupItem className='d-flex justify-content-between'><p>Jatuh tempo pada: </p><b className='text-primary'>{bayar.va_expired_date}</b></CListGroupItem>
                        <CListGroupItem>
                            <div className='d-flex justify-content-between'><p>Bank: </p><b className='text-primary'>{bayar.channel_name}</b></div>
                            <div className='d-flex justify-content-between'><p>NO.Rekening: </p><b className='text-primary'>{bayar.va_number}</b></div>
                        </CListGroupItem>
                        <CAccordion flush>
                            <CAccordionItem itemKey={1}>
                                <CAccordionHeader><p>Petunjuk Transfer</p></CAccordionHeader>
                                <CAccordionBody>
                                    <p>1. Pilih Transfer Virtual Account Billing.</p>
                                    <p>2. Pilih Rekening Debet lalu masukkan nomor Virtual Account <b className='text-primary'>{bayar.va_number}</b>.</p>
                                    <p>3. Tagihan yang harus dibayar akan muncul konfirmasi.</p>
                                    <p>4. Periksa informasi yang tertera dilayar. Pastikan Merchant adalah byrtagihan. Total tagihan sudah benar?. Jika benar, masukan password transaksi dan pilih lanjut</p>
                                </CAccordionBody>
                            </CAccordionItem>
                        </CAccordion>
                        <CListGroupItem className='text-center'><CButton className='gap-2 col-4 mx-auto' onClick={() => navigate(`/listTagihanMember`)}>Oke</CButton></CListGroupItem>
                    </CListGroup>
                </CCard>
            )}
        </div>
    )
}

export default BayarTagihan