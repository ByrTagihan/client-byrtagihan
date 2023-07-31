import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CCard, CCardBody, CForm, CRow, CFormLabel, CCol, CFormInput, CInputGroup, CButton, CFormSelect, CInputGroupText } from '@coreui/react'
import Swal from 'sweetalert2';
import { API_DUMMY } from '../../../../utils/baseURL';

function EditMember() {
    const [member, setMember] = useState([])
    const [organization, setOrganization] = useState([])
    const [organization_id, setOrganization_id] = useState("");
    const [customer_id, setCustomer_id] = useState("");
    const [show, setShow] = useState(false);
    const [unique_id, setUnique_id] = useState("")
    const [name, setName] = useState("")
    const [hp, setHp] = useState("")
    const [address, setAddress] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState("fa-solid fa-eye-slash");
    const [organization_name, setOrganization_name] = useState("");
    const [picture, setPicture] = useState("");
    const [costumer, setCostumer] = useState([]);
    const [password, setPassword] = useState("");
    const [selectedMember, setSelectedMember] = useState([]);
    const [visible, setVisible] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();

    const Put = async (e) => {
        if (localStorage.getItem("type_token") === "user") {
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
                title: "Berhasil Mengedit",
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
            
        } else {
            Swal.fire(
              'Peringatan',
              'Anda tidak diizinkan mengakses API ini. Jika ingin melihat page ini maka login dulu sebagai guru',
              'error'      
            ).then((result) => {
                //Untuk munuju page selanjutnya
                navigate("/");
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
                localStorage.clear();
            });
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

    useEffect(() => {
        get(0);
        GetOrganization();
        GetCostumer();
    }, []);

    return (
        <div>
            {localStorage.getItem("type_token") === "user" ? (
                <>
            <CCard>
                <CCardBody>
                    <h4>Edit Data Siswa</h4>
                    <CForm className="row g-3">
                        <CCol md={6}>
                            <CFormInput
                                label="Unique_id"
                                placeholder="Unique id"
                                autoComplete="Unique id"
                                onChange={(e) => setUnique_id(e.target.value)}
                                value={unique_id}
                                readOnly
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                label="Nama"
                                placeholder="Nama Siswa"
                                autoComplete="Nama Siswa"
                                onChange={(e) => setName(e.target.value)}
                                value={name} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                label="Alamat"
                                placeholder="Alamat"
                                autoComplete="Alamat"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                label="No hp"
                                placeholder="No hp"
                                autoComplete="No hp"
                                onChange={(e) => setHp(e.target.value)}
                                value={hp} />
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect aria-label="Default select example" value={organization_id} onChange={(e) =>
                                setOrganization_id(e.target.value.toString())}
                                label="Sekolah"
                            >
                                <option>Pilih Sekolah</option>
                                {organization.map((org, i) => {
                                    return (
                                        <option value={org.id} key={i}>{org.name}</option>
                                    )
                                })}
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel>Password</CFormLabel>
                            <CInputGroup>
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
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect aria-label="Default select example" value={customer_id} onChange={(e) =>
                                setCustomer_id(e.target.value.toString())}
                                label="Admin Sekolah"
                            >
                                <option>Pilih Admin Sekolah</option>
                                {costumer.map((cos, i) => {
                                    return (
                                        <option value={cos.id} key={i}>{cos.name}</option>
                                    )
                                })}
                            </CFormSelect>
                        </CCol>

                        <CCol xs={12}>
                            <CButton onClick={Put}>Simpan</CButton>
                        </CCol>
                    </CForm>

                </CCardBody>
            </CCard>
        </>
            ):(
                <><p>Page Tidak Tersedia</p></>
            )}</div>
    )
}

export default EditMember