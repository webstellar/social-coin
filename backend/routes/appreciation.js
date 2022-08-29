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
  updateMyAppreciation,
  deleteMyAppreciation,
  addCommentToAppreciation,
  addMyReactionToAppreciation
} = require("../controllers/appreciationControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/appreciations").get(getAppreciations);
router.route("/appreciation/:id").get(getSingleAppreciation);

//users
router.route("/appreciation/new").post(isAuthenticatedUser, newAppreciation);
router.route("/me/appreciations").get(isAuthenticatedUser, myAppreciations);
router
  .route("/me/appreciation/:id")
  .put(isAuthenticatedUser, updateMyAppreciation)
  .delete(isAuthenticatedUser, deleteMyAppreciation);
router.route("/me/appreciations/comment").post(isAuthenticatedUser, addCommentToAppreciation);
router.route("/me/appreciation/reaction").post(isAuthenticatedUser, addMyReactionToAppreciation)
//Admin
router.route("/appreciation/new").post(isAuthenticatedUser, newAppreciation);
router
  .route("/admin/appreciations")
  .get(isAuthenticatedUser, getAdminAppreciations);
router
  .route("/admin/appreciation/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateAppreciation)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAppreciation);

module.exports = router;
