import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login(props) {
  const history = useNavigate();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const nav = () => {
    history("/signup");
  };

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://127.0.0.1:8000/login", {
          userid,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            const userData = {
              userid: userid,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            history("/home");
          } else if (res.data === "not exist") {
            alert("User has not registered");
          } else if (res.data === "not exist with error") {
            alert("Error occured while login");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container my-5 mx-20">
      <form>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">User Id</label>
          <input
            type="text"
            className="form-control"
            id="userid"
            aria-describedby="userid"
            placeholder="Enter User Id"
            onChange={(e) => {
              setUserid(e.target.value);
            }}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="btn btn-primary mx-3" onClick={handleLogin}>
          Submit
        </button>
        <br />
        <button className="btn btn-primary my-3 mx-3" onClick={nav}>
          SignUp
        </button>
      </form>
    </div>
  );
}
