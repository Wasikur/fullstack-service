import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const AdminNewService = () => {
  const [service, setService] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
  });

  // const navigate = useNavigate();
  const { authorizationToken, API } = useAuth();

  // Handlong the input values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setService({ ...service, [name]: value });
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(service);

    try {
      const response = await fetch(`${API}/api/admin/services/newservice`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(service),
      });

      const res_data = await response.json();
      console.log("res from server", res_data.extraDetails);

      if (response.ok) {
        toast.success("Service Added Successfully");

        setService({
          service: "",
          description: "",
          price: "",
          provider: "",
        });
        console.log(`${service.service} is registered`);
        // navigate("/admin/services");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("Service Adding Error. Try Again");
      }
    } catch (error) {
      console.log("Service Adding error:", error);
    }
  };

  return (
    <>
      <section className="">
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="../assets/update.png"
                  alt="new service page banner"
                  width={500}
                  // height={500}
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Add New Service</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="service">Service</label>
                    <input
                      type="text"
                      id="service"
                      name="service"
                      placeholder="service"
                      autoComplete="off"
                      value={service.service}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      placeholder="description"
                      autoComplete="off"
                      value={service.description}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      placeholder="price"
                      autoComplete="off"
                      value={service.price}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="provider">Provider</label>
                    <input
                      type="provider"
                      id="provider"
                      name="provider"
                      placeholder="provider"
                      autoComplete="off"
                      value={service.provider}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Add Service
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

export default AdminNewService;
