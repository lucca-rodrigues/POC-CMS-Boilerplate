import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const controller = Router();

const uploadsPath = process.env.DOCKER_ENV
  ? path.join(__dirname, "..", "..", "..", "assets", "uploads")
  : path.join(__dirname, "..", "..", "..", "..", "assets", "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

controller.post("/", upload.array("file"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  try {
    const uploadedFiles = Array.isArray(req.files) ? req.files : [req.files];
    const fileNames = uploadedFiles.map((file) => file.filename);
    return res.json({
      message: "Files uploaded successfully",
      files: fileNames,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

controller.get("/", (req, res) => {
  fs.readdir(uploadsPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).json({ message: "Erro ao listar arquivos" });
    }

    const fileDetails = files.map((file) => ({
      name: file,
      url: `http://localhost:3333/files/${file}`,
    }));

    res.json({ files: fileDetails });
  });
});

controller.delete("/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadsPath, filename);

  console.log(`Attempting to delete file at: ${filePath}`);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      if (err.code === "ENOENT") {
        return res.status(404).json({ error: "File not found" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json({ message: "File deleted successfully" });
  });
});

export default controller;
