import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// AI Endpoint
app.post("/ai", async (req, res) => {
  const { prompt } = req.body;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    }
  );

  const data = await response.json();
  res.send({ reply: data[0].generated_text });
});

// Start Server
app.listen(10000, () => console.log("Server running on port 10000"));
