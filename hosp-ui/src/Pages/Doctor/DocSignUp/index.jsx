import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import "./Docsignup.css";

const DocSignUp = () => {
  const [captcha, setCaptcha] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    department: "",
    qualification: "",
  });

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const Signup = async () => {
    try {
      await axios.post("http://localhost:3000/doctor/signup", form);
      navigate("/doctor");
    } catch (e) {
      e.message;
    }
  };
  console.log(form);

  return (
    <div className="doc-signup-form">
      <h1>Doctor Signup</h1>
      <label>Name:</label>
      <Input onChange={(e) => onChange(e, "name")} />
      <label>Username:</label>
      <Input onChange={(e) => onChange(e, "username")} />
      <label>Password:</label>
      <Input.Password onChange={(e) => onChange(e, "password")} />
      <label>Confirm Password:</label>
      <Input.Password onChange={(e) => onChange(e, "confirmPassword")} />
      <label>Department:</label>
      <Input onChange={(e) => onChange(e, "department")} />
      <label>Qualification:</label>
      <Input onChange={(e) => onChange(e, "qualification")} />
      <Upload>
        <Button>Click here to upload your image</Button>
      </Upload>

      <ReCAPTCHA
        sitekey="6LfcuC4pAAAAAGJos7DrfLDEncGkRFIbR7dm5yTZ"
        onChange={onChange}
      />

      <Button onClick={Signup} type="primary">
        Submit
      </Button>
    </div>
  );
};

export default DocSignUp;
