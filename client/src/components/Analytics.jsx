import React from "react";
import CountUp from "react-countup";
import "./Analytics.css";
const Analytics = () => {
 const scrollDuration = 2;
  return (
    <section className="section-analytics">
      <div className="container grid grid-four-cols">
        <div className="div1">
          <h2>
            <CountUp end={800} duration={scrollDuration} />+
          </h2>
          <p>Registered Properties</p>
        </div>
        <div className="div1">
          <h2>
            <CountUp end={1000} duration={scrollDuration} />+
          </h2>
          <p>Satisfied Customers</p>
        </div>
        <div className="div1">
          <h2>
            <CountUp end={500} duration={scrollDuration} />+
          </h2>
          <p>Happy Property Owners</p>
        </div>
        <div className="div1">
          <h2>
            <CountUp end={24} duration={scrollDuration} />
            /7
          </h2>
          <p>Service</p>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
