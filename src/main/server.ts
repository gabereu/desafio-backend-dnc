import express from "express";

const PORT = 3000;
const app = express();

app.use(express.json())
app.get("/test", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

export const server = app;