// orders.controller.js

import { ordersService } from "../services/orders.service.js";

export async function createOrder(req, res, next) {
  try {
    // Lógica para crear una nueva orden
    const orderData = {
      products: req.session.cart.products, // Suponiendo que el carrito está almacenado en la sesión
      totalPrice: req.session.cart.totalPrice, // Suponiendo que el carrito tiene un precio total
      // Otros datos relevantes de la orden
    };

    const order = await ordersService.create(orderData);
    
    // Lógica para limpiar el carrito después de completar la orden
    req.session.cart = null; // Suponiendo que el carrito está almacenado en la sesión

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}
