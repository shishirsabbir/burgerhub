// imports
import express from "express";
import morgan from "morgan";
import burgerRouter from "./routers/burgerRouter.js";

// express app
const app = express();

// middleware stack
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json()); // for json data
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // for form data
app.use(express.static("public")); // static public directory

// mounting routers
app.use("/api/v1/burgers", burgerRouter);

// test route
app.get("/test", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Hello World",
    });
});

// exports
export default app;
