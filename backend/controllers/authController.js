const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { sendGeneralNotifiation } = require("../microservices/email.service");

const axios = require("axios");

// urls
const urlToGetUserEmail =
  "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))";
const urlToGetLinkedInAccessToken =
  "https://www.linkedin.com/oauth/v2/accessToken";

exports.updateFCMToken = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  user.fcmToken = req.body.FCMToken;
  await user.save();
  res.status(201).json({
    success: true,
  });
});

/**
 * Get access token from LinkedIn
 * @param code returned from step 1
 * @returns accessToken if successful or null if request fails
 */
async function getUserFromLinkedin(code) {
  let accessToken = null;
  const parameters = {
    grant_type: "authorization_code",
    code: code,
    state: 123456,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };
  const access_config = {
    headers: { "Content-Type": "x-www-form-urlencoded" },
    params: parameters,
  };
  let userProfile = {};
  try {
    const res_token = await axios.post(
      urlToGetLinkedInAccessToken,
      {},
      access_config
    );
    accessToken = res_token.data["access_token"];
    const res_profile = await axios.get(
      `https://api.linkedin.com/v2/me?oauth2_access_token=${accessToken}`
    );
    userProfile.firstName = res_profile.data["localizedFirstName"];
    userProfile.lastName = res_profile.data["localizedLastName"];
    userProfile.id = res_profile.data["id"];
    const email_config = {
      headers: {
        oauth2_access_token: `Bearer ${accessToken}`,
      },
    };
    const res_email = await axios.get(
      `${urlToGetUserEmail}&oauth2_access_token=${accessToken}`,
      {},
      email_config
    );
    userProfile.email = res_email.data.elements[0]["handle~"].emailAddress;
  } catch (err) {
    return { error: true, response: "failed to fetch linkedin profile" };
  }
  return { error: false, response: userProfile };
}

exports.authenticateViaLinkedIn = catchAsyncErrors(async (req, res, next) => {
  const code = req.body.code;
  console.log(code);
  const response = await getUserFromLinkedin(code);
  if (response.error) {
    return next(
      new ErrorHandler("Unable to fetch profile data from linkedin"),
      400
    );
  } else {
    const userProfile = response.response;
    try {
      const user = await User.findOne({ email: userProfile.email });
      if (user) {
        user.socialHandles["linkedinId"] = userProfile.id;
        await user.save();
        sendToken(user, 200, res);
      } else {
        const newUser = await User.create({
          name: `${userProfile.firstName} ${userProfile.lastName}`,
          email: userProfile.email,
          socialHandles: { linkedinId: userProfile.id },
        });
        sendToken(newUser, 201, res);
      }
    } catch (error) {
      console.log(error);
      return next(
        new ErrorHandler(
          "Sorry!!, Maybe you already have an account with this email"
        ),
        400
      );
    }
  }
});

exports.authenticateViaGoogle = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (!user.profilePicture.url) {
      const result = await cloudinary.v2.uploader.upload(
        req.body.profilePicture,
        {
          folder: "social-coin/user_avatar",
          width: 150,
          crop: "scale",
        }
      );
      user.profilePicture = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    user.socialHandles["googleId"] = req.body.googleId;
    await user.save();
    sendToken(user, 200, res);
  } else {
    const result = await cloudinary.v2.uploader.upload(
      req.body.profilePicture,
      {
        folder: "social-coin/user_avatar",
        width: 150,
        crop: "scale",
      }
    );

    const { name, email, googleId } = req.body;
    const newUser = await User.create({
      name,
      email,
      profilePicture: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      socialHandles: { googleId: googleId },
    });
    await sendGeneralNotifiation(
      email,
      name,
      `Hey ${name}, your account on Social Coin is created successfully`
    );
    sendToken(newUser, 201, res);
  }
});

//Register  user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  /*
  const result = await cloudinary.v2.uploader.upload(req.body.profilePicture, {
    folder: "social-coin/user_avatar",
    width: 150,
    crop: "scale",
  } 
  
  profilePicture: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  */

  const { name, email, password } = req.body;

  console.log(req.body);
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });
  await sendGeneralNotifiation(
    email,
    name,
    `Hey ${name}, your account on Social Coin is created successfully`
  );

  sendToken(user, 200, res);
});

//Login User =>/api/v1/login/
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  //Finding user in DB
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("This account doesn't exist, please register"),
      401
    );
  }

  //Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password doesn't match"), 401);
  }

  sendToken(user, 200, res);
});

// Forgot Password   =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  /* const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`; */

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    // await sendEmail({
    //   email: user.email,
    //   subject: "Social Coin Password Recovery",
    //   message,
    // });
    await sendGeneralNotifiation(
      user.email,
      user.name,
      message,
      "Password Recovery"
    );

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update / Change password   =>  /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar
  if (req.body.profilePicture !== "") {
    const user = await User.findById(req.user.id);

    const image_id = user.profilePicture.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(
      req.body.profilePicture,
      {
        folder: "social-coin/user_avatar",
        width: 150,
        crop: "scale",
      }
    );

    newUserData.profilePicture = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    //useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.clearCookie("FCMToken");
  console.log(res);
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Admin Routes

// Get all users   =>   /api/v1/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile   =>   /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete user   =>   /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  // Remove avatar from cloudinary
  const image_id = user.profilePicture.public_id;
  await cloudinary.v2.uploader.destroy(image_id);

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
});
