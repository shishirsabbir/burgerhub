// imports
import express from "express";
import {
    createBurger,
    deleteOneBurger,
    getAllBurgers,
    getOneBurger,
    updateOneBurger,
} from "../controllers/burgerController.js";
import upload from "../utilities/upload.js";
import { resizeImage } from "../utilities/resizeImage.js";

// burger router
const router = express.Router();

// image fields
const imageFields = [
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 3 },
];

// mount controllers
router
    .route("/")
    .get(getAllBurgers)
    .post(upload.fields(imageFields), resizeImage, createBurger);

router
    .route("/:id")
    .get(getOneBurger)
    .patch(upload.fields(imageFields), resizeImage, updateOneBurger)
    .delete(deleteOneBurger);

// exports
export default router;
