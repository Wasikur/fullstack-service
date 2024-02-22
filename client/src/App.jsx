import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Register from "./pages/Admin/Register";
import Login from "./pages/Admin/Login";
import Logout from "./pages/Admin/Logout";
import Error from "./pages/Error";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminUsersUpdate from "./pages/Admin/AdminUsersUpdate";
import AdminContacts from "./pages/Admin/AdminContacts";
import AdminServices from "./pages/Admin/AdminServices";
import AdminNewService from "./pages/Admin/AdminNewService";
import AdminServicesUpdate from "./pages/Admin/AdminServicesUpdate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:id/edit" element={<AdminUsersUpdate />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="newservices" element={<AdminNewService />} />
            <Route path="services/:id/edit" element={<AdminServicesUpdate />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
