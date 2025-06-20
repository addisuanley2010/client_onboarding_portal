import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../page/public/Login";
import Registration from "../page/public/Registration";
import HomePage from "../page/public/HomePage";
import NotFoundPage from "../page/common/NotFoundPage";
import Header from "../component/Header";
import { publicPaths } from "../utils/Paths";
import Permission from "../component/Permission";

const PublicRouteWrapper = ({ path, element }) => {

  return (
    <>
      <Header message={"Smart Client Onboarding Portal"} paths={publicPaths}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/permission" element={<Permission/>} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default PublicRouteWrapper;
