import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Register = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [password, SetPassword] = useState("");
  const [address, SetAddress] = useState("");
  const [answer, SetAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => SetName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => SetPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => SetAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Type your favorite color (Secret Key)
            </label>
            <input
              type="text"
              className="form-control"
              id="answer"
              value={answer}
              onChange={(e) => SetAnswer(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your information with anyone else.
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
