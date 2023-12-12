import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./Doclogin.css";

const DocLogin = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ username: "", password: "" });

  const onChange = (e, key) => {
    setCred({ ...cred, [key]: e.target.value });
    console.log(cred);
  };

  const loginDoctor = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/doctor/login",
        cred
      );
      const tokenDecode = jwtDecode(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("doc_id", tokenDecode.id);

      if (response.data.token && tokenDecode.id) {
        navigate("/doctor");
      }
    } catch (e) {
      toast.error("username or password incorrect");
    }
  };

  const onClick = () => {
    loginDoctor();
  };
  console.log(cred);

  return (
    <div className="login">
      <ToastContainer />
      <h1>Doctor Login</h1>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 800,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input onChange={(e) => onChange(e, "username")} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password onChange={(e) => onChange(e, "password")} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={onClick}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DocLogin;
