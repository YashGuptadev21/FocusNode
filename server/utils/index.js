import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });

  // Change sameSite from strict to none when you deploy your app
  res.cookie("token", token, {
    secure: true,
    sameSite: "None", //prevent CSRF attack
    maxAge: 90 * 24 * 60 * 60 * 1000, //90 day

  });
  console.log("Cookie Set in Response" , res.getHeaders()["set-cookie"])
};
