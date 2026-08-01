import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
} from "../utils/generateTokens.js";

/**
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are all required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const user = await User.create({ name, email, password });

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  setRefreshTokenCookie(res, refreshToken);

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/**
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // .select("+password") because the schema hides password by default
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  setRefreshTokenCookie(res, refreshToken);

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/**
 * @route   POST /api/auth/refresh
 * @access  Public (requires valid refreshToken cookie)
 * Issues a new access token without requiring the user to log in again.
 */
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    throw new ApiError(401, "No refresh token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== token) {
    throw new ApiError(401, "Refresh token is invalid or expired");
  }

  const newAccessToken = generateAccessToken(user._id, user.role);

  res.status(200).json({ success: true, accessToken: newAccessToken });
});

/**
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (token) {
    await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: "" });
  }
  res.clearCookie("refreshToken");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

/**
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

/**
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});
