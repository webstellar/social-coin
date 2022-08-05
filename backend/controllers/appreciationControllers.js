const Appreciation = require("../models/appreciation");
const Hero = require("../models/hero");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const { ObjectId } = require("mongodb");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//create new appreciation => /api/v1/appreciation/new
exports.newAppreciation = catchAsyncErrors(async (req, res, next) => {
  //create the appreciation
  req.body.user = req.user.id;
  req.body.hero = toId(req.body.hero);
  let image;
  if(req.body.image){
    image = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "social-coin/appreciations/images",
    });
  }
  // if(req.body.video){
  //   video = await cloudinary.v2.uploader.upload_large(req.body.video, {
  //     resource_type: "video",
  //     folder: "social-coin/appreciations/videos",
  //     chunk_size: 6000000,
  //   });
  // }

  req.body.image = image;
  const appreciation = await Appreciation.create(req.body);
  //connect appreciation to  hero
  appreciation.id = await appreciation._id;
  req.params.id = await appreciation.hero;

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

/*
  hero = await Hero.findById(req.params.id);
  console.log(hero);
*/

/*
  const hero = await Hero.findByIdAndUpdate(
    req.params.id,
    { $push: { appreciations: appreciation } },
    { $push: { appreciations: appreciation } },
    { safe: true, upsert: false }
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Hero : ", docs);
      }
    }
  );*/

/*
    const filter = { _id: req.params.id };
    const update = { $push: { appreciations: appreciation } };
    const safety = { safe: true, upsert: true };

    
  const hero = await Hero.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { appreciations: appreciation } },
    { safe: true, upsert: true }
  );
  */
/*
  console.log("appreciation hero", req.params.id);

  const hero = await Hero.findById(req.params.id);
  console.log("Hero Id", hero);
  */

/*
  const hero = await Hero.findByIdAndUpdate(
    req.params.id,
    { $push: { appreciations: appreciation } },
    { safe: true, upsert: false },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated Hero : ", docs);
      }
    }
  );
*/

//Get all appreciations => /api/v1/appreciations
exports.getAppreciations = catchAsyncErrors(async (req, res, next) => {
  const appreciationsCount = await Appreciation.countDocuments();

  const apiFeatures = new APIFeatures(
    Appreciation.find().populate("hero").populate("user"),
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

//get a single appreciation detail => /api/v1/appreciation/:id
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

  //Deleting image associated with the appreciation
  const image_id = appreciation.image.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  const video_id = appreciation.video.public_id;
  await cloudinary.v2.uploader.destroy(video_id);

  await appreciation.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appreciation has been deleted",
  });
});

//Get logged in user appreciations => /api/v1/me/appreciations
exports.myAppreciations = catchAsyncErrors(async (req, res, next) => {
  const appreciations = await Appreciation.find({
    user: req.user.id,
  });

  let heroesIDs = [];

  for (let i = 0; i < appreciations.length; i++) {
    result = await appreciations[i];
    heroesIDs.push(result.hero);
  }

  req.params.id = heroesIDs;

  const heroes = await Hero.find({
    _id: {
      $in: req.params.id,
    },
  });

  res.status(200).json({
    success: true,
    appreciations,
    heroes,
  });
});

//Update logged in user Appreciation => /api/v1/me/appreciation/:id
exports.updateMyAppreciation = catchAsyncErrors(async (req, res, next) => {
  let appreciation = await Appreciation.findById(req.params.id).populate({
    user: req.user.id,
  });

  if (!appreciation) {
    return next(new ErrorHandler("Appreciation not found", 404));
  }

  appreciation = await Appreciation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    appreciation,
  });
});

//Delete Appreciation => /api/v1/me/appreciation/:id
exports.deleteMyAppreciation = catchAsyncErrors(async (req, res, next) => {
  const appreciation = await Appreciation.findById(req.params.id).populate({
    user: req.user.id,
  });

  if (!appreciation) {
    return next(new ErrorHandler("Appreciation not found", 404));
  }

  //Deleting image associated with the appreciation
  const imageResult = await cloudinary.v2.uploader.destroy(
    appreciation.image.public_id
  );

  await appreciation.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appreciation has been deleted",
  });
});
