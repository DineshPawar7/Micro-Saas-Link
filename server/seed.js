const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
require("dotenv").config();


const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("Test123", 10);
  const user = new User({ email: "intern@dacoid.com", password: hashedPassword });

  await user.save();
  console.log("Hardcoded user created.");
  process.exit();
};

seed();
