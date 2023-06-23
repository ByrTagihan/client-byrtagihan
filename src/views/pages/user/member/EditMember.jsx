import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CCard, CCardBody, CForm, CRow, CFormLabel, CCol, CFormInput, CInputGroup, CButton } from '@coreui/react'
import Swal from 'sweetalert2';
import { API_DUMMY } from '../../../../utils/baseURL';

function EditMember() {
    const [member, setMember] = useState([])
    const [show, setShow] = useState(false);
    const [unique_id, setUnique_id] = useState("")
    const [name, setName] = useState("")
    const [hp, setHp] = useState("")
    const [address, setAddress] = useState("")
    const [organization_name, setOrganization_name] = useState("");
    const [picture, setPicture] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const Put = async (e) => {
        e.preventDefault();
        e.persist();

        const data = {
            name: name,
            hp: hp,
            address: address,
        };

        try {
            await axios.put(`${API_DUMMY}/user/member/${id}`, data, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            });
            setShow(false);
            Swal.fire({
                icon: "success",
                title: "berhasil Update Data Siswa",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                navigate("/userMember");
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };

    const get = async () => {
        await axios
            .get(`${API_DUMMY}/user/member/${id}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                const members = res.data.data;
                setMember(members);
                setUnique_id(members.unique_id)
                setName(members.name)
                setHp(members.hp)
                setAddress(members.address)
                setOrganization_name(members.organization_name)
                setPicture(members.picture)
                // console.log(res.data.data);
            })
            .catch((error) => {
                alert("Terjadi Kesalahan" + error);
            });
    };

    useEffect(() => {
        get(0);
    }, []);

    return (
        <div>
            <CCard>
                <CCardBody>
                    <h4>Edit Data Siswa</h4>
                    <CForm>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label text-dark">Unique id</CFormLabel>
                            <CCol sm={10}>
                                <CFormInput
                                    placeholder="Unique id"
                                    autoComplete="Unique id"
                                    value={unique_id}
                                    readOnly />
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
                                <CFormInput
                                    placeholder="Sekolah"
                                    autoComplete="Sekolah"
                                    value={organization_name}
                                    readOnly />
                            </CCol>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormLabel className="col-sm-2 col-form-label text-dark">Profil</CFormLabel>
                            <CCol sm={10}>
                                <CFormInput
                                    placeholder="Profil"
                                    autoComplete="Profil"
                                    onChange={(e) => setPicture(e.target.value)}
                                    readOnly />
                            </CCol>
                        </CInputGroup>
                    </CForm>
                    <CButton onClick={Put}>Update</CButton>
                </CCardBody>
            </CCard>
        </div>
    )
}

export default EditMember