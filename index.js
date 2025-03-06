import cors from 'cors';
import express from 'express';
import geminiRoutes from "./routes/geminiRoutes.js";

const app = express();

const port = 3000;	

app.use(cors());
app.use(express.json());
app.use("/api", geminiRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});