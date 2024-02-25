import React from "react";
import "./Home.css";
import Analytics from "../components/Analytics";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main>
        {/* 1st section */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the World Best IT company</p>
              <h1>Welcome to our website!</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At WebDev,
                we specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>
              <span className="btn brn-grp">
                <span class="button-container">
                  <NavLink to="/contact">
                    <button className="btn">Connect Now</button>
                  </NavLink>
                </span>
                <span class="button-container">
                  <NavLink to="/services">
                    <button className="btn secondary-btn">Learn More</button>
                  </NavLink>
                </span>
              </span>
            </div>
            <div className="hero-image">
              <img src="./assets/home1.svg" alt="welcome" width={500} />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section */}
      <Analytics />
      {/* 3rd section */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-image">
            <img src="./assets/home2.svg" alt="welcome" width={500} />
          </div>
          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how WebDev can help your business thrive in
              the digital age.
            </p>
           <span className="btn brn-grp">
                <span class="button-container">
                  <NavLink to="/contact">
                    <button className="btn">Connect Now</button>
                  </NavLink>
                </span>
                <span class="button-container">
                  <NavLink to="/services">
                    <button className="btn secondary-btn">Learn More</button>
                  </NavLink>
                </span>
              </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
