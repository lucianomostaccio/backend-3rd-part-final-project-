// import { Order } from "../../models/orders.model.js";
import { getDaoOrders } from "../daos/orders/orders.dao.js";

const ordersDao = getDaoOrders();

class OrdersService {
  // Load orders from the database
  async loadOrdersFromDatabase() {
    return await ordersDao.readMany();
  }

  async addOrder(data) {
    return await ordersDao.create(data);
  }

  // Get order by ID
  async getOrderById(_id) {
    return await ordersDao.readOne({ _id });
  }

  // Update order by ID
  async updateOrder(_id, updatedOrder) {
    try {
      const orderToUpdate = await ordersDao.readOne({ _id });

      if (!orderToUpdate) {
        console.error("Order not found for update");
        return null;
      }

      Object.assign(orderToUpdate, updatedOrder);

      await ordersDao.updateOne({ _id }, orderToUpdate);
      console.log("Order updated:", orderToUpdate);
      return orderToUpdate;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }

  // Delete order by ID
  async deleteOrder(_id) {
    try {
      const deletedOrder = await ordersDao.deleteOne({ _id });

      if (deletedOrder) {
        console.log("Order deleted:", deletedOrder);
        return deletedOrder;
      } else {
        console.error("Order not found for deletion");
        return null;
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  }
}

export const ordersService = new OrdersService();
