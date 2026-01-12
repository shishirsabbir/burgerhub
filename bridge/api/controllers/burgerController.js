// imports
import Burger from "../models/burgerModel.js";
import { normalizeArray } from "../utilities/helperFunctions.js";
import { deleteBurgerFiles } from "../utilities/imageCleanUp.js";
import AppError from "./../utilities/AppError.js";

// burger controllers
export const createBurger = async (req, res) => {
    const newBurger = await Burger.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        ingredients: normalizeArray(req.body.ingredients),
        coverImage: req.body.coverImage,
        images: req.body.images,
        tags: normalizeArray(req.body.tags),
    });

    res.status(201).json({
        status: "success",
        data: {
            burger: newBurger,
        },
    });
};

export const getAllBurgers = async (req, res) => {
    const burgers = await Burger.findAll();

    res.status(200).json({
        status: "success",
        results: burgers.length,
        data: {
            burgers,
        },
    });
};

export const getOneBurger = async (req, res) => {
    const burger = await Burger.findByPk(req.params.id);

    if (!burger) {
        throw new AppError("burger not found with that ID", 404);
    }

    res.status(200).json({
        status: "success",
        data: {
            burger,
        },
    });
};

export const updateOneBurger = async (req, res) => {
    const burger = await Burger.findByPk(req.params.id);

    if (!burger) {
        throw new AppError("burger not found with that ID", 404);
    }

    if (req.files?.images && req.files.images.length !== 3) {
        return res.status(400).json({
            status: "fail",
            message:
                "provide all three burger images, single image replacement is not allowed",
        });
    }

    // Normalize Text Arrays using your utility
    req.body.ingredients = normalizeArray(req.body.ingredients);
    req.body.tags = normalizeArray(req.body.tags);

    // Cleanup & Replace Cover Image
    if (req.body.coverImage) {
        await deleteBurgerFiles(burger.coverImage);
    }

    // 4. Cleanup & Replace Gallery
    // if req.body.images exists, it has length 3
    if (req.body.images && req.body.images.length === 3) {
        await deleteBurgerFiles(burger.images);
    } else {
        // If no new images were processed/uploaded, ensure we don't overwrite
        // the existing images with whatever might be in req.body
        delete req.body.images;
    }

    await burger.update(req.body);

    res.status(200).json({
        status: "success",
        data: {
            burger,
        },
    });
};

export const deleteOneBurger = async (req, res) => {
    const burger = await Burger.findByPk(req.params.id);

    if (!burger) {
        throw new AppError("burger not found with that ID", 404);
    }

    // clean up files
    await deleteBurgerFiles([burger.coverImage, ...burger.images]);

    await burger.destroy();

    res.status(200).json({
        status: "success",
        message: "burger with that ID has been deleted",
    });
};
