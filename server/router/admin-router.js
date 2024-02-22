const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();

// Users
router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers); //check if user logged in/ check if admin/implement function

router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);

router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

// COntacts
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);

router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContactsById);

// Services
router
  .route("/services")
  .get(authMiddleware, adminMiddleware, adminController.getAllServices);

router
  .route("/services/newservice")
  .post(authMiddleware, adminMiddleware, adminController.addNewService);

router
  .route("/services/:id")
  .get(authMiddleware, adminMiddleware, adminController.getServicesById);

router
  .route("/services/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateServicesById);

router
  .route("/services/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteServicesById);

module.exports = router;
