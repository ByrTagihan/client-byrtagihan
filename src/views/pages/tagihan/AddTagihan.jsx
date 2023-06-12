import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../../../utils/baseURL";

function AddTagihan() {
  const [memberId, setMemberId] = useState(0);
  const [desc, setDesc] = useState("");
  const [periode, setPeriode] = useState();
  const [amount, setAmount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
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
        navigate("/tagihan");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);
    setMemberId(query);

    try {
      const response = await fetch(`${API_DUMMY}/customer/member/${query}`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("token")}`,
        },
      });

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


  const Suggestions = () => {
    return (
      <div class="card border-secondary border-top-0" style={{borderTopRightRadius : 0, borderTopLeftRadius : 0}}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{suggestions.name}</li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div class="card mb-3">
        <div class="card-header bg-transparent">Tambah Tagihan</div>
        <div class="card-body">
          <form onSubmit={addTagihan}>
            <div class="mb-3 autocomplete">
              <label class="form-label">MemberID</label>
              <input
                id="number_id"
                type="number"
                class="form-control"
                value={value}
                min={0}
                onChange={handleChange}
              />
              {suggestionsActive && <Suggestions />}
            </div>
            <div class="mb-3">
              <label class="form-label">Keterangan</label>
              <input
                id="description"
                type="text"
                class="form-control"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Nominal</label>
              <input
                id="amount"
                type="number"
                class="form-control"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Periode</label>
              <input
                id="periode"
                type="date"
                class="form-control"
                onChange={(e) => setPeriode(e.target.value)}
              />
            </div>
            <button
              type="button"
              class="btn btn-secondary float-start"
              onClick={() => {
                navigate("/tagihan");
              }}
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary float-end">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTagihan;
