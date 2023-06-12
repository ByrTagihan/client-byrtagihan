import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_DUMMY } from "../../../utils/baseURL";

function EditTagihan() {
  const [memberId, setMemberId] = useState(0);
  const [desc, setDesc] = useState("");
  const [periode, setPeriode] = useState();
  const [amount, setAmount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const { id } = useParams();

  let navigate = useNavigate();

  const updateTagihan = async (e) => {
    e.preventDefault();
    const req = {
      member_id: memberId,
      description: desc,
      periode: periode,
      amount: amount,
    };

    await axios
    .put(`${API_DUMMY}/customer/bill/${id}`, req, {
      headers: {
        "auth-tgh": `jwt ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        navigate("/tagihan")
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

  useEffect(() => {
    axios
        .get(`${API_DUMMY}/customer/bill/${id}`, {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const response = res.data.data
          setValue(response.member_id)
          setMemberId(response.member_id)
          setDesc(response.description)
          setPeriode(response.periode)
          setAmount(response.amount)
        })
        .catch((error) => {
          console.log(error);
        });
  }, [])

  return (
    <div>
      <div class="card mb-3">
        <div class="card-header bg-transparent">Edit Tagihan</div>
        <div class="card-body">
          <form onSubmit={updateTagihan}>
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Nominal</label>
              <input
                id="amount"
                type="number"
                class="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Periode</label>
              <input
                id="periode"
                type="date"
                class="form-control"
                value={periode}
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

export default EditTagihan;
