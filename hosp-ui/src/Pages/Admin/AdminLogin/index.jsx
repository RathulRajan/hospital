import { Input, Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import "./adminlogin.css";

const AdminLogin = () => {
  const [cred, setCred] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setCred({ ...cred, [key]: e.target.value });
    console.log(cred);
  };

  const loginAdmin = async () => {
    const response = await axios.post(
      "http://localhost:3000/admin/login",
      cred
    );

    const tokenDecode = jwtDecode(response.data.token);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("admin_id", tokenDecode.id);

    if (response.data.token && tokenDecode.id) {
      navigate("/admin");
    }
    console.log(response);
  };

  const onClick = () => {
    loginAdmin();
  };

  return (
    <div className="admin-login-form">
      <h1>Admin Login</h1>
      <label>username</label>
      <Input onChange={(e) => onChange(e, "username")} />
      <label>password</label>
      <Input.Password onChange={(e) => onChange(e, "password")} />
      <div className="admin-login-btn">
        <Button onClick={loginAdmin} type="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AdminLogin;
