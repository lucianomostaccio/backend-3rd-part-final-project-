import { usersService } from "../services/users.service.js";

export async function getController(req, res, next) {
  try {
    // const user = await usersService.getUsers()
    const user = await usersService.readMany({});
    res.result(user);
  } catch (error) {
    next(error);
  }
}

// register
export async function postController(req, res, next) {
  try {
    const user = await usersService.register(req.body);
    res.result(user);
  } catch (error) {
    next(error);
  }
}

//update
export async function putController(req, res, next) {
  try {
    const userId = req.params.userId;
    const updatedUser = await usersService.updateUser(userId, req.body);
    res.result(updatedUser);
  } catch (error) {
    next(error);
  }
}

// remove
export async function deleteController(req, res, next) {
  try {
    await usersService.remove(req.params.id);
    res.deleted();
  } catch (error) {
    next(error);
  }
}
