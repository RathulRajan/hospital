import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import DocLogin from "./Pages/Doctor/DocLogin";
import DocSignUp from "./Pages/Doctor/DocSignUp";
import DoctorHome from "./Pages/Doctor/DoctorHome";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import ListPharmacy from "./Pages/Pharmacy/ListPharmacy";
import AdminLogin from "./Pages/Admin/AdminLogin";
import PostPharmacy from "./Pages/Pharmacy/PostPharmacy";
import AdminHome from "./Pages/Admin/AdminHome";
import PatientHome from "./Pages/Patient/PatientHome";

const App = () => {
  return (
    <div className="main">
      <Routes>
        {/* doctor */}
        <Route path="/doctor" element={<DoctorHome />} />
        <Route path="/doctor/login" element={<DocLogin />} />
        <Route path="/doctor/signup" element={<DocSignUp />} />

        {/* pharmacy */}
        <Route path="/pharmacy" element={<ListPharmacy />} />
        <Route path="/add-pharmacy" element={<PostPharmacy />} />
        <Route path="/edit-pharmacy/:id" element={<PostPharmacy />} />

        {/* admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminHome />} />

        {/* patient */}
        <Route path="/patient-home" element={<PatientHome />} />
        <Route path="/listpatient" element={<DoctorHome />} />
      </Routes>
    </div>
  );
};

export default App;
