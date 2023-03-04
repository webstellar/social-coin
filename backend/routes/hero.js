const express = require("express");
const router = express.Router();

//routes interact with the controllers
const {
  getHeroes,
  getAllHeroes,
  newHero,
  getSingleHero,
  updateHero,
  deleteHero,
  associateHeroAppreciations,
  getAdminHeroes,
  myHeroes,
  updateMyHero,
  getHeroesBySearch,
  getHeroesByCategory,
  getHeroByRelatedCategory,
  loadMoreHeroes,
} = require("../controllers/heroControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/heroes").get(getHeroes);
router.route("/allHeroes").get(getAllHeroes);
router.route("/moreHeroes").get(loadMoreHeroes);
router.route("/hero/:id").get(getSingleHero);
router.route("/hero/category/:category").get(getHeroesByCategory);
router.route("/hero/relatedcategory").get(getHeroByRelatedCategory);

//Both Admin and User (slate)
router
  .route("/hero/:heroid/:appreciationid")
  .post(isAuthenticatedUser, associateHeroAppreciations);

//Users
router.route("/hero/new").post(isAuthenticatedUser, newHero);
router.route("/me/heroes").get(isAuthenticatedUser, myHeroes);
router
  .route("/me/hero/:id")
  .patch(isAuthenticatedUser, updateMyHero)
  .delete(isAuthenticatedUser, deleteHero);

// Admin
router.route("/hero/new").post(isAuthenticatedUser, newHero);
router.route("/admin/heroes").get(isAuthenticatedUser, getAdminHeroes);
router
  .route("/admin/hero/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateHero)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteHero);

router.route("/heroes/search").get(getHeroesBySearch);

module.exports = router;
