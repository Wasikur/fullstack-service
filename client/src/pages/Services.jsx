import React from "react";
import { useState } from "react";
import { useAuth } from "../store/auth";
import "./Services.css";

const Services = () => {
  const { services } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter services based on search query
  const filteredServices = services.filter((service) =>
    service.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      <div className="container service-search">
        {/* Search box */}
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="container grid grid-three-cols">
        {filteredServices.map((curElem, index) => {
          const { price, description, provider, service } = curElem;
          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img
                  src="./assets/services.png"
                  alt="services-banner"
                  width={300}
                />
              </div>
              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
