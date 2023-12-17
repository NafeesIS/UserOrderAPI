import cors from "cors";
import express, { Application, Request, Response } from "express";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: "Welcome Server is running",
    });
});

export default app;