import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../../../utils/baseURL";
import Swal from "sweetalert2";

function AddTagihan() {
  const [memberId, setMemberId] = useState(0);
  const [desc, setDesc] = useState("");
  const [periode, setPeriode] = useState("");
  const [amount, setAmount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  let navigate = useNavigate();

  const addTagihan = async (e) => {
    e.preventDefault();
    const req = {
      member_id: memberId,
      description: desc,
      periode: periode,
      amount: amount,
    };
    await axios
      .post(`${API_DUMMY}/customer/bill`, req, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate("/customerBill");
        Swal.fire({
          icon: "success",
          title: "Berhasil DiTambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);

    try {
      const response = await fetch(
        `${API_DUMMY}/customer/member?name=${query}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          },
        }
      );

      if (query.length > 0 && response.ok) {
        const res = await response.json();
        setSuggestions(res.data);
        setSuggestionsActive(true);
      } else {
        setSuggestionsActive(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const handleClick = (e, id) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setMemberId(id);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(
        `NIK = ${suggestions[suggestionIndex].unique_id}, Nama = ${suggestions[suggestionIndex].name}`
      );
      setMemberId(suggestions[suggestionIndex].id);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (
      <div
        className="card border-secondary border-top-0"
        style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
      >
        <ul className="list-group list-group-flush">
          {suggestions.length != 0 ? (<>
            {suggestions.map((data, index) => (
            <li
              className={
                index === suggestionIndex
                  ? "list-group-item  list-group-item-action active"
                  : "list-group-item  list-group-item-action"
              }
              key={index}
              onClick={(e)=> handleClick(e, data.id)}
            >
              NIK = {data.unique_id}, Nama = {data.name}
            </li>
          ))}</>) : (<>
            <li
              className="list-group-item "
            >
              Member Tidak Ditemukan 
            </li></>)}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div className="card mb-3">
        <div className="card-header bg-transparent">Tambah Tagihan</div>
        <div className="card-body">
          <form onSubmit={addTagihan} onKeyDown={onKeyDown}>
            <div className="mb-3 autocomplete">
              <label className="form-label">Member</label>
              <input
                id="number_id"
                type="text"
                className="form-control"
                value={value}
                autoComplete="off"
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                required
              />
              {suggestionsActive && <Suggestions />}
            </div>
            <div className="mb-3">
              <label className="form-label">Keterangan</label>
              <input
                id="description"
                type="text"
                className="form-control"
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nominal</label>
              <input
                id="amount"
                type="number"
                className="form-control"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Periode</label>
              <input
                id="periode"
                type="date"
                className="form-control"
                onChange={(e) => setPeriode(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary float-start"
              onClick={() => {
                navigate("/customerBill");
              }}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary float-end">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTagihan;
