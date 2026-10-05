const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

/* =====================================================
   BUSINESS SCHEMA
===================================================== */

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    subcategory: {
      type: String,
      default: "Local Business",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: null,
    },

    whatsapp: {
      type: String,
      default: null,
    },

    website: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: "",
    },

    services: {
      type: [String],
      default: [],
    },

    emoji: {
      type: String,
      default: "🏪",
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Business = mongoose.model(
  "Business",
  businessSchema
);

/* =====================================================
   TEST ROUTE
===================================================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "ASHRAYA Business Hub Backend is running",
  });
});

/* =====================================================
   GET ALL BUSINESSES
===================================================== */

app.get("/api/businesses", async (req, res) => {
  try {
    const businesses =
      await Business.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      businesses,
    });
  } catch (error) {
    console.error(
      "GET BUSINESSES ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch businesses",
    });
  }
});

/* =====================================================
   GET SINGLE BUSINESS
===================================================== */

app.get(
  "/api/businesses/:id",
  async (req, res) => {
    try {
      const business =
        await Business.findById(
          req.params.id
        );

      if (!business) {
        return res.status(404).json({
          success: false,
          message:
            "Business not found",
        });
      }

      res.json({
        success: true,
        business,
      });
    } catch (error) {
      console.error(
        "GET BUSINESS ERROR:",
        error.message
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch business",
      });
    }
  }
);

/* =====================================================
   ADD BUSINESS
===================================================== */

app.post(
  "/api/businesses",
  async (req, res) => {
    try {
      const {
        name,
        category,
        subcategory,
        location,
        phone,
        whatsapp,
        website,
        description,
        services,
        emoji,
      } = req.body;

      if (
        !name ||
        !category ||
        !location
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Business name, category and location are required.",
        });
      }

      const newBusiness =
        new Business({
          name,
          category,
          subcategory:
            subcategory ||
            "Local Business",
          location,
          phone:
            phone || null,
          whatsapp:
            whatsapp || null,
          website:
            website || null,
          description:
            description || "",
          services:
            Array.isArray(services)
              ? services
              : [],
          emoji:
            emoji || "🏪",
          rating: 0,
          reviews: 0,
        });

      const savedBusiness =
        await newBusiness.save();

      res.status(201).json({
        success: true,
        message:
          "Business added successfully",
        business:
          savedBusiness,
      });
    } catch (error) {
      console.error(
        "CREATE BUSINESS ERROR:",
        error.message
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to add business",
      });
    }
  }
);

/* =====================================================
   DELETE BUSINESS
===================================================== */

app.delete(
  "/api/businesses/:id",
  async (req, res) => {
    try {
      const deletedBusiness =
        await Business.findByIdAndDelete(
          req.params.id
        );

      if (!deletedBusiness) {
        return res.status(404).json({
          success: false,
          message:
            "Business not found",
        });
      }

      res.json({
        success: true,
        message:
          "Business deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE BUSINESS ERROR:",
        error.message
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete business",
      });
    }
  }
);

/* =====================================================
   START SERVER
===================================================== */

async function startServer() {
  try {
    console.log(
      "Connecting to MongoDB Atlas..."
    );

    await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName:
          process.env.DATABASE_NAME ||
          "ashraya_digital_hub",
      }
    );

    console.log(
      "MongoDB Atlas connected successfully"
    );

    app.listen(PORT, () => {
      console.log(
        `ASHRAYA Backend running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "MongoDB connection failed:"
    );

    console.error(
      error.message
    );

    process.exit(1);
  }
}

startServer();