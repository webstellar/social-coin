const Appreciation = require("../models/appreciation");
const Hero = require("../models/hero");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//create new appreciation => /api/v1/appreciation/new
exports.newAppreciation = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.hero = toId(req.body.hero);

  const image = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "social-coin/appreciations/images",
  });

  req.body.image = image;

  const appreciation = await Appreciation.create(req.body);

  req.params.id = req.body.hero;
  if (!req.params.id) {
    return next(new ErrorHandler("Hero not found", 404));
  }

  const hero = await Hero.findById(req.params.id);
  hero.appreciations.push(appreciation);
  hero.markModified("appreciations");
  await hero.save();

  res.status(201).json({
    success: true,
    appreciation,
    hero,
  });
});

//Get all appreciations => /api/v1/appreciations
exports.getAppreciations = catchAsyncErrors(async (req, res, next) => {
  const appreciationsCount = await Appreciation.countDocuments();

  const apiFeatures = new APIFeatures(
    Appreciation.find().populate("hero"),
    req.query
  )
    .search()
    .filter();

  const appreciations = await apiFeatures.query;

  res.status(200).json({
    success: true,
    appreciationsCount,
    appreciations,
  });
});

//Get all appreciations => /api/v1/admin/appreciations
exports.getAdminAppreciations = catchAsyncErrors(async (req, res, next) => {
  const appreciations = await Appreciation.find();

  res.status(200).json({
    success: true,
    appreciations,
  });
});

//get a single product detail => /api/v1/appreciation/:id
exports.getSingleAppreciation = catchAsyncErrors(async (req, res, next) => {
  const appreciation = await Appreciation.findById(req.params.id);

  //if not successful in find appreciation by Id
  if (!appreciation) {
    return next(new ErrorHandler("Appreciation not found", 404));
  }

  res.status(200).json({
    success: true,
    appreciation,
  });
});

//Update Appreciation => /api/v1/appreciation/:d
exports.updateAppreciation = catchAsyncErrors(async (req, res, next) => {
  //appreciation is referenced with LET meaning it's value will change after finding it
  //first we get the single appreciation
  let appreciation = await Appreciation.findById(req.params.id);

  //if not successful in find appreciation by Id
  if (!appreciation) {
    return next(new ErrorHandler("Appreciation not found", 404));
  }
  //if successful,
  //next we get it and update it's content
  appreciation = await Appreciation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    appreciation,
  });
});

//Delete Appreciation => /api/v1/admin/appreciation/:id
exports.deleteAppreciation = catchAsyncErrors(async (req, res, next) => {
  const appreciation = await Appreciation.findById(req.params.id);

  if (!appreciation) {
    return next(new ErrorHandler("Appreciation not found", 404));
  }

  //Deleting images associated with the appreciation
  const imageResult = await cloudinary.v2.uploader.destroy(
    appreciation.image.public_id
  );

  await appreciation.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appreciation has been deleted",
  });
});

//Get logged in user appreciations => /api/v1/appreciation/me
exports.myAppreciations = catchAsyncErrors(async (req, res, next) => {
  const appreciations = await Appreciation.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    appreciations,
  });
});

//restapitutorial.com/httpstatuscodes.html
