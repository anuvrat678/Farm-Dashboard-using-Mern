const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, "data", "farmers.json");
const categories = ["Grains", "Vegetables", "Fruits"];

// Middleware
app.use(cors());
app.use(express.json());

// Read data from JSON file
function readData() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  if (!Array.isArray(data.farmers)) {
    throw new Error("Invalid data format: farmers must be an array");
  }

  return data;
}

// Save data to JSON file
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Find a farmer by ID
function findFarmer(farmers, id) {
  return farmers.find((farmer) => String(farmer.farmerId) === String(id));
}

// Generate the next farmer ID
function nextFarmerId(farmers) {
  return Math.max(0, ...farmers.map((f) => Number(f.farmerId) || 0)) + 1;
}

// Generate the next crop ID
function nextCropId(farmers) {
  const crops = farmers.flatMap((farmer) => farmer.producedCrops || []);

  return Math.max(0, ...crops.map((crop) => Number(crop.cropId) || 0)) + 1;
}

// 1. Create a farmer
app.post("/farmers", (req, res, next) => {
  try {
    const { name, farmLocation } = req.body;
    const phone = req.body.contact?.phone ?? req.body.phone;
    const email = req.body.contact?.email ?? req.body.email;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof phone !== "string" ||
      !/^\+?\d{7,15}$/.test(phone.trim()) ||
      typeof email !== "string" ||
      !/^\S+@\S+\.\S+$/.test(email.trim())
    ) {
      return res.status(400).json({
        message: "Valid name, phone and email are required",
      });
    }

    const data = readData();

    const farmer = {
      farmerId: nextFarmerId(data.farmers),
      name: name.trim(),
      contact: {
        phone: phone.trim(),
        email: email.trim(),
      },
      farmLocation: farmLocation || "",
      producedCrops: [],
    };

    data.farmers.push(farmer);
    saveData(data);

    res.status(201).json({
      message: "Farmer created successfully",
      farmer,
    });
  } catch (error) {
    next(error);
  }
});

// 2. Get all farmers
app.get("/farmers", (req, res, next) => {
  try {
    const data = readData();

    // Return the array, not the wrapper object
    res.json(data.farmers);
  } catch (error) {
    next(error);
  }
});

// 3. Get a farmer by ID
app.get("/farmers/:farmerId", (req, res, next) => {
  try {
    const data = readData();
    const farmer = findFarmer(data.farmers, req.params.farmerId);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.json(farmer);
  } catch (error) {
    next(error);
  }
});

// 4. Add a crop to a farmer
app.post("/farmers/:farmerId/crops", (req, res, next) => {
  try {
    const {
      cropName,
      category,
      quantity,
      unit,
      pricePerUnit,
      harvestSeason,
    } = req.body;

    const validQuantity =
      quantity !== "" &&
      quantity !== undefined &&
      Number.isFinite(Number(quantity)) &&
      Number(quantity) > 0;

    const validPrice =
      pricePerUnit !== "" &&
      pricePerUnit !== undefined &&
      Number.isFinite(Number(pricePerUnit)) &&
      Number(pricePerUnit) >= 0;

    if (
      typeof cropName !== "string" ||
      !cropName.trim() ||
      !categories.includes(category) ||
      !validQuantity ||
      !validPrice ||
      (category === "Grains" &&
        (typeof harvestSeason !== "string" || !harvestSeason.trim()))
    ) {
      return res.status(400).json({
        message: "Please provide valid crop details",
      });
    }

    const data = readData();
    const farmer = findFarmer(data.farmers, req.params.farmerId);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const crop = {
      cropId: nextCropId(data.farmers),
      cropName: cropName.trim(),
      category,
      quantity: Number(quantity),
      unit: unit || "kg",
      pricePerUnit: Number(pricePerUnit),
      ...(category === "Grains" ? { harvestSeason } : {}),
    };

    farmer.producedCrops.push(crop);
    saveData(data);

    res.status(201).json({
      message: "Crop added successfully",
      crop,
      farmer,
    });
  } catch (error) {
    next(error);
  }
});

// 5. Delete a crop from a farmer
app.delete("/farmers/:farmerId/crops/:cropId", (req, res, next) => {
  try {
    const data = readData();
    const farmer = findFarmer(data.farmers, req.params.farmerId);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const cropIndex = farmer.producedCrops.findIndex(
      (crop) => String(crop.cropId) === String(req.params.cropId)
    );

    if (cropIndex === -1) {
      return res.status(404).json({ message: "Crop not found" });
    }

    farmer.producedCrops.splice(cropIndex, 1);
    saveData(data);

    res.json({ message: "Crop deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// 6. Delete a farmer
app.delete("/farmers/:farmerId", (req, res, next) => {
  try {
    const data = readData();

    const farmerIndex = data.farmers.findIndex(
      (farmer) => String(farmer.farmerId) === String(req.params.farmerId)
    );

    if (farmerIndex === -1) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    data.farmers.splice(farmerIndex, 1);
    saveData(data);

    res.json({ message: "Farmer deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error-handling middleware
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});