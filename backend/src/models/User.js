import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

      fullname: {
            type: String,
            required: [true, "Fullname is required"],
            trim: true
      },
      username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            unique: true
      },
      password: {
            type: String,
            required: [true, "Password is required"],
            trim: true,
            minlength: [6, "Password must be at least 6 characters long"]
      },
      notes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
      }]

}, {
      timestamps: true
})

const user = mongoose.model("User", userSchema)
export default user;