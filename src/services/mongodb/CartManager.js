const CartModel = require("../models/cartModel.js");

class CartManager {
  // Cargar carts desde la base de datos
  async loadCartsFromDatabase() {
    try {
      this.carts = await CartModel.find();
    } catch (err) {
      console.error("Error al cargar los carts desde la base de datos:", err);
    }
  }

  // Guardar todos los carts en la base de datos
  async saveCartsToDatabase() {
    try {
      await CartModel.insertMany(this.carts);
      console.log("Carts guardados en la base de datos correctamente.");
    } catch (err) {
      console.error("Error al guardar los carts en la base de datos:", err);
    }
  }

  // Agregar cart a la base de datos
  async addCart(cartData) {
    const newCart = new CartModel({
      products: [],
    });

    try {
      await newCart.save();
      console.log("Cart agregado:", newCart);
    } catch (err) {
      console.error("Error al agregar el cart en la base de datos:", err);
    }
  }

  // Obtener todos los carts
  async getCarts() {
    try {
      return await CartModel.find();
    } catch (err) {
      console.error("Error al obtener los carts desde la base de datos:", err);
      return [];
    }
  }

  // Obtener cart por ID
  async getCartById(_id) {
    try {
      return await CartModel.findById(_id);
    } catch (err) {
      console.error("Error al obtener el cart desde la base de datos:", err);
      return null;
    }
  }

  // Agregar producto a un cart específico
  async addProductToCart(cartId, productId) {
    try {
      const cartToUpdate = await CartModel.findById(cartId);

      if (cartToUpdate) {
        const productIndex = cartToUpdate.products.findIndex(
          (product) => product._id === productId
        );

        if (productIndex !== -1) {
          // Si el producto ya existe en el carrito, se incrementa la cantidad
          cartToUpdate.products[productIndex].quantity += 1;
        } else {
          // Si el producto no está en el carrito (es nuevo), se agrega con cantidad inicial=1
          cartToUpdate.products.push({
            _id: productId,
            quantity: 1,
          });
        }

        await cartToUpdate.save(); // Actualizar el cart en la base de datos con los cambios
        console.log("Producto agregado al carrito:", cartToUpdate);
      } else {
        console.error("Carrito no encontrado para agregar el producto");
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  }

  async updateCart(cartId, products) {
    try {
      const cartToUpdate = await CartModel.findById(cartId);

      if (cartToUpdate) {
        // Limpiar el carrito actual y agregar los nuevos productos
        cartToUpdate.products = products;

        await cartToUpdate.save(); // Actualizar el carrito en la base de datos con los cambios
        console.log("Carrito actualizado:", cartToUpdate);
      } else {
        console.error("Carrito no encontrado para actualizar");
      }
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }

  async removeAllProductsFromCart(cartId) {
    try {
      const cartToUpdate = await CartModel.findById(cartId);

      if (cartToUpdate) {
        // Limpiar todos los productos del carrito
        // @ts-ignore
        cartToUpdate.products = [];

        await cartToUpdate.save(); // Actualizar el carrito en la base de datos con los cambios
        console.log("Todos los productos eliminados del carrito:", cartToUpdate);
      } else {
        console.error("Carrito no encontrado para eliminar productos");
      }
    } catch (error) {
      console.error("Error al eliminar todos los productos del carrito:", error);
      throw error;
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cartToUpdate = await CartModel.findById(cartId);

      if (cartToUpdate) {
        // Filtrar los productos y eliminar el producto específico
        // @ts-ignore
        cartToUpdate.products = cartToUpdate.products.filter(product => product._id.toString() !== productId);

        await cartToUpdate.save(); // Actualizar el carrito en la base de datos con los cambios
        console.log("Producto eliminado del carrito:", cartToUpdate);
      } else {
        console.error("Carrito no encontrado para eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cartToUpdate = await CartModel.findById(cartId);

      if (cartToUpdate) {
        // Encontrar el producto específico y actualizar la cantidad
        const productToUpdate = cartToUpdate.products.find(product => product._id.toString() === productId);

        if (productToUpdate) {
          productToUpdate.quantity = quantity;
          await cartToUpdate.save(); // Actualizar el carrito en la base de datos con los cambios
          console.log("Cantidad de producto actualizada en el carrito:", cartToUpdate);
        } else {
          console.error("Producto no encontrado en el carrito para actualizar la cantidad");
        }
      } else {
        console.error("Carrito no encontrado para actualizar la cantidad del producto");
      }
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto en el carrito:", error);
      throw error;
    }
  }

  async getPopulatedCart(cartId) {
    try {
      return await CartModel.findById(cartId).populate('products._id', 'title price'); 
    } catch (error) {
      console.error("Error al obtener el carrito con productos completos:", error);
      throw error;
    }
  }
}

module.exports = CartManager;
