import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./AdminTable.css";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
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

  // Function to delete service using id
  const deleteService = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/services/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Services After Delete : ${data.services}`);
      toast.success("Service Deleted Successfully");
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
        <div className="container p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            placeholder="Search"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="container admin-users">
          <DataTable
            value={services}
            globalFilter={globalFilter}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20]}
            emptyMessage="No records found"
          >
            <Column field="service" header="Service" sortable></Column>
            <Column field="description" header="Description" sortable></Column>
            <Column field="price" header="Price" sortable></Column>
            <Column field="provider" header="Provider" sortable></Column>
            <Column
              header="Action"
              body={(rowData) => (
                <>
                  <Link to={`/admin/services/${rowData._id}/edit`}>
                    <CiEdit
                      style={{
                        color: "green",
                        cursor: "pointer",
                        fontSize: "25px",
                        marginRight: "20px",
                      }}
                    />
                  </Link>
                  <RiDeleteBin6Line
                    onClick={() => deleteService(rowData._id)}
                    style={{
                      color: "#ff0000",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  />
                </>
              )}
            ></Column>
          </DataTable>
        </div>
      </section>
    </>
  );
};

export default AdminServices;
