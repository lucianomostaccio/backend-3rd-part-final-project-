const express = require("express");
const router = express.Router();
const CartManager = require("../dao/services/CartManager");

const cartManager = new CartManager();

// Rutas para manejo de carts

// Agregar un nuevo cart
router.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    res.status(201).json({ message: "Cart added successfully" });
  } catch (error) {
    console.error("Error adding cart", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Obtener un cart por ID (sin populate)
router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId);

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).send("Cart not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Obtener el carrito con productos completos usando populate
router.get("/:cid/populated", async (req, res) => {
  try {
    const cartId = req.params.cid;

    const populatedCart = await cartManager.getPopulatedCart(cartId);

    res.json({ status: "success", payload: populatedCart });
  } catch (error) {
    console.error("Error al obtener el carrito con productos completos:", error);
    res.status(500).json({ status: "error", error: "Error interno del servidor" });
  }
});


// Actualizar el carrito con un arreglo de productos
router.put("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body;

    await cartManager.updateCart(cartId, products);
    
    res.json({ status: "success", message: "Carrito actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
    res.status(500).json({ status: "error", error: "Error interno del servidor" });
  }
});

// Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    await cartManager.removeAllProductsFromCart(cartId);
    
    res.json({ status: "success", message: "Todos los productos eliminados del carrito" });
  } catch (error) {
    console.error("Error al eliminar todos los productos del carrito:", error);
    res.status(500).json({ status: "error", error: "Error interno del servidor" });
  }
});

// Agregar a un cart específico un producto
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const prodId = req.params.pid;

    await cartManager.addProductToCart(cartId, prodId);
    res.json({
      message: "Success. If cart exists, product has been added",
    });
  } catch (error) {
    console.error("Error adding the product in the cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Eliminar un producto específico del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    await cartManager.removeProductFromCart(cartId, productId);
    
    res.json({ status: "success", message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);
    res.status(500).json({ status: "error", error: "Error interno del servidor" });
  }
});

// Actualizar la cantidad de ejemplares de un producto en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    await cartManager.updateProductQuantity(cartId, productId, quantity);
    
    res.json({ status: "success", message: "Cantidad de producto actualizada en el carrito" });
  } catch (error) {
    console.error("Error al actualizar la cantidad del producto en el carrito:", error);
    res.status(500).json({ status: "error", error: "Error interno del servidor" });
  }
});

module.exports = router;
