// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();

/* =====================
   DB
===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(() => console.log("⚠️ MongoDB not connected (continuing)"));

const app = express();

/* =====================
   MIDDLEWARE
===================== */
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
    createParentPath: true,
  })
);

/* =====================
   STATIC FILES (GLB SAFE)
===================== */
app.use(
  "/avatars",
  express.static(path.join(__dirname, "avatar"), {
    setHeaders(res, filePath) {
      if (filePath.endsWith(".glb")) {
        res.setHeader("Content-Type", "model/gltf-binary");
      }
    },
  })
);

app.use("/clothes", express.static(path.join(__dirname, "clothes")));
app.use("/avatar/photos", express.static(path.join(__dirname, "avatar/photos")));
app.use(
  "/avatars/cached",
  express.static(path.join(__dirname, "public/avatars/cached"))
);


/* =====================
   ROUTES (REQUIRED)
===================== */
const authRoutes = require("./routes/authRoutes");
const patternRoutes = require("./routes/patternRoutes");
const avatarRoutes = require("./routes/avatarRoutes");
const designRoutes = require("./routes/designRoutes");
const customizeRoutes = require("./routes/customizeRoutes");
const tryonRoutes = require("./routes/tryonRoutes");
const aiOutfitRoutes = require("./routes/aiOutfitRoutes"); // 🔑 FIX

/* =====================
   ROUTE MOUNTS
===================== */
app.use("/api/patterns", patternRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patterns", patternRoutes);
app.use("/api/avatar", avatarRoutes);
app.use("/api/outfits", designRoutes);
app.use("/api/customize", customizeRoutes);
app.use("/api/tryon", tryonRoutes);
app.use("/api/ai", aiOutfitRoutes); // 🔑 FIX (404 resolved)

/* =====================
   HEALTH
===================== */
app.get("/", (_, res) => {
  res.send("ANSUIYA backend running");
});

/* =====================
   START
===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
