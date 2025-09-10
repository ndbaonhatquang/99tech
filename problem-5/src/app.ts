import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { resourceRouter } from "./modules/resources/index.ts";
import { errorHandler } from "./shared/middleware/validate.ts";
import { initDataSource } from "./databases/data-source.ts";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/resources", resourceRouter());

app.use(errorHandler);

export default app;

// Bootstrap server here (moved from index.ts)
const PORT = Number(process.env.PORT) || 3000;

initDataSource()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize data source", err);
    process.exit(1);
  });
