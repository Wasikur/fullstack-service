import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
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

        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>isAdmin</th>
                <th>Created At</th> {/* Added Created At column header */}
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td>{curUser.isAdmin ? "Yes" : "No"}</td>
                    <td>{new Date(curUser.createdAt).toLocaleString()}</td>
                    <td>
                      <Link to={`/admin/users/${curUser._id}/edit`}>
                        <CiEdit
                          style={{
                            color: "green",
                            cursor: "pointer",
                            fontSize: "30px",
                          }}
                        />
                      </Link>
                    </td>
                    <td>
                      <RiDeleteBin6Line
                        onClick={() => deleteUser(curUser._id)}
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

export default AdminUsers;
