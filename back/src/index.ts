import cors from "cors";
import { AppDataSource } from "data-source";
import dotenv from "dotenv";
import express, { Express } from "express";
import path from "path";
import userRouter from "modules/users/user.controller";
import filesRouter from "modules/files/files.controller";
import pagesRouter from "modules/pages/pages.controller";
import settingsRouter from "modules/settings/settings.controller";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const uploadsPath = process.env.DOCKER_ENV
  ? path.join(__dirname, "..", "assets", "uploads")
  : path.join(__dirname, "..", "..", "assets", "uploads");

app.use("/api", userRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/pages", pagesRouter);

app.use("/files", express.static(uploadsPath));

app.use("/api/files", filesRouter);

app.use("/", (req, res) => {
  res.json({ message: "Api Status Ok" });
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data source has been initialized!");
    const PORT = process.env.PORT || 3333;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      // console.log(`Uploads directory: ${uploadsPath}`);
    });
  })
  .catch((error) => console.log(error));

export default app;
