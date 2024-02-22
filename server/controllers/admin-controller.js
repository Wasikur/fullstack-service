const User = require("../model/userSchema");
const Contact = require("../model/contactSchema");
const Service = require("../model/serviceSchema");

// fetching all users info except password for admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field from the response
    // console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// Fetching Users by id to perform edit
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// Updating Users by id
const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;
    let updatedData = await User.updateOne(
      { _id: id },
      { $set: updateUserData }
    );
    return res
      .status(200)
      .json({ message: `Updated Successfully! ${updatedData}` });
  } catch (error) {
    next(error);
  }
};

// Delete users by id
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id; //to get something from url we use params
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: `User with id ${id} is deleted` });
  } catch (error) {
    next(error);
  }
};

// fetching all contact form deatils for admin
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    // console.log(contacts);
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contact Message Found" });
    }
    return res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};

// Delete contacts by id
const deleteContactsById = async (req, res, next) => {
  try {
    const id = req.params.id; //to get something from url we use params
    await Contact.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: `Contact with id ${id} is deleted` });
  } catch (error) {
    next(error);
  }
};

// fetching all services deatils for admin
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    // console.log(services);
    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No Service Available" });
    }
    return res.status(200).json({ services });
  } catch (error) {
    next(error);
  }
};

// Fetching Services by id to perform edit
const getServicesById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Service.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// Updating Services By ID
const updateServicesById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateServiceData = req.body;
    let updatedData = await Service.updateOne(
      { _id: id },
      { $set: updateServiceData }
    );
    return res
      .status(200)
      .json({ message: `Updated Service Successfully! ${updatedData}` });
  } catch (error) {
    next(error);
  }
};

// Deleting Services By ID
const deleteServicesById = async (req, res, next) => {
  try {
    const id = req.params.id; //to get something from url we use params
    await Service.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: `Service with id ${id} is deleted` });
  } catch (error) {
    next(error);
  }
};

// Adding New Services
const addNewService = async (req, res) => {
  try {
    // console.log(req.body);
    const { service, description, price, provider } = req.body;
    const serviceExists = await Service.findOne({ service: service });

    //Checking if email is already registered
    if (serviceExists) {
      return res.status(400).json({ message: "Service already exists" });
    }

    // Creating new user if email does not exists
    const serviceCreated = await Service.create({
      service,
      description,
      price,
      provider,
    });
    res.status(201).json({
      // msg: userCreated,
      message: "Service Added successfully",
      // token: await serviceCreated.generateAuthToken(),
      serviceId: serviceCreated._id.toString(),
    });
    console.log(`New Service ${req.body.service} created`);
  } catch (error) {
    // res.status(500).send({ message: "Internal server error" });
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllContacts,
  deleteContactsById,
  getAllServices,
  getServicesById,
  updateServicesById,
  deleteServicesById,
  addNewService,
};
