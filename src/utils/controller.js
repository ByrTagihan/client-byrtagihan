import { API_DUMMY } from "./baseURL";
import axios from "axios";
import Swal from "sweetalert2";

//Get All Data
export const getAllData = async (path, setPath) => {
  await axios
    .get(`${API_DUMMY}/${path}`, {
      headers: {
        "auth-tgh": `jwt ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setPath(res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

//Get All Data by Id
export const getAllDataById = async (item, path, setPath) => {
  await axios
    .get(`${API_DUMMY}/${path}/${item}`, {
      headers: {
        "auth-tgh": `jwt ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setPath(res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteData = async (item, path, setPath) => {
  Swal.fire({
    title: "Do you want to delete ?",
    text: "Data changes are non-refundable!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
    cancelButtonText: "Cencel",
  })
    .then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_DUMMY}/${path}/${item}`, {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("token")}`,
          },
        });
        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
