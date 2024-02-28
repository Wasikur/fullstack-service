import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./AdminTable.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { authorizationToken, API } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Users : ${data}`);
      setUsers(data.users);
    } catch (error) {
      console.log("Admin Users details error:", error);
    }
  };

  // Function to delete user using id
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Users After Delete : ${data.users}`);
      toast.success("User Deleted Successfully");
      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      toast.error("User Not Deleted");
      console.log("Deleting users error:", error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            placeholder="Search"
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        <div className="container admin-users">
          <DataTable
            value={users}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20]}
            globalFilter={globalFilter}
            emptyMessage="No records found"
          >
            <Column field="username" header="Name" sortable></Column>
            <Column field="email" header="Email" sortable></Column>
            <Column field="phone" header="Phone" sortable></Column>
            <Column field="isAdmin" header="isAdmin" sortable></Column>
            <Column field="createdAt" header="Created At" sortable></Column>
            <Column
              header="Action"
              body={(rowData) => (
                <>
                  <Link to={`/admin/users/${rowData._id}/edit`}>
                    <CiEdit
                      style={{
                        color: "green",
                        cursor: "pointer",
                        fontSize: "20px",
                        marginRight: "20px",
                      }}
                    />
                  </Link>
                  <RiDeleteBin6Line
                    onClick={() => deleteUser(rowData._id)}
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

export default AdminUsers;
