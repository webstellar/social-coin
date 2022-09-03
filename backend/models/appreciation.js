const mongoose = require("mongoose");

//Schema for appreciation
const appreciationSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: [true, "Please provide a summary of your appreciation"],
      trim: true,
      maxLength: [200, "Please sumary cannot exceed 65 characters"],
    },
    story: {
      type: String,
      required: [true, "Please write your appreciation"],
      maxLength: [3000, "Please summary cannot exceed 3000 characters"],
    },
    hero: {
      type: {
        id: mongoose.Types.ObjectId,
        name: String,
      },
      required: true,
    },
    user: {
      type: {
        id: mongoose.Schema.ObjectId,
        name: String,
        profilePicture: { 
          public_id: {
            type: String,
          },
          url: {
            type: String,
          }
        },
      },
      ref: "User",
      required: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    video: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tags: [
      {
        type: String,
      },
    ],
    comments: {
      type: {
        participants: [{
          userId: mongoose.Types.ObjectId,
          userName: String,
          profilePic: String,
        }],
        conversation: [{
          userId: mongoose.Types.ObjectId,
          comment: String,
          status: { likesCount: [{ type: mongoose.Types.ObjectId }], dislikesCount: [{ type: mongoose.Types.ObjectId }] },
          postedDate: Date,
          replies: [{
            userId: mongoose.Types.ObjectId,
            reply: String,
            status: { likesCount: [{ type: mongoose.Types.ObjectId }], dislikesCount: [{ type: mongoose.Types.ObjectId }] },
            postedDate: Date,
          }],
        }]
      },
      default: { participants: [], conversation: [] }
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    yearOfAppreciation: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appreciation", appreciationSchema);
