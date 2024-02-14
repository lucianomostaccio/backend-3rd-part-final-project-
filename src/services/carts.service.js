// import { Cart } from "../../models/carts.model.js";
import { getDaoCarts } from "../daos/carts/carts.dao.js";

const cartsDao = getDaoCarts();

class CartsService {
  // Load carts from the database
  async loadCartsFromDatabase() {
    return await cartsDao.readMany();
  }

  // Save all carts to the database
  async saveCartsToDatabase() {
    try {
      await cartsDao.insertMany();
      console.log("Carts saved to the database successfully.");
    } catch (err) {
      console.error("Error saving carts to the database:", err);
    }
  }

  // Add cart to the database
  async addCart(cartData) {
    return await cartsDao.create(cartData);
  }

  // Get cart by ID
  async getCartById(_id) {
    return await cartsDao.readOne({ _id });
  }

  // Add product to a specific cart
  async addProductToCart(cartId, productId) {
    const cart = await cartsDao.readOne({ _id: cartId });

    if (!cart) {
      console.error("Cart not found to add the product");
      return null;
    }

    const productIndex = cart.products.findIndex(
      (product) => product._id === productId
    );

    if (productIndex !== -1) {
      // If the product already exists in the cart, increment the quantity
      cart.products[productIndex].quantity += 1;
    } else {
      // If the product is not in the cart (new), add it with initial quantity=1
      cart.products.push({
        _id: productId,
        quantity: 1,
      });
    }

    await cartsDao.updateOne({ _id: cartId }, cart);
    console.log("Product added to the cart:", cart);
    return cart;
  }

  // Rest of the methods of CartsService using cartsDao
}

export const cartsService = new CartsService();
