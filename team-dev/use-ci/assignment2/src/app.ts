import express from "express";
import { Task } from "./models/Task";

const app = express();
app.use(express.json());

// 課題一覧を取得するエンドポイント
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default app;
