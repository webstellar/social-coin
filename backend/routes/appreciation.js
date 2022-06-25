const express = require("express");
const router = express.Router();

//routes interact with the controllers
const {
  getAppreciations,
  newAppreciation,
  getSingleAppreciation,
  updateAppreciation,
  deleteAppreciation,
  getAdminAppreciations,
  myAppreciations,
} = require("../controllers/appreciationControllers");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/appreciations").get(getAppreciations);
router.route("/appreciation/:id").get(getSingleAppreciation);

//users
router.route("/appreciation/new").post(isAuthenticatedUser, newAppreciation);

router
  .route("/appreciation/:id")
  .put(isAuthenticatedUser, updateAppreciation)
  .delete(isAuthenticatedUser, deleteAppreciation);

router.route("/appreciations/me").get(isAuthenticatedUser, myAppreciations);

//Admin
router.route("/appreciation/new").post(isAuthenticatedUser, newAppreciation);

router.route("/admin/appreciations").get(getAdminAppreciations);

router
  .route("/appreciation/:id")
  .put(isAuthenticatedUser, updateAppreciation)
  .delete(isAuthenticatedUser, deleteAppreciation);

module.exports = router;
