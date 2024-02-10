import { Router } from 'express'
import { webProductsRouter } from './products.router.js';
import { webUsersRouter } from './users.router.js';
import { sessionsRouter } from './sessions.router.js';

export const webRouter = Router()

webRouter.use(webProductsRouter);
webRouter.use(webUsersRouter);
webRouter.use(sessionsRouter);


webRouter.get('/', (req, res) => {
  if (req.session['user']) {
    res.redirect('/profile'); // If the user is logged in, redirect to /profile
  } else {
    res.redirect('/login'); // If the user is not logged in, redirect to /login
  }
});
