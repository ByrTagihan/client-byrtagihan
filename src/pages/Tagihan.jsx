import { cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Tagihan() {
    const [list, setList] = useState([]);
    const param = useParams();  
    const [paidDate, setPaidDate] = useState("");
    const [paidAmount, setPaidAmount] = useState("");
    const [show, setShow] = useState(false);

    const getAll = async () => {
        await axios
          .get(`https://api.byrtagihan.com/api/customer/member/${param.id}/bill`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          })
          .then((res) => {
            // setPages(res.data.data.total_page);
            setList(res.data.data);
            console.log(res.data.data);
          })
          .catch((error) => {
            alert("Terjadi Kesalahan" + error);
          });
      };

      useEffect(() => {
        getAll(0);
      }, []);

      const getById = async () => {
        await axios
          .get(`https://api.byrtagihan.com/api/customer/member/9/bill/1/paid`, {
            headers: { "auth-tgh": `jwt ${localStorage.getItem("token")}` },
          })
          .then((res) => {
            setPaidAmount(res.data.data.paid_amount);
            setPaidDate(res.data.data.paid_date);
            console.log(res.data.data);
          })
          .catch((error) => {
            alert("Terjadi Keslahan" + error);
          });
      };
  return (
    <div>

<table className="table border" style={{ textAlign: "center" }}>
        <thead
          className="thead-dark"
          style={{ backgroundColor: "#213555", color: "white" }}
        >
          <tr>
            <th scope="col">No</th>
            <th scope="col">Description</th>
            <th scope="col">Organization Name</th>
            <th scope="col">Periode</th>
            <th scope="col">Member Name</th>
            <th scope="col">Paid Id</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white" style={{ textAlign: "center" }}>
          {list.map((data, index) => {
            return (
              <tr key={data.index}>
              <td>{index + 1}</td>
              <td>{data.description}</td>
              <td>{data.organization_name}</td>
              <td>{data.periode}</td>
              <td>{data.member_name}</td>
              <td>{data.paid_id}</td>
                <td style={{ display: "flex", gap: "5px", width: "100%" }}>
                  <button
                    type="button"
                    style={{ background: "none", marginLeft: "20%" }}
                    onClick={() => {
                      setShow(true);
                      getById(data.id);
                    }}
                  >
                      <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <Modal show={show} onHide={!show}>
        <form>
          <Modal.Header>
            <Modal.Title style={{ color: "black" }}>Modal Add</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Paid Date :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="Paid Date"
                autoComplete="Paid Date"
                type="date"
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
              />
            </CInputGroup>
            <label style={{ fontWeight: "bold", marginLeft: "4px" }}>
              Pad Amount :
            </label>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="Paid Amount"
                autoComplete="Paid Amount"
                type="text"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
              />
            </CInputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default Tagihan