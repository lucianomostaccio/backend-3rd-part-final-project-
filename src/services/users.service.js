// import { User } from "../../models/users.model.js";
import { getDaoUsers } from "../daos/users/users.dao.js";

const usersDao = getDaoUsers();

class UsersService {
  // Load users from the database
  async loadUsersFromDatabase() {
    return await usersDao.readMany();
  }

  async addUser(data) {
    return await usersDao.create(data);
  }

  // Get user by ID
  async getUserById(_id) {
    return await usersDao.readOne({ _id });
  }

  // Update user by ID
  async updateUser(_id, updatedUser) {
    try {
      const userToUpdate = await usersDao.readOne({ _id });

      if (!userToUpdate) {
        console.error("User not found for update");
        return null;
      }

      Object.assign(userToUpdate, updatedUser);

      await usersDao.updateOne({ _id }, userToUpdate);
      console.log("User updated:", userToUpdate);
      return userToUpdate;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  // Delete user by ID
  async deleteUser(_id) {
    try {
      const deletedUser = await usersDao.deleteOne({ _id });

      if (deletedUser) {
        console.log("User deleted:", deletedUser);
        return deletedUser;
      } else {
        console.error("User not found for deletion");
        return null;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

export const usersService = new UsersService();
