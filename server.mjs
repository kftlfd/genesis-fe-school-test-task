// @ts-check
import express from "express";

const app = express();
const host = process.env.HOST || "localhost";
const port = (() => {
  const envPort = Number(process.env.PORT);
  return !isNaN(envPort) ? envPort : 3000;
})();

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "./dist" });
});

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
