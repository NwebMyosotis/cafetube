import "./db";
import app from "./server";

const PORT = 4000;

const handleListening = () => {
  console.log(
    `✅ 포트 http://localhost:${PORT}에서 서버가 Listening 중 입니다 🚀`
  );
};

app.listen(PORT, handleListening);
