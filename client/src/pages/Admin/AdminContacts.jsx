import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./AdminTable.css";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { authorizationToken, API } = useAuth();

  const getAllContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Contacts : ${data}`);
      setContacts(data.contacts);
    } catch (error) {
      console.log("Admin Contacts details error:", error);
    }
  };

  // Function to delete contact using id
  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Contacts After Delete : ${data.contacts}`);
      toast.success("Contact Deleted Successfully");
      if (response.ok) {
        getAllContactsData();
      }
    } catch (error) {
      toast.error("Contact Not Deleted");
      console.log("Deleting contact error:", error);
    }
  };

  useEffect(() => {
    getAllContactsData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Contacts Data</h1>
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
            value={contacts}
            globalFilter={globalFilter}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20]}
            emptyMessage="No records found"
          >
            <Column field="username" header="Name" sortable></Column>
            <Column field="email" header="Email" sortable></Column>
            <Column field="message" header="Message" sortable></Column>
            <Column field="sentOn" header="Received On" sortable></Column>
            <Column
              header="Action"
              body={(rowData) => (
                <RiDeleteBin6Line
                  onClick={() => deleteContact(rowData._id)}
                  style={{
                    color: "#ff0000",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                />
              )}
            ></Column>
          </DataTable>
        </div>
      </section>
    </>
  );
};

export default AdminContacts;
