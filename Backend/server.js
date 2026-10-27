const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Farmer = require("./models/Farmer");

const app = express();
const PORT = process.env.PORT || 3000;

// Application-level middleware
app.use(cors());
app.use(express.json());

// Generate the next farmer ID
async function getNextFarmerId() {
  const farmer = await Farmer.findOne().sort({ farmerId: -1 });

  return farmer ? farmer.farmerId + 1 : 1;
}

// Generate the next crop ID
async function getNextCropId() {
  const result = await Farmer.aggregate([
    { $unwind: "$producedCrops" },
    {
      $group: {
        _id: null,
        maxId: { $max: "$producedCrops.cropId" },
      },
    },
  ]);

  return result.length > 0 ? result[0].maxId + 1 : 1;
}

// 1. Add a farmer
app.post("/farmers", async (req, res) => {
  try {
    const { name, contact, farmLocation } = req.body;

    if (
      !name ||
      !contact?.phone ||
      !contact?.email ||
      !farmLocation
    ) {
      return res.status(400).json({
        message: "Name, phone, email and location are required",
      });
    }

    const farmer = await Farmer.create({
      farmerId: await getNextFarmerId(),
      name,
      contact,
      farmLocation,
      producedCrops: [],
    });

    res.status(201).json({
      message: "Farmer added successfully",
      farmer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 2. Get all farmers
app.get("/farmers", async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Get a specific farmer
app.get("/farmers/:farmerId", async (req, res) => {
  try {
    const farmer = await Farmer.findOne({
      farmerId: Number(req.params.farmerId),
    });

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.json(farmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Update a farmer
app.put("/farmers/:farmerId", async (req, res) => {
  try {
    const { name, contact, farmLocation } = req.body;

    const farmer = await Farmer.findOne({
      farmerId: Number(req.params.farmerId),
    });

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    if (name !== undefined) farmer.name = name;
    if (farmLocation !== undefined) farmer.farmLocation = farmLocation;

    if (contact?.phone !== undefined) {
      farmer.contact.phone = contact.phone;
    }

    if (contact?.email !== undefined) {
      farmer.contact.email = contact.email;
    }

    await farmer.save();

    res.json({
      message: "Farmer updated successfully",
      farmer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 5. Add a crop to a farmer
app.post("/farmers/:farmerId/crops", async (req, res) => {
  try {
    const farmer = await Farmer.findOne({
      farmerId: Number(req.params.farmerId),
    });

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const crop = {
      cropId: await getNextCropId(),
      ...req.body,
    };

    farmer.producedCrops.push(crop);
    await farmer.save();

    res.status(201).json({
      message: "Crop added successfully",
      farmer,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 6. Get all crops of a farmer
app.get("/farmers/:farmerId/crops", async (req, res) => {
  try {
    const farmer = await Farmer.findOne({
      farmerId: Number(req.params.farmerId),
    });

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.json(farmer.producedCrops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 7. Delete a specific crop
app.delete(
  "/farmers/:farmerId/crops/:cropId",
  async (req, res) => {
    try {
      const farmer = await Farmer.findOne({
        farmerId: Number(req.params.farmerId),
      });

      if (!farmer) {
        return res.status(404).json({ message: "Farmer not found" });
      }

      const crop = farmer.producedCrops.find(
        (item) => item.cropId === Number(req.params.cropId)
      );

      if (!crop) {
        return res.status(404).json({ message: "Crop not found" });
      }

      farmer.producedCrops.pull(crop._id);
      await farmer.save();

      res.json({ message: "Crop deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// 8. Delete a farmer
app.delete("/farmers/:farmerId", async (req, res) => {
  try {
    const farmer = await Farmer.findOneAndDelete({
      farmerId: Number(req.params.farmerId),
    });

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.json({ message: "Farmer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 9. Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// 10. Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); 
  });
 