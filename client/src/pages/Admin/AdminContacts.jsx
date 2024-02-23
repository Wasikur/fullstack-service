import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
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
      console.log("Admin Users details error:", error);
    }
  };

  // Function to edit user using id
  // const editUser = async (id) => {
  //   console.log(id);
  // };

  // Function to delete user using id
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
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.message}</td>
                    {/* <td>
                      <Link to={`/admin/contacts/${curUser._id}/edit`}>Edit</Link>
                    </td> */}
                    <td><RiDeleteBin6Line
                        onClick={() => deleteContact(curUser._id)}
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

export default AdminContacts;
