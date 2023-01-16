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
  addMyReactionToAppreciation,
  deleteComment,
  getAppreciationByTag,
  getAppreciationByCategory,
} = require("../controllers/appreciationControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/appreciations").get(getAppreciations);
router.route("/appreciation/:id").get(getSingleAppreciation);
router.route("/appreciation/tag/:tag").get(getAppreciationByTag);
router.route("/appreciation/category/:category").get(getAppreciationByCategory);


//users
router.route("/appreciation/new").post(isAuthenticatedUser, newAppreciation);
router.route("/me/appreciations").get(isAuthenticatedUser, myAppreciations);
router
  .route("/me/appreciation/:id")
  .patch(isAuthenticatedUser, updateMyAppreciation)
  .delete(isAuthenticatedUser, deleteMyAppreciation);
router
  .route("/me/appreciations/comment")
  .post(isAuthenticatedUser, addCommentToAppreciation);
router
  .route("/me/appreciations/reaction")
  .post(isAuthenticatedUser, addMyReactionToAppreciation);
//Admin
router.route("/appreciation/new").post(isAuthenticatedUser, newAppreciation);
router
  .route("/admin/appreciations")
  .get(isAuthenticatedUser, getAdminAppreciations);
router
  .route("/admin/appreciation/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateAppreciation)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAppreciation);

router
  .route("/admin/delete/comment/:id")
  .post(isAuthenticatedUser, authorizeRoles("admin"), deleteComment);

module.exports = router;
