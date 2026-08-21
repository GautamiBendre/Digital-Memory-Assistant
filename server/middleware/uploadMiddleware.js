import multer from "multer";
import path from "path";

// Store uploaded file temporarily in memory
const storage = multer.memoryStorage();

// Allowed file extensions
const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf"];

// File validation
const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPG, JPEG, PNG and PDF files are allowed."),
      false
    );
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

export default upload;