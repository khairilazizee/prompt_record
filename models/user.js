import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter email address"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Please enter username"],
    matched: [/.+@.+\..+/, "Please enter valid email address"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
