import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function AddStudent(props) {
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const [userid, setUserid] = useState(null);
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [section, setSection] = useState("A");
  const [yearOfJoining, setYearOfJoining] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setUserid(foundUser.userid );
    } else {
      alert("Login first!!");
      history("/");
    }
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    console.log("Adding student");
    try {
      await axios
        .post("http://127.0.0.1:8000/addStudent", {
          userid,
          name,
          rollno,
          yearOfJoining,
          phoneNumber,
          branch,
          section,
        })
        // need to change
        .then((res) => {
          console.log(res);
          if(res.data==="Can't add other class student"){
            alert("Can't add other class student");
          }else if (res.data === "already exist") {
            alert("Student already exist in class!");
            history("/home");
          } else if (res.data === "added") {
            alert("Added Student!!");
            history("/home");
          } else if (res.data === "not exist with error") {
            alert("Error while adding!!!!!");
          }
        });
    } catch (error) {
      alert("Error occurred!!");
      console.log(error);
    }
  }
  
  return (
    <div className="container my-5 mx-20">
      {localStorage.getItem("user")!==null && (
        <form>
          <div className="form-group my-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="name"
              placeholder="Enter Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="=rollno">Roll Number</label>
            <input
              type="text"
              className="form-control"
              id="rollno"
              aria-describedby="rollno"
              placeholder="Enter Roll Number"
              onChange={(e) => {
                setRollno(e.target.value);
              }}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="yearOfJoining">Year of Joining</label>
            <input
              type="text"
              className="form-control"
              id="yearOfJoining"
              placeholder="Year of Joining"
              onChange={(e) => {
                setYearOfJoining(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="branch">Select Branch</label>
            <select
              className="form-control my-3"
              onChange={(e) => {
                setBranch(e.target.value);
              }}
              value={branch}
              id="branch"
            >
              <option disabled>Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="CSM">CSM</option>
              <option value="CSD">CSD</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div>
            <label htmlFor="section">Select Section</label>
            <select
              className="form-control my-3"
              onChange={(e) => {
                setSection(e.target.value);
              }}
              value={section}
              id="section"
            >
              <option>Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
            </select>
          </div>
          <div className="form-group my-3">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="phoneNumber"
              className="form-control"
              id="phoneNumber"
              placeholder="Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <button className="btn btn-primary mx-3" onClick={handleAdd}>
            Add Student
          </button>
          <br />
        </form>
      )}
    </div>
  );
}
