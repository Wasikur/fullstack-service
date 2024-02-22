import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";

const AdminUsersUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  //   const [userData, setUserData] = useState(true);

  const params = useParams();
  const { authorizationToken, API } = useAuth();

  // Fteching single user data
  const getSingleUserData = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`User Selected For Updating : ${data.username}`);
      setData(data);
    } catch (error) {
      console.log("Fetching single user error:", error);
    }
  };

  // Updating data dynamiacally
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API}/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("User Updated Successfully");
      } else {
        toast.error("User Update Failed");
      }
    } catch (error) {
      console.log("Updating users error:", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading mb-3">Admin User Update</h1>
      </div>

      {/* contact page main */}
      <div className="container grid grid-two-cols">
        <div className="contact-image">
          <img
            src="/assets/update.png"
            alt="update page banner"
            width={500}
            height={500}
          />
        </div>

        {/* contact form content actual */}
        <section className="section-form">
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="email"
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="phone"
                id="phone"
                name="phone"
                placeholder="phone"
                autoComplete="off"
                value={data.phone}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="isAdmin">Role</label>
              <select
                id="isAdmin"
                name="isAdmin"
                value={data.isAdmin}
                onChange={handleInput}
                required
              >
                <option value={false}>User</option>
                <option value={true}>Admin</option>
              </select>
            </div>

            <br />
            <div>
              <button type="submit" className="btn btn-submit">
                Update
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default AdminUsersUpdate;
