import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/cafetube");

const db = mongoose.connection;
const handleError = (error) => console.log("DB Error", error);
db.on("error", handleError);
const handleOpen = () => console.log("✅ Connected to DB 🗂️");
db.once("open", handleOpen);
