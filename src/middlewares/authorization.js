export function onlyLoggedInRest(req, res, next) {
  if (!req.session['user']) {
    return res
      .status(403)
      .json({
        status: 'error',
        message: 'You do not have permissions to see this. Only logged users are allowed.'
      })
  }
  next()
}

export function onlyLoggedInWeb(req, res, next) {
  if (!req.session['user']) {
    return res.redirect('/login')
  }
  next()
}