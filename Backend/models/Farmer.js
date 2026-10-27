const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\+?\d{7,15}$/, "Enter a valid phone number"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address"],
    },
  },
  { _id: false }
);

const cropSchema = new mongoose.Schema(
  {
    cropId: {
      type: Number,
      required: [true, "Crop ID is required"],
      min: [1, "Crop ID must be a positive number"],
    },
    cropName: {
      type: String,
      required: [true, "Crop name is required"],
      trim: true,
      minlength: [1, "Crop name cannot be empty"],
    },
    category: {
      type: String,
      required: [true, "Crop category is required"],
      enum: {
        values: ["Grains", "Vegetables", "Fruits"],
        message: "Category must be Grains, Vegetables, or Fruits",
      },
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0.000001, "Quantity must be greater than zero"],
    },
    unit: {
      type: String,
      required: [true, "Unit is required"],
      trim: true,
      default: "kg",
    },
    pricePerUnit: {
      type: Number,
      required: [true, "Price per unit is required"],
      min: [0, "Price per unit cannot be negative"],
    },
    harvestSeason: {
      type: String,
      trim: true,
      required: function () {
        return this.category === "Grains";
      },
    },
  },
  { _id: false }
);

const farmerSchema = new mongoose.Schema(
  {
    // Numeric IDs are retained for compatibility with the previous practical/API.
    farmerId: {
      type: Number,
      required: true,
      unique: true,
      min: [1, "Farmer ID must be a positive number"],
    },
    name: {
      type: String,
      required: [true, "Farmer name is required"],
      trim: true,
      minlength: [1, "Farmer name cannot be empty"],
    },
    contact: {
      type: contactSchema,
      required: [true, "Contact details are required"],
    },
    farmLocation: {
      type: String,
      trim: true,
      default: "",
    },
    producedCrops: {
      type: [cropSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farmer", farmerSchema);
