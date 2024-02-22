const Contact = require("../model/contactSchema");

// Contact form Logic
const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({
      message: "Message sent successfully",
    });
    // console.log(`Message sent by ${req.body.username}`);
  } catch (error) {
    return res.status(200).json({
      message: "Message not sent",
    });
    // next(error);
  }
};

module.exports = contactForm;
