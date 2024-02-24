const Contact = require("../model/contactSchema");

// Contact form Logic
const contactForm = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    // Add the current date and time to the contact message data
    const contactData = {
      username,
      email,
      message,
      sentOn: new Date(), // Set the sentOn field to the current date and time
    };

    // Create a new contact message with the updated data
    await Contact.create(contactData);

    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while sending the message",
    });
  }
};

module.exports = contactForm;
