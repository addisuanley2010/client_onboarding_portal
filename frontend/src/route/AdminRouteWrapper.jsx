import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "../page/common/NotFoundPage";
import Dashboard from "../page/admin/Dashboard";
import ManageUser from "../page/admin/ManageUser";
import Header from "../component/Header";
import Profile from "../component/Profile";
import { AdminPaths } from "../utils/Paths";
const AdminRouteWrapper = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Header
        message={"Admin Panel"}
        paths={AdminPaths}
        toggleModal={toggleModal}
      />
      <Routes>
      <Route index path="/" element={<Dashboard />} />
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<ManageUser />} />

        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/login/*" element={<Navigate to="/" />} />
      </Routes>
      {isModalOpen && <Profile toggleModal={toggleModal} />}
    </>
  );
};

export default AdminRouteWrapper;
