import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    email: {
      type: String,
      required: true,
      trim: true, // Remove whitespace from both ends
      lowercase: true, // Convert to lowercase
      unique: true, // Ensure email is unique
      match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/, // Basic email validation regex
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length of 6 characters
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);
export default User;
