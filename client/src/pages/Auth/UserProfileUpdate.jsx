import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";

const UserProfileUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [userDataFetched, setUserDataFetched] = useState(false);

  const { user, isLoggedIn, API, authorizationToken } = useAuth();

  useEffect(() => {
    if (isLoggedIn && !userDataFetched && user) {
      setData({
        username: user.username,
        email: user.email,
        phone: user.phone,
      });
      setUserDataFetched(true);
    }
  }, [isLoggedIn, userDataFetched, user]);

  // Handling the input values
  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/auth/update`, {
             method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }

      console.log("Profile Update Response:", response);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An error occurred while updating profile");
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading mb-3">Update Profile</h1>
        </div>

        <div className="container grid grid-two-cols">
          <div className="contact-image">
            <img
              src="./assets/support.svg"
              alt="contact page banner"
              width={500}
              height={500}
            />
          </div>

          <section className="section-form">
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  autoComplete="off"
                  value={data.username}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                  required
                />
              </div>
              <br />
              <div>
                <button type="submit" className="btn btn-submit">
                  Submit
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default UserProfileUpdate;
