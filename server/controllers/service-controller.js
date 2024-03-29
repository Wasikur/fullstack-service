const Service = require("../model/serviceSchema");

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ message: "No Services Found!" });
      return;
    }
    res.status(200).json({ message: response });
  } catch (error) {
    console.log(`service error: ${error}`);
  }
};

module.exports = services;
