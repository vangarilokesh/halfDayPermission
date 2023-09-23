import React, { useState } from "react";
import axios from "axios"

export const Verify = () => {
  const [rollno, setRollno] = useState("");
  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://127.0.0.1:8000/verifyPass", {
          rollno,
        })
        .then((res) => {
          if (res.data === "valid") {
            alert("Valid");
          } else if (res.data === "invalid") {
            alert("Invalid");
          }
        })
        .catch((e) => {
          alert("error");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container my-5 mx-20">
      <form>
        <div className="form-group my-2">
          <label htmlFor="rollno">Roll Number</label>
          <input
            type="text"
            className="form-control my-3 "
            id="rollno"
            aria-describedby="rollno"
            placeholder="Enter Roll Number"
            onChange={(e) => {
              setRollno(e.target.value);
            }}
          />
        </div>
        <button className="btn btn-primary mx-3" onClick={handleVerification}>
          Submit
        </button>
      </form>
    </div>
  );
};
