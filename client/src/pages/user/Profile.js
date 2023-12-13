import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [password, SetPassword] = useState("");
  const [address, SetAddress] = useState("");

  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get initial user data
  useEffect(() => {
    const { email, name, phone, address, password } = auth?.user;
    SetName(name);
    SetEmail(email);
    SetPhone(phone);
    SetAddress(address);
  }, [auth?.user]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <h1>User Profile</h1>
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
                    disabled
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
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
