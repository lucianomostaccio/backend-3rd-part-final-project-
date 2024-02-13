import { usersService } from '../services/users.service.js'

// register
export async function postController(req, res, next) {
  try {
    const user = await usersService.register(req.body)
    res.result(user)
  } catch (error) {
    next(error)
  }
}

// remove
export async function deleteController(req, res, next) {
  try {
    await usersService.remove(req.params.id)
    res.deleted()
  } catch (error) {
    next(error)
  }
}