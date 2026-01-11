// imports
import fs from "fs/promises";
import path from "path";

// cleanup function
export const deleteBurgerFiles = async (filenames) => {
    // ensure input is an array
    const files = Array.isArray(filenames) ? filenames : [filenames];

    const deletePromises = files.map(async (file) => {
        if (!file || file == "demo_burger.jpg") return;

        const filePath = path.join("public/img/burgers", file);

        try {
            await fs.unlink(filePath);
        } catch (err) {
            console.error(`filed to delete file ${file}`, err.message);
        }
    });

    Promise.all(deletePromises);
};
