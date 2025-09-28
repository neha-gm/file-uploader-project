const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Storage setup (files saved locally in "uploads/")
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ url: `http://localhost:5000/uploads/${req.file.filename}` });
});

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
