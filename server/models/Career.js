import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Career title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    industry: {
      type: String,
      required: true,
    },
    averageSalary: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
    },
    requiredSkills: [{ type: String, trim: true }],
    growthOutlook: {
      type: String,
      enum: ["declining", "stable", "growing", "high-growth"],
      default: "stable",
    },
    roadmapSteps: [
      {
        title: String,
        description: String,
        order: Number,
      },
    ],
    relatedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    icon: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Auto-generate a URL-friendly slug from the title before saving
careerSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
  next();
});

const Career = mongoose.model("Career", careerSchema);

export default Career;
