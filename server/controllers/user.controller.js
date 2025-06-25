import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "user route working fine" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update the user"));
  }

  const { username, password, email, profilePicture } = req.body;

  if (!username && !password && !email && !profilePicture) {
    return next(errorHandler(400, "User update failed"));
  }

  if (password) {
    if (password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(password, 10);
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      return next(errorHandler(400, "Invalid email address"));
    }
  }

  if (username) {
    if (username.length < 5 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 to 20 characters")
      );
    }

    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]; // e.g. 'username' or 'email'
      next(
        errorHandler(
          400,
          `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
        )
      );
    }

    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { password } = req.body;

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete the account"));
  }
  if (!password) {
     return next(errorHandler(400, "Please provide the password."));
  }
  if (password.length < 6) {
     return next(errorHandler(400, "Password must be at least 6 characters long"));
  }

  try {

    const user = await User.findById(req.params.userId);

    if (user) {
      const validPassword = bcryptjs.compareSync(password, user.password);

      if (validPassword) {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: "User has been deleted." });
      }else{
        return next(errorHandler(400, "Invalid password"));
      }
    }else {
       res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {

  if (req.user.role !== "admin") {
    return next(errorHandler(403, "Only the admins are allowed to get the user list"))
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find({})
      .sort({createdAt : sortDirection})  
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword  = users.map(user => {
      const {password, ...rest} = user._doc;
      return rest
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt : { $gte : oneMonthAgo}
    });

    res.status(200).json({
      users : usersWithoutPassword,
      totalUsers,
      lastMonthUsers
    });


  } catch (error) {
    next(error)
  }
}