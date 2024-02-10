// server
import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";

import { MONGODB_CNX_STR, PORT } from "./config/config.js";
import { apiRouter } from "./routes/api/apirest.router.js";
import { webRouter } from "./routes/web/web.router.js";
import { sessions } from "./middlewares/sessions.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import initializeGithubPassport from "./config/githubpassport.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// initialize server
// @ts-ignore
await mongoose.connect(MONGODB_CNX_STR);
console.log(`connected to DB: "${MONGODB_CNX_STR}"`);

export const app = express();

app.listen(PORT, () => {
  console.log(`Server listening in port: ${PORT}`);
});

// handlebars engine & templates:
app.engine("handlebars", engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static"))); //specify static folder
app.use(sessions);
initializePassport();
initializeGithubPassport();
app.use(passport.initialize());
app.use(passport.session());

// routers
app.use("/", webRouter);
app.use("/api/", apiRouter);
app.use(cookieParser());




