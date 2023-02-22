import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
const handleError = (error) => console.log("DB Error", error);
db.on("error", handleError);
const handleOpen = () => console.log("✅ Connected to DB 🗂️");
db.once("open", handleOpen);
