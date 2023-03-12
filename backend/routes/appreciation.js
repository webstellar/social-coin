const express = require("express");
const router = express.Router();

//routes interact with the controllers
const {
  getAllTags,
  deleteReview,
  deleteComment,
  deleteMyReview,
  newAppreciation,
  myAppreciations,
  getAppreciations,
  getAllCategories,
  updateAppreciation,
  likeMyAppreciation,
  deleteAppreciation,
  updateMyAppreciation,
  deleteMyAppreciation,
  getAppreciationByTag,
  getAdminAppreciations,
  getSingleAppreciation,
  getAppreciationReviews,
  createAppreciationReview,
  addCommentToAppreciation,
  getAppreciationByCategory,
  getAppreciationsByFilters,
  getAppreciationByRelatedTag,
  addMyReactionToAppreciation,
  getAppreciationByRelatedCategory,
} = require("../controllers/appreciationControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/review").patch(isAuthenticatedUser, createAppreciationReview);
router.route("/review").get(isAuthenticatedUser, getAppreciationReviews);
router.route("/review").delete(isAuthenticatedUser, deleteReview);
router.route("/review/:id").delete(isAuthenticatedUser, deleteMyReview);

router.route("/appreciations").get(getAppreciations);
router.route("/filterappreciations").get(getAppreciationsByFilters);
router.route("/appreciation/:id").get(getSingleAppreciation);
router.route("/appreciation/tag/:tag").get(getAppreciationByTag);
router.route("/appreciation/relatedtag").get(getAppreciationByRelatedTag);
router.route("/appreciation/alltags").post(getAllTags);
router.route("/appreciation/allcategories").post(getAllCategories);
router.route("/appreciation/category/:category").get(getAppreciationByCategory);
router
  .route("/appreciation/relatedcategory")
  .get(getAppreciationByRelatedCategory);

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

router
  .route("/appreciation/likes/:id/")
  .patch(isAuthenticatedUser, likeMyAppreciation);

module.exports = router;
