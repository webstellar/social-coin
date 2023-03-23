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

//Get all appreciations => /api/v1/appreciations
exports.getAppreciations = catchAsyncErrors(async (req, res) => {
  const { page } = req.query;
  const limitValue = req.query.limit ? Number(req.query.limit) : 12;
  const startIndex = (Number(page) - 1) * limitValue;
  const appreciationsCount = await Appreciation.countDocuments();

  const apiFeatures = new APIFeatures(
    Appreciation.find()
      .populate("hero")
      .populate("user")
      .limit(limitValue)
      .skip(startIndex)
      .sort({ $natural: -1 }),
    req.query
  ).search();

  const appreciations = await apiFeatures.query;

  res.status(200).json({
    success: true,
    appreciationsCount,
    appreciations,
    currentPage: Number(page),
    numberOfPages: Math.ceil(appreciationsCount / limitValue),
  });
});

//Get all appreciations => /api/v1/filterappreciations
exports.getAppreciationsByFilters = catchAsyncErrors(async (req, res) => {
  let testimonies = await Appreciation.find();
  const totalTags = [...new Set(testimonies.flatMap(({ tags }) => tags))];
  const totalCategories = [
    ...new Set(testimonies.flatMap(({ categories }) => categories)),
  ];

  const page = req.query.page;
  const search = req.query.search || "";
  let tag = req.query.tag || "All";
  let category = req.query.category || "All";

  tag === "All" ? (tag = totalTags) : (tag = req.query.tag.split(","));
  category === "All"
    ? (category = totalCategories)
    : (category = req.query.category.split(","));

  /* let sort = req.query.sort || "Most Recent";

  req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

  let sortBy = {};
  if (sort[1]) {
    sortBy[sort[0]] = sort[1];
  } else {
    sortBy[sort[0]] = "asc";
  } */

  const limitValue = req.query.limit ? Number(req.query.limit) : 12;
  const startIndex = (Number(page) - 1) * limitValue;
  let appreciationsCount = await Appreciation.countDocuments();
  let totalFilteredCount = await Appreciation.countDocuments({});

  let appreciations = await Appreciation.find()
    .populate("hero")
    .populate("user")
    .limit(limitValue)
    .skip(startIndex)
    .sort({ $natural: -1 });

  if (tag && category) {
    appreciations = await Appreciation.find({
      tags: { $in: tag },
      categories: { $in: category },
    })
      .populate("hero")
      .populate("user")
      .limit(limitValue)
      .skip(startIndex)
      .sort({ $natural: -1 });

    totalFilteredCount = await Appreciation.countDocuments({
      tags: { $in: tag },
      categories: { $in: category },
    });
  } else if (tag) {
    appreciations = await Appreciation.find({
      tags: { $in: tag },
    })
      .populate("hero")
      .populate("user")
      .limit(limitValue)
      .skip(startIndex)
      .sort({ $natural: -1 });

    totalFilteredCount = await Appreciation.countDocuments({
      tags: { $in: tag },
    });
  } else if (category) {
    appreciations = await Appreciation.find({
      categories: { $in: category },
    })
      .populate("hero")
      .populate("user")
      .limit(limitValue)
      .skip(startIndex)
      .sort({ $natural: -1 });

    totalFilteredCount = await Appreciation.countDocuments({
      categories: { $in: category },
    });
  } else if (search) {
    appreciations = await Appreciation.find({
      summary: { $regex: search, $options: "i" },
    })
      .populate("hero")
      .populate("user")
      .limit(limitValue)
      .skip(startIndex)
      .sort({ $natural: -1 });

    totalFilteredCount = await Appreciation.countDocuments({
      summary: { $regex: search, $options: "i" },
    });
  }

  res.status(200).json({
    success: true,
    search,
    tag,
    totalFilteredCount,
    category,
    appreciationsCount,
    appreciations,
    currentPage: Number(page),
    numberOfPages: Math.ceil(appreciationsCount / limitValue),
  });
});

// delivers only 2 data, despite chnage in values
// api/v1/filters
exports.getAppreciationBySortingByFilters = catchAsyncErrors(
  async (req, res) => {
    const page = req.query.page;
    const keyword = req.query.keyword || "";
    let tags = req.query.tag || "All";
    let categories = req.query.category || "All";
    const limitValue = req.query.limit ? Number(req.query.limit) : 12;
    const startIndex = (Number(page) - 1) * limitValue;
    const appreciationsCount = await Appreciation.countDocuments();

    let sort = req.query.sort || "summary";

    let sortObject = {};
    if (req.query.sortField == "likes") {
      sortObject["likes"] = sortQuery;
    } else if (req.query.sortField == "createdAt") {
      sortObject["createdAt"] = sortQuery;
    }

    let testimonies = await Appreciation.find();
    const totalTags = [...new Set(testimonies.flatMap(({ tags }) => tags))];
    const totalCategories = [
      ...new Set(testimonies.flatMap(({ categories }) => categories)),
    ];

    tags === "All" ? (tags = totalTags) : (tags = req.query.tag.split(","));
    categories === "All"
      ? (categories = totalCategories)
      : (categories = req.query.category.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const apiFeatures = new APIFeatures(
      Appreciation.find()
        .populate("hero")
        .populate("user")
        .where("tags")
        .in([...tags])
        .where("categories")
        .in([...categories])
        .limit(limitValue)
        .skip(startIndex)
        .sort(sortBy),
      req.query
    ).search();

    const appreciations = await apiFeatures.query;
    const total = appreciations.length;
    const totalFilteredCount = await Appreciation.countDocuments({
      summary: { $regex: keyword, $options: "i" },
    })
      .where("tags")
      .in([...tags])
      .where("categories")
      .in([...categories]);

    res.status(200).json({
      sort,
      keyword,
      success: true,
      appreciationsCount,
      totalFilteredCount,
      total,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalFilteredCount / limitValue),
      appreciations,
    });
  }
);

//doesn't works
exports.getFilteredAppreciations = catchAsyncErrors(async (req, res) => {
  const { page, tags, categories } = req.query;
  const limitValue = 12;
  //const startIndex = (Number(page) - 1) * limitValue;
  const appreciationsCount = await Appreciation.countDocuments();

  const apiFeatures = new APIFeatures(
    Appreciation.find()
      .populate("hero")
      .populate("user")
      .sort({ $natural: -1 }),
    req.query
  ).filter();

  let appreciations = await apiFeatures.query;
  let filteredAppreciationCount = appreciations.length;

  res.status(200).json({
    success: true,
    appreciationsCount,
    appreciations,
    tags: tags,
    categories: categories,
    currentPage: Number(page),
    numberOfPages: Math.ceil(filteredAppreciationCount / limitValue),
    filteredAppreciationCount,
  });
});

// get Appreciations by Tags
exports.getAppreciationByTag = catchAsyncErrors(async (req, res) => {
  const { tag } = req.params;

  const limitValue = 12;
  const skipValue = req.query.skip ? Number(req.query.skip) : 0;

  const appreciations = await Appreciation.find({ tags: { $in: tag } })
    .limit(limitValue)
    .skip(skipValue);

  res.status(200).json({
    success: true,
    appreciations,
  });
});

// get Appreciations by Related Tags
exports.getAppreciationByRelatedTag = catchAsyncErrors(async (req, res) => {
  const tags = req.body;

  const limitValue = 10;
  const skipValue = req.query.skip ? Number(req.query.skip) : 0;

  const appreciations = await Appreciation.find({
    tags: { $in: tags },
  })
    .limit(limitValue)
    .skip(skipValue);

  res.status(200).json({
    success: true,
    appreciations,
  });
});

//get All Tags
exports.getAllTags = catchAsyncErrors(async (req, res) => {
  const apiFeatures = new APIFeatures(Appreciation.find());
  const appreciations = await apiFeatures.query;
  const totalTags = [...new Set(appreciations.flatMap(({ tags }) => tags))];

  res.status(200).json({
    success: true,
    totalTags,
  });
});

//get All Tags
exports.getAllCategories = catchAsyncErrors(async (req, res) => {
  const apiFeatures = new APIFeatures(Appreciation.find());
  const appreciations = await apiFeatures.query;
  const totalCategories = [
    ...new Set(appreciations.flatMap(({ categories }) => categories)),
  ];

  res.status(200).json({
    success: true,
    totalCategories,
  });
});

// get Appreciations by Categories
exports.getAppreciationByCategory = catchAsyncErrors(async (req, res, next) => {
  const { category } = req.params;

  const appreciations = await Appreciation.find({
    categories: { $in: category },
  });

  res.status(200).json({
    success: true,
    appreciations,
  });
});

// get Appreciations by Related Categories
exports.getAppreciationByRelatedCategory = catchAsyncErrors(
  async (req, res, next) => {
    const categories = req.body;

    const limitValue = 10;
    const skipValue = req.query.skip ? Number(req.query.skip) : 0;

    const appreciations = await Appreciation.find({
      categories: { $in: categories },
    })
      .limit(limitValue)
      .skip(skipValue);

    res.status(200).json({
      success: true,
      appreciations,
    });
  }
);

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

  if (req.body.image) {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "social-coin/appreciations/images",
    });

    req.body.image = result;
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
  const { page } = req.query;
  const limitValue = req.query.limit ? Number(req.query.limit) : 12;
  const startIndex = (Number(page) - 1) * limitValue;
  const appreciationsCount = await Appreciation.countDocuments();

  const appreciations = await Appreciation.find({
    "user.id": req.user.id,
  })
    .limit(limitValue)
    .skip(startIndex)
    .sort({ $natural: -1 });

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
    appreciationsCount,
    currentPage: Number(page),
    numberOfPages: Math.ceil(appreciationsCount / limitValue),
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

  if (req.body.image) {
    const appreciation = await Appreciation.findById(req.params.id);
    if (appreciation.image && appreciation.image.public_id) {
      const res = await cloudinary.v2.uploader.destroy(
        appreciation.image.public_id
      );
    }
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "social-coin/appreciations/images",
    });

    req.body.image = result;
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

exports.likeMyAppreciation = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  if (!req.user.id) {
    return res.json({ message: "User is not authenicated" });
  }

  const appreciation = await Appreciation.findById(req.params.id);

  const index = appreciation.likes.findIndex(
    (id) => id === String(req.user.id)
  );

  if (index === -1) {
    appreciation.likes.push(req.user.id);
    appreciation.likeCount = appreciation.likes.length;
  } else {
    appreciation.likes = appreciation.likes.filter(
      (id) => id !== String(req.user.id)
    );
    appreciation.likeCount = appreciation.likes.length;
  }

  const updatedAppreciation = await Appreciation.findByIdAndUpdate(
    id,
    appreciation,
    { new: true }
  );

  res.status(200).json({
    success: true,
    updatedAppreciation,
  });
});

exports.pushCategoryAndTags = catchAsyncErrors(async (req, res, next) => {
  const { tag, category } = req.body;

  const allAppreciations = await Appreciation.find({});

  var tagToDelete = "general";
  var categoryToDelete = "General";

  var tagPosition = allAppreciations?.tags?.indexOf(tagToDelete);
  var categoryPosition =
    allAppreciations?.categories?.indexOf(categoryToDelete);

  if (~tagPosition) Appreciation?.tags?.splice(position, 1);
  if (~categoryPosition) Appreciation?.tags?.splice(position, 1);

  const appreciations = await Appreciation.updateMany(
    {},
    {
      $push: { categories: category, tags: tag },
    }
  );

  res.status(200).json({
    tag,
    category,
    success: true,
    appreciations,
  });
});

exports.updateAllLikeCounts = catchAsyncErrors(async (req, res) => {
  const appreciations = await Appreciation.find();

  const likes = appreciations.likes.length;
  console.log(likes);

  res.status(200).json({
    success: true,
    appreciations,
  });
});

exports.createAppreciationReview = catchAsyncErrors(async (req, res, next) => {
  const { comment, id } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    profilePicture: req.user.profilePicture,
    comment,
  };

  console.log(review.user);

  const appreciation = await Appreciation.findById(id);

  console.log(appreciation);

  const isReviewed = appreciation.reviews.find(
    (r) => r?.id.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    appreciation.reviews.forEach((review) => {
      if (review?.id.toString() === req.user.id.toString()) {
        review.comment = comment;
      }
    });
  } else {
    appreciation.reviews.push(review);
    appreciation.numOfReviews = appreciation.reviews.length;
  }
  await appreciation.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    appreciation,
  });
});

// Get Appreciation Reviews   =>   /api/v1/reviews
exports.getAppreciationReviews = catchAsyncErrors(async (req, res, next) => {
  const appreciation = await Appreciation.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: appreciation.reviews,
  });
});

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const appreciation = await Appreciation.findById(req.query.appreciationid);
  const reviews = appreciation.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  await Appreciation.findByIdAndUpdate(
    req.query.appreciationid,
    {
      reviews,
      numOfReviews,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    appreciation,
  });
});

exports.deleteMyReview = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  console.log(req.user);

  if (!req.user.id) {
    return res.json({ message: "User is not authenicated" });
  }

  const appreciation = await Appreciation.findById(req.params.id);

  const reviews = appreciation.reviews.filter(
    (review) => review.name !== String(req.user.name)
  );

  const numOfReviews = reviews.length;

  await Appreciation.findByIdAndUpdate(
    id,
    {
      reviews,
      numOfReviews,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    reviews: appreciation.reviews,
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
