import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CCard, CCardBody, CForm, CRow, CFormLabel, CCol, CFormInput, CInputGroup, CButton } from '@coreui/react'
import Swal from 'sweetalert2';
import { API_DUMMY } from '../../../../utils/baseURL';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS dari React Quill

function EditTemplate() {
    const [template, setTemplate] = useState([]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [content, setContent] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    const Put = async (e) => {
        if (localStorage.getItem("type_token") === "user") {
        e.preventDefault();
        e.persist();

        const data = {
            name: name,
            content: content,
        };

        try {
            await axios.put(`${API_DUMMY}/user/template/${id}`, data, {
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
                navigate("/UserTemplate");
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
            .get(`${API_DUMMY}/user/template/${id}`, {
                headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                const template = res.data.data;
                setTemplate(template);
                setName(template.name)
                setContent(template.content)
                // console.log(res.data.data);
            })
            .catch((error) => {
                alert("Terjadi Kesalahan" + error);
            });
    };

    const handleChange = (value) => {
        setContent(value);
    };

    useEffect(() => {
        get(0);
    }, []);

    return (
        <div>
            {localStorage.getItem("type_token") === "user" ? (
                <>
            <CCard>
                <CCardBody>
                    <h4>Edit Data Template</h4>
                    <CForm className="row g-3">
                        <CCol md={12}>
                            <CFormInput
                                type="text"
                                placeholder="Nama"
                                id="amount"
                                onChange={(e) => setName(e.target.value)}
                                label="Nama"
                                value={name}
                                required
                            />
                        </CCol>
                        {/* <CCol md={6}>
                            <CFormInput
                                id="content"
                                type="text"
                                placeholder="Content"
                                onChange={(e) => setContent(e.target.value)}
                                label="Content"
                                value={content}
                                required
                            />
                        </CCol> */}
                        <CCol md={12}>
                            <CFormLabel htmlFor="content">Content</CFormLabel>
                            <ReactQuill value={content} onChange={handleChange} />
                        </CCol>

                        <CCol xs={12}>
                            <CButton onClick={Put}>Simpan</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
       </>
            ):(
                <></>
            )} </div>
    )
}

export default EditTemplate