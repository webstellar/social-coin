const express = require("express");
const router = express.Router();

//routes interact with the controllers
const {
  getHeroes,
  newHero,
  getSingleHero,
  updateHero,
  deleteHero,
  associateHeroAppreciations,
  getAdminHeroes,
  myHeroes,
  updateMyHero,
} = require("../controllers/heroControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/heroes").get(getHeroes);
router.route("/hero/:id").get(getSingleHero);

//Both Admin and User (slate)
router
  .route("/hero/:heroid/:appreciationid")
  .post(isAuthenticatedUser, associateHeroAppreciations);

//Users
router.route("/hero/new").post(isAuthenticatedUser, newHero);
router.route("/me/heroes").get(isAuthenticatedUser, myHeroes);
router
  .route("/me/hero/:id")
  .put(isAuthenticatedUser, updateMyHero)
  .delete(isAuthenticatedUser, deleteHero);

// Admin
router.route("/hero/new").post(isAuthenticatedUser, newHero);
router.route("/admin/heroes").get(isAuthenticatedUser, getAdminHeroes);
router
  .route("/admin/hero/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateHero)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteHero);

module.exports = router;
