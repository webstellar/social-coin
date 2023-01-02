const Appreciation = require("../models/appreciation");
const Hero = require("../models/hero");
const User = require("../models/user");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const { ObjectId } = require("mongodb");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const { sendGeneralNotifiation } = require("../microservices/email.service");
const {
  sendAppNotification,
} = require("../microservices/notification.service");

//create new appreciation => /api/v1/appreciation/new
exports.newAppreciation = catchAsyncErrors(async (req, res, next) => {
  //create the appreciation
  const hero = await Hero.findOne({ _id: req.body.hero });
  req.body.user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    profilePicture: req.user.profilePicture,
  };
  req.body.hero = {
    id: hero._id,
    name: hero.name,
    profilePicture: hero.profilePicture.url,
  };
  let image = null;

  if (req.body.image) {
    const { public_id, url } = await cloudinary.v2.uploader.upload(
      req.body.image,
      {
        folder: "social-coin/appreciations/images",
      }
    );
    image = { public_id, url };
  }

  const appreciation = await Appreciation.create({ ...req.body, image });
  //connect appreciation to  hero
  appreciation.id = await appreciation._id;

  hero.appreciations.push(appreciation);
  hero.markModified("appreciations");
  await hero.save();
  await sendGeneralNotifiation(
    req.user.email,
    req.user.name,
    `Your appreciation is created Successfully.`
  );
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
  ).search();

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
  let appreciation = await Appreciation.findById(req.params.id).populate(
    "user.id",
    req.user.id
  );

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
  const appreciation = await Appreciation.findById(req.params.id).populate(
    "user.id",
    req.user.id
  );

  if (!appreciation) {
    return next(new ErrorHandler("Appreciation not found", 404));
  }

  //Deleting image associated with the appreciation
  if (appreciation.image && appreciation.image.public_id) {
    const image_id = appreciation.image.public_id;
    await cloudinary.v2.uploader.destroy(image_id);
  }
  if (appreciation.video && appreciation.video.public_id) {
    const video_id = appreciation.video.public_id;
    await cloudinary.v2.uploader.destroy(video_id);
  }
  await appreciation.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appreciation has been deleted",
  });
});

//Get logged in user appreciations => /api/v1/me/appreciations
exports.myAppreciations = catchAsyncErrors(async (req, res, next) => {
  const appreciations = await Appreciation.find({
    "user.id": req.user.id,
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
  let appreciation = await Appreciation.findById(req.params.id).populate(
    "user.id",
    req.user.id
  );

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
  const appreciation = await Appreciation.findById(ObjectId(req.params.id));
  if (!appreciation) {
    return next(new ErrorHandler("Appreciation not found", 404));
  }




  

  //Deleting image associated with the appreciation
  if (appreciation.image && appreciation.image.public_id)
    await cloudinary.v2.uploader.destroy(appreciation.image.public_id);

  if (appreciation.video && appreciation.video.public_id)
    await cloudinary.v2.uploader.destroy(appreciation.video.public_id);

  try {
    await Appreciation.deleteOne({ _id: ObjectId(req.params.id) });
  } catch (e) {
    return next(new ErrorHandler("Appreciation deletion failed", 400));
  }

  res.status(200).json({
    success: true,
    message: "Appreciation has been deleted",
  });
});

exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(req.body, req.params.id);
    const appreciation = await Appreciation.findById(req.body.appreciationId);
    appreciation.comments.conversation = [
      ...appreciation.comments.conversation.filter(
        (ele) => ele._id.toString() !== req.params.id
      ),
    ];
    await appreciation.save();
  } catch (e) {
    console.log(e);
    return next(new ErrorHandler("Comment deletion failed", 400));
  }

  res.status(200).json({
    success: true,
    message: "Comment has been deleted",
  });
});
exports.addCommentToAppreciation = catchAsyncErrors(async (req, res, next) => {
  const appreciation = await Appreciation.findById(req.body.appreciationId);
  const user = await User.findById(appreciation.user.id);
  // check if the comment is a reply to the user's comment
  if (req.body.isReply) {
    // find if comment of user exist
    const indexOfcomment = appreciation.comments.conversation.findIndex(
      (element) => {
        return element._id.toString() === req.body.comment.onConversationId;
      }
    );
    if (indexOfcomment === -1)
      return next(new ErrorHandler("Comment not found", 400));
    // push the reply into its replies
    if (!appreciation.comments) {
      appreciation.comments.conversation = [];
    }
    appreciation.comments.conversation[indexOfcomment].replies.push({
      userId: req.user.id,
      reply: req.body.comment.content,
      status: { likesCount: [], dislikesCount: [] },
      postedDate: req.body.comment.onDate,
    });
    await sendAppNotification(
      [user.fcmToken],
      `Checkout ${req.user.name} reply on your appreciation`
    );
    await sendGeneralNotifiation(
      appreciation.user.email,
      appreciation.user.name,
      `${req.user.name} replied on your appreciation.`
    );
  } else {
    // else this is new comment not a reply
    appreciation.comments.conversation.push({
      userId: req.user.id,
      comment: req.body.comment.content,
      status: { likesCount: [], dislikesCount: [] },
      postedDate: req.body.comment.onDate,
      replies: [],
    });
    await sendAppNotification(
      [user.fcmToken],
      `Checkout ${req.user.name} comment on your appreciation`
    );
    await sendGeneralNotifiation(
      appreciation.user.email,
      appreciation.user.name,
      `${req.user.name} added a comment on your appreciation.`
    );
  }
  // check if the sender is new user in the conversation of that appreciation

  const isSenderNew = appreciation.comments.participants.findIndex((ele) => {
    return ele.userId.toString() === req.user.id;
  });
  // if not then push its details into the participants
  if (isSenderNew === -1) {
    appreciation.comments.participants.push({
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      profilePic: req.user.profilePicture.url,
    });
  }
  await appreciation.save();

  res.status(201).json({
    success: true,
    message: `${req.body.isReply ? "Reply" : "Comment"} added successfully`,
    data: appreciation,
  });
});

// like or dislike to a comment
exports.addMyReactionToAppreciation = catchAsyncErrors(
  async (req, res, next) => {
    const appreciation = await Appreciation.findById(req.body.appreciationId);
    // find if comment of user exist
    const indexOfcomment = appreciation.comments.conversation.findIndex(
      (element) => {
        return element._id.toString() === req.body.reaction.onConversationId;
      }
    );
    if (indexOfcomment === -1)
      return next(new ErrorHandler("Comment not found", 400));
    // check if the reaction is on a comment or on its reply

    if (req.body.isReply) {
      const replies =
        appreciation.comments.conversation[indexOfcomment].replies;
      const indexOfReply = replies.findIndex(
        (ele) => ele._id.toString() === req.body.reaction.onReplyId
      );
      if (indexOfReply === -1) {
        return next(new ErrorHandler("Reply not found", 400));
      }
      // if reaction is "like"
      if (req.body.reaction.type.toLowerCase() === "like") {
        // if its already like remove it
        if (replies[indexOfReply].status.likesCount.includes(req.user.id)) {
          appreciation.comments.conversation[indexOfcomment].replies[
            indexOfReply
          ].status.likesCount = [
            ...appreciation.comments.conversation[indexOfcomment].replies[
              indexOfReply
            ].status.likesCount.filter((ele) => ele.toString() !== req.user.id),
          ];
        }
        // else add in likes and remove from dislike if exist
        else {
          const user = await User.findById(
            appreciation.comments.conversation[indexOfcomment].replies[
              indexOfReply
            ].userId
          );
          await sendAppNotification(
            [user.fcmToken],
            `${user.name} liked your reply`
          );
          appreciation.comments.conversation[indexOfcomment].replies[
            indexOfReply
          ].status.likesCount.push(req.user.id);
          appreciation.comments.conversation[indexOfcomment].replies[
            indexOfReply
          ].status.dislikesCount = [
            ...appreciation.comments.conversation[indexOfcomment].replies[
              indexOfReply
            ].status.dislikesCount.filter(
              (ele) => ele.toString() !== req.user.id
            ),
          ];
        }
      } else {
        // if its already disliked remove it
        if (replies[indexOfReply].status.dislikesCount.includes(req.user.id))
          appreciation.comments.conversation[indexOfcomment].replies[
            indexOfReply
          ].status.dislikesCount = [
            ...appreciation.comments.conversation[indexOfcomment].replies[
              indexOfReply
            ].status.dislikesCount.filter(
              (ele) => ele.toString() !== req.user.id
            ),
          ];
        // else add in dislikes and remove from like if exist
        else {
          appreciation.comments.conversation[indexOfcomment].replies[
            indexOfReply
          ].status.dislikesCount.push(req.user.id);
          appreciation.comments.conversation[indexOfcomment].replies[
            indexOfReply
          ].status.likesCount = [
            ...appreciation.comments.conversation[indexOfcomment].replies[
              indexOfReply
            ].status.likesCount.filter((ele) => ele.toString() !== req.user.id),
          ];
        }
      }
    }
    // else reaction is on comment
    else {
      // if reaction is "like"
      if (req.body.reaction.type.toLowerCase() === "like") {
        // if its already like remove it
        if (
          appreciation.comments.conversation[
            indexOfcomment
          ].status.likesCount.includes(req.user.id)
        ) {
          appreciation.comments.conversation[indexOfcomment].status.likesCount =
            [
              ...appreciation.comments.conversation[
                indexOfcomment
              ].status.likesCount.filter(
                (ele) => ele.toString() !== req.user.id
              ),
            ];
        }
        // else add in likes and remove from dislike if exist
        else {
          const user = await User.findById(
            appreciation.comments.conversation[indexOfcomment].userId
          );
          await sendAppNotification(
            [user.fcmToken],
            `${user.name} liked your comment`
          );

          appreciation.comments.conversation[
            indexOfcomment
          ].status.likesCount.push(req.user.id);
          appreciation.comments.conversation[
            indexOfcomment
          ].status.dislikesCount = [
            ...appreciation.comments.conversation[
              indexOfcomment
            ].status.dislikesCount.filter(
              (ele) => ele.toString() !== req.user.id
            ),
          ];
        }
      } else {
        // if its already disliked remove it
        if (
          appreciation.comments.conversation[
            indexOfcomment
          ].status.dislikesCount.includes(req.user.id)
        )
          appreciation.comments.conversation[
            indexOfcomment
          ].status.dislikesCount = [
            ...appreciation.comments.conversation[
              indexOfcomment
            ].status.dislikesCount.filter(
              (ele) => ele.toString() !== req.user.id
            ),
          ];
        else {
          // else add in likes and remove from dislike if exist
          appreciation.comments.conversation[
            indexOfcomment
          ].status.dislikesCount.push(req.user.id);
          appreciation.comments.conversation[indexOfcomment].status.likesCount =
            [
              ...appreciation.comments.conversation[
                indexOfcomment
              ].status.likesCount.filter(
                (ele) => ele.toString() !== req.user.id
              ),
            ];
        }
      }
    }

    await appreciation.save();
    await sendGeneralNotifiation(
      appreciation.user.email,
      appreciation.user.name,
      "People are reacting to the conversation on your post"
    );

    res.status(201).json({
      success: true,
      message: `${req.body.isReply ? "Liked" : "Disliked"} successfully`,
      data: appreciation,
    });
  }
);
