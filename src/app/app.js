// server

import express from "express";
import { apiRouter } from "../routers/api/apirest.router.js";
import { sessions } from "../middlewares/sessions.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import passport from "passport";
import initializePassport from "../config/passport.config.js";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static"))); //specify static folder
app.use(sessions);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// routers
app.use("/api/", apiRouter);
app.use(cookieParser());
