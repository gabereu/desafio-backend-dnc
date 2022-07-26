import express from "express";

const app = express();

app.use(express.json())
app.get("/test", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

export const server = app;