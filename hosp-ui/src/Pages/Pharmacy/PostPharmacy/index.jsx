import Header from "../../../Components/Header";
import { UploadOutlined } from "@ant-design/icons";
import { Input, Switch, Select, Button, Upload, Image } from "antd";
import { useState, useEffect } from "react";
import axios from "../../../utils/axiosinstance";
import { useNavigate, useParams } from "react-router-dom";

import "./postpharmacy.css";

const PostPharmacy = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  const [pharmacy, setPharmacy] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    department: "",
    instock: false,
    Image: "",
    quantity: "",
  });

  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    const response = await axios.get("http://localhost:3000/department");
    const op = response.data.map((item) => {
      return { label: item.name, value: item._id };
    });
    setDepartments(op);
  };
  console.log(departments);

  useEffect(() => {
    fetchDepartments();
    if (id) {
      fetchPharmacy();
    }
  }, []);

  const fetchPharmacy = async () => {
    const response = await axios.get(`http://localhost:3000/pharmacy/${id}`);
    setPharmacy(response.data);
    const {
      name,
      description,
      price,
      image,
      brand,
      department,
      instock,
      quantity,
    } = response.data;
  };

  const editPharmacy = async () => {
    try {
      await axios.patch(`http://localhost:3000/pharmacy/${id}`, pharmacy);
      navigate("/pharmacy");
    } catch (e) {
      e.message;
    }
  };

  const onChange = (e, key) => {
    let value = e.target.value;
    if (key == "quantity" || key == "price") {
      value = parseFloat(value);
    }
    setPharmacy({ ...pharmacy, [key]: e.target.value });
  };
  console.log(pharmacy);

  const checkInstock = (e) => {
    setPharmacy({ ...pharmacy, instock: e });
  };

  const onSelect = (e) => {
    setPharmacy({ ...pharmacy, department: e });
  };

  const onUploadChange = (info) => {
    if (info.file.status == "done") {
      setPharmacy({ ...pharmacy, Image: info.file.response.url });
    }
    console.log(info);
  };
  console.log(pharmacy);

  const post = async () => {
    try {
      await axios.post("http://localhost:3000/pharmacy", pharmacy);
      navigate("/pharmacy");
    } catch (e) {}
  };
  return (
    <div className="post-pharmacy">
      <Header text={id ? "EDIT PHARMACY" : "ADD PHARMACY"} />
      <div className="pharmacy-form">
        <div className="pharmacy-form-left">
          <div className="pharmacy-input">
            <label>Name</label>
            <Input
              value={pharmacy.name}
              onChange={(e) => onChange(e, "name")}
            />
          </div>
          <div className="pharmacy-input">
            <label>Description</label>
            <Input.TextArea
              value={pharmacy.description}
              rows={5}
              onChange={(e) => onChange(e, "description")}
            />
          </div>
          <div className="pharmacy-input">
            <label>Price</label>

            <Input
              value={pharmacy.price}
              type="number"
              onChange={(e) => onChange(e, "price")}
            />
          </div>
          <div className="pharmacy-input">
            <label>Brand</label>
            <Input
              value={pharmacy.brand}
              onChange={(e) => onChange(e, "brand")}
            />
          </div>
        </div>
        <div className="pharmacy-form-right">
          <div className="pharmacy-input">
            <label>In Stock</label>
            <Switch
              checked={pharmacy.instock}
              onChange={checkInstock}
              style={{ width: "50px" }}
            />
          </div>
          <div className="pharmacy-input">
            <label>Quantity</label>
            <Input
              value={pharmacy.quantity}
              type="number"
              onChange={(e) => onChange(e, "quantity")}
            />
          </div>

          <div className="pharmacy-input">
            <label>Department</label>

            <Select
              value={pharmacy.department}
              options={departments}
              onChange={onSelect}
            />
          </div>
          <div className="pharmacy-input">
            <label>Image</label>
            <Upload
              name="file"
              action="http://localhost:3000/upload"
              onChange={onUploadChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <Image className="upload-image" width={100} src={pharmacy.Image} />
          </div>
          <Button
            onClick={id ? editPharmacy : post}
            type="primary"
            className="post-pharmacy-btn"
          >
            {id ? "UPDATE" : "ADD"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostPharmacy;
