import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLs, API } = useAuth();

  // Handling the input values
  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Login Successful");

        // storing the token in local storage
        storeTokenInLs(res_data.token);

        setUser({
          email: "",
          password: "",
        });
        console.log(`${user.email} logged in`);
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("Invalid Credentials");
      }
      console.log(response);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="login-image">
                <img
                  src="./assets/login-banner.png"
                  alt="login page banner"
                  width={500}
                  height={500}
                />
              </div>
              <div className="login-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
