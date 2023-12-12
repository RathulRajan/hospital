import Header from "../../../Components/Header";
import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./doctorhome.css";
import axios from "axios";
import DocNav from "../DocNav";

const doctorHome = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const getPatients = async () => {
    const response = await axios.get("http://localhost:3000/pharmacy");
    setItems(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getPatients();
  }, []);

  const deletePharmacy = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/pharmacy/${id}`);
      toast.success(" deleted ");
      getPharmacy();
    } catch (e) {
      e.message;
    }
  };

  const editPharmacy = (id) => {
    navigate(`/edit-pharmacy/${id}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (data) => <img className="table-img" src={data} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Instock",
      dataIndex: "instock",
      key: "instock",
      render: (d) => {
        if (d) {
          return "yes";
        } else {
          return "no";
        }
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (d) => d.name,
    },
    {
      title: "Edit",
      dataIndex: "_id",
      key: "edit",
      render: (id) => (
        <EditOutlined
          onClick={() => editPharmacy(id)}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "delete",
      render: (id) => (
        <DeleteOutlined
          onClick={() => deletePharmacy(id)}
          style={{ fontSize: "16px", color: "#ff0000", cursor: "pointer" }}
        />
      ),
    },
  ];
  return (
    <div className="list-pharmacy">
      <DocNav />
      <ToastContainer />
      <Header text="Pharmacy" />
      <hr />
      <div className="add-pharmacy">
        <Button onClick={() => navigate("/add-pharmacy")} type="primary">
          ADD
        </Button>
      </div>
      <div className="table-div">
        <Table columns={columns} dataSource={items} />
      </div>
    </div>
  );
};

export default doctorHome;
