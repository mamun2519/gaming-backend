const Reacharge = require("../model/recahrgeModel");
const User = require("../model/userModel");
const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");

exports.reahargeRequrest = async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
    folder: "products",
    width: 700,
    crop: "scale",
  });

  const { password, PayId, email , RechargeAmoun } = req.body;

  const userExist = await User.findOne({ email });
  if (!userExist)
    return res.status(202).send({ success: false, message: "User Not Found!" });

  console.log(password);
  // compare password
  const matchPassword = await bcrypt.compare(password, userExist.password);
  if (!matchPassword)
    return res
      .status(202)
      .send({ success: false, message: "Please Valid Password" });

  await Reacharge.create({
    PayId,
    email,
    RechargeAmoun,
    images: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.send({ success: true, message: "Recharge Request Successfull" });
};

exports.allReachrgeRequst = async (req, res, next) => {
  const reachrge = await Reacharge.find();
  res.send({ success: true, reachrge });
};

exports.userReachrge = async (req, res, next) => {
  const { email , amount, id, status } = req.body;
  await Reacharge.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  const user = await User.findOne({ email });
  if (!user) {
    res.send({ success: false, message: "User Not Found" });
  }
  user.balance = parseInt(user?.balance) + amount;
  await user.save();

  res.send({ success: true, message: "User Reachrge Successfull" });
};