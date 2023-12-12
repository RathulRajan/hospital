import React, { useState, useEffect } from "react";
import { Card } from "antd";
const { Meta } = Card;

import "./patienthome.css";

const PatientHome = () => {
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    // Fetch department data from your backend API
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch("http://localhost:3000/department");
        const data = await response.json();
        setDepartmentData(data); // Assuming data is an array of department objects
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDepartmentData();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div className="home">
      <div className="patient-navbar">
        <h1 className="name">Hello, Patient</h1>
      </div>
      <div className="list-departments">
        {departmentData.map((department) => (
          <Card
            key={department._id} // Assuming MongoDB assigns an _id field to each document
            hoverable
            style={{
              width: 340,
              marginBottom: 16,
              boxShadow: "0 4px 8px #89CFF3",
              textAlign: "center",
            }}
            cover={
              <img
                alt={department.name}
                src={department.image}
                style={{ height: "250px", objectFit: "cover" }}
              />
            }
          >
            <Meta
              title={department.name}
              description={`HOD:  ${department.hod}`}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientHome;
