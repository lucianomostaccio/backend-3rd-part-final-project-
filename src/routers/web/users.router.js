import { Router } from "express";
import { onlyLoggedInWeb } from "../../middlewares/authorization.js";
import { usersManager } from "../../dao/models/User.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config/config.js";
export const webUsersRouter = Router();

webUsersRouter.get("/register", (req, res) => {
  if (!req.session["user"]) {
    // Only show the registration view if the user is not logged in
    res.render("register.handlebars", {
      pageTitle: "Register",
      style: "register.css",
    });
  } else {
    res.redirect("/products"); // Redirect the user to the products view if already logged in
  }
});

webUsersRouter.get("/profile", onlyLoggedInWeb, async (req, res) => {
    try {
      // Fetch the latest user data from the database using the user's email
      const updatedUser = await usersManager.findOne(
        { email: req.session["user"].email },
        { password: 0 }
      ).lean();

      // @ts-ignore
      updatedUser.role = (updatedUser.email === ADMIN_EMAIL && updatedUser.password === ADMIN_PASSWORD) ? "admin" : "user";
      
      // @ts-ignore
      // Update the profile picture path to use forward slashes instead of backslashes
      const normalizedImagePath = updatedUser.profile_picture.replace(/\\/g, '/');

      // Generate complete url for profile image and remove "src/static/" from it
      // @ts-ignore
      updatedUser.fullImageUrl = `http://localhost:8080/${normalizedImagePath.replace('src/static/', '')}`;

      // @ts-ignore
      console.log('Image path:', updatedUser.fullImageUrl);
  
      // Update the session data with the latest user information
      req.session["user"] = updatedUser;
  
      // Render the profile page with the updated user data
      res.render("profile.handlebars", {
        pageTitle: "Profile",
        ...updatedUser,
        style: "profile.css",
      });
    } catch (error) {
      // Handle errors, e.g., log the error and render an error page
      console.error("Error fetching updated user data:", error);
      res.status(500).render("error.handlebars", { pageTitle: "Error" });
    }
});
  

webUsersRouter.get("/edit", onlyLoggedInWeb, (req, res) => {
  res.render("profileEdit.handlebars", {
    pageTitle: "Edit your profile",
    ...req.session["user"],
    style: "profile.css",
  });
});

webUsersRouter.get("/resetpass", (req, res) => {
  if (!req.session["user"]) {
    res.render("resetpass.handlebars", {
      pageTitle: "Reset Password",
      style: "resetpass.css",
    }); // Only show the reset password view if the user is not logged in
  } else {
    res.redirect("/products"); // Redirect the user to the products view if already logged in
  }
});
