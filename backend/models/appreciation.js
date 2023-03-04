const mongoose = require("mongoose");

//Schema for appreciation
const appreciationSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: [true, "Please provide a summary of your appreciation"],
      trim: true,
      maxLength: [200, "Please summary cannot exceed 65 characters"],
    },
    story: {
      type: String,
      required: [true, "Please write your appreciation"],
      maxLength: [3000, "Please story cannot exceed 3000 characters"],
    },
    hero: {
      type: {
        id: mongoose.Types.ObjectId,
        name: String,
        profilePicture: String,
      },
      required: true,
    },
    user: {
      type: {
        id: mongoose.Schema.ObjectId,
        name: String,
        email: String,
        profilePicture: {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
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
      type: String,
      maxLength: [200, "Please youtube video link cannot exceed 65 characters"],
    },
    tags: [
      {
        type: String,
      },
    ],
    categories: [
      {
        type: String,
      },
    ],

    comments: {
      type: {
        participants: [
          {
            userId: mongoose.Types.ObjectId,
            userName: String,
            profilePic: String,
            userEmail: String,
          },
        ],
        conversation: [
          {
            userId: mongoose.Types.ObjectId,
            comment: String,
            status: {
              likesCount: [{ type: mongoose.Types.ObjectId }],
              dislikesCount: [{ type: mongoose.Types.ObjectId }],
            },
            postedDate: Date,
            replies: [
              {
                userId: mongoose.Types.ObjectId,
                reply: String,
                status: {
                  likesCount: [{ type: mongoose.Types.ObjectId }],
                  dislikesCount: [{ type: mongoose.Types.ObjectId }],
                },
                postedDate: Date,
              },
            ],
          },
        ],
      },
      default: { participants: [], conversation: [] },
    },
    likes: {
      type: [String],
      default: [],
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
