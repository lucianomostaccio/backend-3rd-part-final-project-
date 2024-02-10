import { Router } from "express";

export const sessionsRouter = Router();

sessionsRouter.get("/login", (req, res) => {
  if (!req.session["user"]) {
    // Only show the login view if the user is not logged in
    res.render("login.handlebars", { pageTitle: "Login", style: "login.css" });
  } else {
    res.redirect("/products"); // Redirect the user to the products view if already logged in
  }
});
