import { Router } from "express";
import { onlyLoggedInWeb } from "../../middlewares/authorization.js";

export const webProductsRouter = Router();

webProductsRouter.get("/products", onlyLoggedInWeb, (req, res) => {
  // Load products directly, or change it to use a database
  const products = [
    { name: "Product 1", price: 19.99 },
    { name: "Product 2", price: 29.99 },
    { name: "Product 3", price: 39.99 },
  ];
  console.log("User in session:", req.session["user"]);
  res.render("products.handlebars", {
    welcomeMessage: "Welcome",
    ...req.session["user"],
    pageTitle: "Products",
    products,
    style: "products.css",
  });
});
