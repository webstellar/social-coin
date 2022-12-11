const Hero = require("../models/hero");
const Appreciation = require("../models/appreciation");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const { sendGeneralNotifiation } = require("../microservices/email.service");

//Create a new Hero
exports.newHero = catchAsyncErrors(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.profilePicture, {
    folder: "social-coin/hero_avatars",
    width: 240,
    crop: "scale",
  });

  req.body.profilePicture = result;
  req.body.user = req.user.id;
  const hero = await Hero.create(req.body);
  await sendGeneralNotifiation(
    req.user.email,
    req.user.name,
    `Hey ${req.user.name}, We have created your hero, ${req.body.name} successfully`
  );

  res.status(201).json({
    success: true,
    hero,
  });
});

//Get All Heroes
exports.getHeroes = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8;
  const heroesCount = await Hero.countDocuments();

  //const apiFeatures = new APIFeatures(Hero.find(), req.query).search();

  apiFeatures = new APIFeatures(
    Hero.find().populate("appreciations").populate("user"),
    req.query
  ).search();

  const heroes = await apiFeatures.query;

  res.status(200).json({
    success: true,
    heroesCount: heroes.length,
    resPerPage,
    heroes,
  });
});

//Get All Heroes => /api/v1/admin/heroes
exports.getAdminHeroes = catchAsyncErrors(async (req, res, next) => {
  const heroes = await Hero.find();

  res.status(200).json({
    success: true,
    heroes,
  });
});

//Get a Single Hero
exports.getSingleHero = catchAsyncErrors(async (req, res, next) => {
  const hero = await Hero.findById(req.params.id).populate("appreciations");
  //const hero = await Hero.findById(req.params.id);

  //if not successful
  if (!hero) {
    return next(new ErrorHandler("Hero not found", 404));
  }

  res.status(200).json({
    success: true,
    hero,
  });
});

//Associate Hero with Appreciation
exports.associateHeroAppreciations = catchAsyncErrors(
  async (req, res, next) => {
    req.body.user = req.user.id;

    const hero = await Hero.findById(req.params.heroid);
    const appreciation = await Appreciation.findById(req.params.appreciationid);

    hero.appreciations.push(appreciation);
    hero.save();

    appreciation.hero = hero;
    appreciation.save();

    res.status(201).json({
      success: true,
      hero,
      appreciation,
    });
  }
);

//Update a single Hero
exports.updateHero = catchAsyncErrors(async (req, res, next) => {
  let hero = await Hero.findById(req.params.id);

  if (!hero) {
    return next(new ErrorHandler("Unable to Update Hero", 404));
  }

  hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    hero,
  });
});

//Delete Hero
exports.deleteHero = catchAsyncErrors(async (req, res, next) => {
  const hero = await Hero.findById(req.params.id);

  if (!hero) {
    return next(new ErrorHandler("Hero not found", 404));
  }

  const image_id = hero.profilePicture.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await hero.deleteOne();
  res.status(200).json({
    success: true,
    message: "Hero successfully deleted",
  });
});

//Get logged in user heros => /api/v1/me/heroes/
exports.myHeroes = catchAsyncErrors(async (req, res, next) => {
  const heroes = await Hero.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    heroes,
  });
});

//Update logged in user heros => /api/v1/me/hero/:id
exports.updateMyHero = catchAsyncErrors(async (req, res, next) => {
  let hero = await Hero.findById(req.params.id).populate({
    user: req.user.id,
  });

  if (!hero) {
    return next(new ErrorHandler("Unable to Update Hero", 404));
  }

  hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    hero,
  });
});

//Delete logged in user heros => /api/v1/me/hero/:id
exports.deleteHero = catchAsyncErrors(async (req, res, next) => {
  const hero = await Hero.findById(req.params.id);

  if (!hero) {
    return next(new ErrorHandler("Hero not found", 404));
  }

  await hero.deleteOne();
  res.status(200).json({
    success: true,
    message: "Hero successfully deleted",
  });
});

//Search /api/v1/search
exports.getHeroesBySearch = catchAsyncErrors(async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const heroes = await Hero.find({ title });
    res.status(200).json({ heroes });
  } catch (error) {
    res.status(404).json({
      message: "Heroes doesn't exist",
    });
  }
});
