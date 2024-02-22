import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [userData, setUserData] = useState(true);

  const { user, isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn && userData && user) {
      setContact({
        username: user.username,
        email: user.email,
        message: "",
      });
      setUserData(false);
    }
  }, [isLoggedIn, userData, user]);
  // const navigate = useNavigate();

  // Handling the input values
  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });

    //   setContact = (prev) => {
    //     ({ ...prev, [name]: value });
    //   };
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        toast.success("Message Sent successfully");
        setContact({
          username: "",
          email: "",
          message: "",
        });
        // navigate("/contact");
      } else {
        toast.error("Message Failed to Send");
        console.log("Message failed to send");
      }

      console.log("Message Posted:", response);
    } catch (error) {
      console.log("Contact error:", error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading mb-3">Contact Us</h1>
        </div>

        {/* contact page main */}
        <div className="container grid grid-two-cols">
          <div className="contact-image">
            <img
              src="./assets/support.svg"
              alt="contact page banner"
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
                  value={contact.username}
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
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="message"
                  autoComplete="off"
                  cols={30}
                  rows={6}
                  value={contact.message}
                  onChange={handleInput}
                  required
                ></textarea>
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
        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d405.76983975468227!2d94.89328392997781!3d27.470501936577676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1707689377000!5m2!1sen!2sin"
            width={"100%"}
            height={"450"}
            // style={(border = 0)}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;
