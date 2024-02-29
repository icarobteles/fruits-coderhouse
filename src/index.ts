import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/db";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/fruits", (req: Request, res: Response) => {
  res.status(200).json(db.fruits);
});

app.get("/fruits/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  const fruit = db.fruits.find(
    (fruit) => fruit.name.toLowerCase() === name.toLowerCase()
  );
  if (fruit) {
    res.status(200).json(fruit);
  } else {
    res.status(404).json({ message: "Fruta não encontrada" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
