//IMPORTACIONES
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./src/routes/index.js";

//BASE DE DATOS
import { startDB } from "./src/config/database.js";
startDB();

const app = express();
const PORT = process.env.PORT;

//MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());

//RUTAS
app.use("/api", routes);

//LEVANTAMIENTO DEL SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
