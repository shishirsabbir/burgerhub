// imports
import express from "express";
import morgan from "morgan";
import burgerRouter from "./routers/burgerRouter.js";
import cors from "cors";

// express app
const app = express();

// middleware stack
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// allowing all connection for development
app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000', // Your Next.js dev server
//     methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
//     credentials: true // Required if you decide to use cookies/sessions later
// }));

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
