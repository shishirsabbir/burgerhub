// imports
import sharp from "sharp";
import { randomUUID } from "node:crypto";

// resize burger middleware function
export const resizeImage = async (req, res, next) => {
    if (!req.files) return next();

    // create a naming slug

    // cover image processing
    if (req.files.coverImage) {
        req.body.coverImage = `cover_${randomUUID()}.webp`;

        await sharp(req.files.coverImage[0].buffer)
            .resize(800, 800)
            .toFormat("webp")
            .webp({ quality: 90 })
            .toFile(`public/img/burgers/${req.body.coverImage}`);
    }

    // other images processing
    if (req.files.images) {
        req.body.images = [];

        await Promise.all(
            req.files.images.map(async (file, i) => {
                const fileName = `image_${randomUUID()}_${i + 1}.webp`;

                await sharp(file.buffer)
                    .resize(800, 800)
                    .toFormat("webp")
                    .webp({ quality: 90 })
                    .toFile(`public/img/burgers/${fileName}`);

                req.body.images.push(fileName);
            })
        );
    }

    // calling next
    next();
};
