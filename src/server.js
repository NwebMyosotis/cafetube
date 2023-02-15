import express from "express";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
