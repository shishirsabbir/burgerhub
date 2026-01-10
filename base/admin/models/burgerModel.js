// imports
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import slugify from "slugify";

// defining burger model
const Burger = sequelize.define(
    "Burger",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            set(value) {
                this.setDataValue("title", value.toLowerCase().trim());
            },
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM("beef", "chicken", "fish", "vegetable"),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: true,
                min: 0,
            },
            get() {
                const value = this.getDataValue("price");
                return value ? parseFloat(value) : 0;
            },
        },
        ingredients: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "demo_burger.jpg",
            field: "cover_image",
        },
        images: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        tags: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: false,
        },
    },
    {
        tableName: "burgers",
        indexes: [{ fields: ["category"] }, { fields: ["title"] }],
        // before save hooks for slugs
        hooks: {
            beforeSave: (burger) => {
                if (burger.title) {
                    burger.slug = slugify(burger.title, {
                        replacement: "-",
                        lower: true,
                        strict: true,
                        trim: true,
                    });
                }
            },
        },
    }
);

// exports
export default Burger;
