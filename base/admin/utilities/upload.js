// imports
import multer from "multer";
import AppError from "./AppError.js";

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(
            new AppError("not an image! please upload a image file", 400),
            false
        );
    }
};

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: multerFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// exports
export default upload;
