import express from "express";
import morgan from "morgan";
import session from "express-session";
import { localLoggedIn } from "./middleware";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
  })
); //세션미들웨어 생성: 미들웨어가 사이트로 들어오는 모든것 (로그인 여부 관계없이)을 기억하게 됨 (쿠키 텍스트를 통해서?) -> 새로고침 할 때마다 같은 쿠키를 준다?

app.use(localLoggedIn);
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
