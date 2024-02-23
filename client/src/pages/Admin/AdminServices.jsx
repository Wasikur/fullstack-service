import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const { authorizationToken, API } = useAuth();

  const getAllServicesData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/services`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Services : ${data}`);
      setServices(data.services);
    } catch (error) {
      console.log("Services details error:", error);
    }
  };

  // Function to edit user using id
  // const editUser = async (id) => {
  //   console.log(id);
  // };

  // Function to delete user using id
  const deleteServices = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/services/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Services After Delete : ${data.services}`);
      toast.success("Servicet Deleted Successfully");
      if (response.ok) {
        getAllServicesData();
      }
    } catch (error) {
      toast.error("Service Not Deleted");
      console.log("Deleting Service error:", error);
    }
  };

  useEffect(() => {
    getAllServicesData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Services Data</h1>
          <Link to={"/admin/newservices"}>
            <button>Add New Service</button>
          </Link>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Services</th>
                <th>Description</th>
                <th>Price</th>
                <th>Provider</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {services.map((curService, index) => {
                return (
                  <tr key={index}>
                    <td>{curService.service}</td>
                    <td>{curService.description}</td>
                    <td>{curService.price}</td>
                    <td>{curService.provider}</td>
                    <td>
                      <Link to={`/admin/services/${curService._id}/edit`}>
                        <CiEdit
                          style={{
                            color: "green",
                            cursor: "pointer",
                            fontSize: "30px",
                          }}
                        />
                      </Link>
                    </td>
                    {/* <td>
                      <Link to={`/admin/contacts/${curUser._id}/edit`}>Edit</Link>
                    </td> */}
                    <td>
                     <RiDeleteBin6Line
                        onClick={() => deleteServices(curService._id)}
                        style={{
                          color: "#ff0000",
                          cursor: "pointer",
                          fontSize: "30px",
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminServices;
