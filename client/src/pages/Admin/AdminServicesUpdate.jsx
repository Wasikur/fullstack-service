import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";

const AdminServicesUpdate = () => {
  const [data, setData] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
  });

  const params = useParams();
  const { authorizationToken, API } = useAuth();

  const getSingleServiceData = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/services/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Service Selected For Updating : ${data.service}`);
      setData(data);
    } catch (error) {
      console.log("Fetching single service error:", error);
    }
  };

  // Updating data dynamiacally
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API}/api/admin/services/update/${params.id}`,
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
        toast.success("Service Updated Successfully");
      } else {
        toast.error("Service Update Failed");
      }
    } catch (error) {
      console.log("Updating service error:", error);
    }
  };

  useEffect(() => {
    getSingleServiceData();
  }, []);

  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
              <label htmlFor="service">Service</label>
              <input
                type="text"
                id="service"
                name="service"
                placeholder="service"
                autoComplete="off"
                value={data.service}
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
                value={data.description}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input
                type="price"
                id="price"
                name="price"
                placeholder="price"
                autoComplete="off"
                value={data.price}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="provider">Provider</label>
              <input
                type="text"
                id="provider"
                name="provider"
                placeholder="provider"
                autoComplete="off"
                value={data.provider}
                onChange={handleInput}
                required
              />
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

export default AdminServicesUpdate;
