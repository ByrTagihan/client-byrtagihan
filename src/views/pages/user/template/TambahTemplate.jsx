import React, { useEffect } from "react";
import { CButton, CCol, CForm, CFormInput, CFormLabel } from "@coreui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/baseURL";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS dari React Quill

function TambahTemplate() {
    const [name, setName] = useState();
    const [content, setContent] = useState();
    const navigate = useNavigate();

    const Post = async (e) => {
        if (localStorage.getItem("type_token") === "User") {
            e.preventDefault();
            const data = {
                name: name,
                content: content,
            };
            await axios
                .post(`${API_DUMMY}/user/template`, data, {
                    headers: {
                        "auth-tgh": `jwt ${localStorage.getItem("token")}`,
                    },
                })
                .then(() => {
                    navigate("/UserTemplate");
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil Menambahkan",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                })
                .catch((error) => {
                    //console.log(error);
                });

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

    const handleChange = (value) => {
        setContent(value);
    };

    const handleGoBack = () => {
        navigate(-1); // Navigasi ke halaman sebelumnya
    };

    return (
        <div>
            {localStorage.getItem("type_token") === "User" ? (
                <>
                    <div className="card mb-3">
                        <div className="card-header bg-transparent">
                            <h5>Tambah template</h5>
                        </div>
                        <div className="card-body">
                            <CForm onSubmit={Post} className="row g-3">
                                <CCol md={12}>
                                    <CFormInput
                                        type="text"
                                        placeholder="Nama"
                                        id="amount"
                                        onChange={(e) => setName(e.target.value)}
                                        label="Nama"
                                        required
                                    />
                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel htmlFor="content">Content</CFormLabel>
                                    <ReactQuill value={content} onChange={handleChange} />
                                </CCol>

                                <CCol className="d-flex justify-content-between" xs={12}>
                                    <CButton className="btn-danger" onClick={handleGoBack}>
                                        Kembali
                                    </CButton>
                                    <CButton type="submit">Simpan</CButton>
                                </CCol>
                            </CForm>
                        </div>
                    </div></>
            ) : (
                <><p>Page Tidak Tersedia</p></>
            )}
        </div>
    )
}

export default TambahTemplate