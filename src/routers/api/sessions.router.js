//login
import { Router } from "express";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../config/config.js";
import passport from "passport";
import { onlyLoggedInRest } from "../../middlewares/authorization.js";
// import { usersManager } from "../../dao/models/User.js";
// import { isValidPassword } from "../../utils/hashing.js";

export const sessionsRouter = Router();

sessionsRouter.get("/github", passport.authenticate("github",{scope: ['user:email']}),async (req, res) => {});

sessionsRouter.get("/githubcallback", passport.authenticate("github", { 
  // successRedirect: "/",
  failureRedirect: "/login" 
}), async (req, res) => {
  req.session["user"] = req.user;
  res.redirect("/");
});

sessionsRouter.post("/", passport.authenticate('login'), async (req, res) => {
  if(!req.user) return res.status(401).json({status:"error"});
  // @ts-ignore
  req.session["user"]= {
    // @ts-ignore
    first_name: req.user.first_name,
    // @ts-ignore
    last_name: req.user.last_name,
    // @ts-ignore
    email: req.user.email,
    // @ts-ignore
    age: req.user.age,
    // @ts-ignore
    profile_picture: req.user.profile_picture,
    // @ts-ignore
    role: req.user.email === ADMIN_EMAIL && req.user.password === ADMIN_PASSWORD ? "admin" : "user"
  };

  res.status(201).json({
    status: "success",
    payload: req.session["user"],
    message: "Login successful"
  });
})

sessionsRouter.get('/current', onlyLoggedInRest, (req, res) => {
  res.json(req.user)
})

sessionsRouter.delete("/current", async (req, res) => {
  // @ts-ignore
  req.session.destroy((err) => {
    res
      .status(204)
      .json({ status: "success", message: "session closed sucessfully" });
  });
});
