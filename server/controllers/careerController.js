import Career from "../models/Career.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

/**
 * @route   GET /api/careers
 * @access  Public
 * Supports simple search + pagination: /api/careers?search=data&page=1&limit=10
 */
export const getCareers = asyncHandler(async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;

  const filter = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const careers = await Career.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Career.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: careers.length,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    careers,
  });
});

/**
 * @route   GET /api/careers/:id
 * @access  Public
 */
export const getCareerById = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id).populate("relatedCourses");
  if (!career) throw new ApiError(404, "Career not found");
  res.status(200).json({ success: true, career });
});

/**
 * @route   POST /api/careers
 * @access  Private/Admin
 */
export const createCareer = asyncHandler(async (req, res) => {
  const career = await Career.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, message: "Career created", career });
});

/**
 * @route   PUT /api/careers/:id
 * @access  Private/Admin
 */
export const updateCareer = asyncHandler(async (req, res) => {
  const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!career) throw new ApiError(404, "Career not found");
  res.status(200).json({ success: true, message: "Career updated", career });
});

/**
 * @route   DELETE /api/careers/:id
 * @access  Private/Admin
 */
export const deleteCareer = asyncHandler(async (req, res) => {
  const career = await Career.findByIdAndDelete(req.params.id);
  if (!career) throw new ApiError(404, "Career not found");
  res.status(200).json({ success: true, message: "Career deleted" });
});
