import { cartsService } from "../services/carts.service.js";

export async function getController(req, res, next) {
  try {
    // const cart = await cartsService.getCarts()
    const cart = await cartsService.readMany({});
    res.result(cart);
  } catch (error) {
    next(error);
  }
}

export async function postController(req, res, next) {
  try {
    const cart = await cartsService.addCart(req.body);
    res.created(cart);
  } catch (error) {
    next(error);
  }
}

export async function putController(req, res, next) {
  try {
    const { cartId } = req.params;
    const updatedCart = await cartsService.updateCart(cartId, req.body);
    res.result(updatedCart);
  } catch (error) {
    next(error);
  }
}

export async function deleteController(req, res, next) {
  try {
    const cart = await cartsService.deleteCart(req.body);
    res.delete(cart);
  } catch (error) {
    next(error);
  }
}

// Agregar un nuevo cart
// router.post("/", async (req, res) => {
//   try {
//     await cartManager.addCart();
//     res.status(201).json({ message: "Cart added successfully" });
//   } catch (error) {
//     console.error("Error adding cart", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Obtener un cart por ID (sin populate)
// router.get("/:cid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const cart = await cartManager.getCartById(cartId);

//     if (cart) {
//       res.json(cart);
//     } else {
//       res.status(404).send("Cart not found");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });

// // Obtener el carrito con productos completos usando populate
// router.get("/:cid/populated", async (req, res) => {
//   try {
//     const cartId = req.params.cid;

//     const populatedCart = await cartManager.getPopulatedCart(cartId);

//     res.json({ status: "success", payload: populatedCart });
//   } catch (error) {
//     console.error("Error al obtener el carrito con productos completos:", error);
//     res.status(500).json({ status: "error", error: "Error interno del servidor" });
//   }
// });

// // Actualizar el carrito con un arreglo de productos
// router.put("/:cid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const products = req.body;

//     await cartManager.updateCart(cartId, products);

//     res.json({ status: "success", message: "Carrito actualizado correctamente" });
//   } catch (error) {
//     console.error("Error al actualizar el carrito:", error);
//     res.status(500).json({ status: "error", error: "Error interno del servidor" });
//   }
// });

// // Eliminar todos los productos del carrito
// router.delete("/:cid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;

//     await cartManager.removeAllProductsFromCart(cartId);

//     res.json({ status: "success", message: "Todos los productos eliminados del carrito" });
//   } catch (error) {
//     console.error("Error al eliminar todos los productos del carrito:", error);
//     res.status(500).json({ status: "error", error: "Error interno del servidor" });
//   }
// });

// // Agregar a un cart específico un producto
// router.post("/:cid/product/:pid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const prodId = req.params.pid;

//     await cartManager.addProductToCart(cartId, prodId);
//     res.json({
//       message: "Success. If cart exists, product has been added",
//     });
//   } catch (error) {
//     console.error("Error adding the product in the cart:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Eliminar un producto específico del carrito
// router.delete("/:cid/products/:pid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const productId = req.params.pid;

//     await cartManager.removeProductFromCart(cartId, productId);

//     res.json({ status: "success", message: "Producto eliminado del carrito" });
//   } catch (error) {
//     console.error("Error al eliminar el producto del carrito:", error);
//     res.status(500).json({ status: "error", error: "Error interno del servidor" });
//   }
// });

// // Actualizar la cantidad de ejemplares de un producto en el carrito
// router.put("/:cid/products/:pid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const productId = req.params.pid;
//     const quantity = req.body.quantity;

//     await cartManager.updateProductQuantity(cartId, productId, quantity);

//     res.json({ status: "success", message: "Cantidad de producto actualizada en el carrito" });
//   } catch (error) {
//     console.error("Error al actualizar la cantidad del producto en el carrito:", error);
//     res.status(500).json({ status: "error", error: "Error interno del servidor" });
//   }
// });

// router.post("/:cid/purchase", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const cart = await cartManager.getCartById(cartId);
//     const productsToPurchase = cart.products;
//     const failedProducts = [];

//     // Validar stock de productos
//     for (const product of productsToPurchase) {
//       const productStock = await productManager.getProductStockById(product.productId);
//       if (productStock < product.quantity) {
//         failedProducts.push(product.productId);
//       }
//     }

//     // Si hay productos sin stock, no se realiza la compra
//     if (failedProducts.length > 0) {
//       res.status(400).json({
//         status: "error",
//         message: "No se pudo realizar la compra",
//         failedProducts,
//       });
//       return;
//     }

//     // Restar stock de productos comprados
//     for (const product of productsToPurchase) {
//       await productManager.updateProductStockById(product.productId, product.quantity);
//     }

//     // Generar ticket
//     const ticket = await ticketManager.createTicket(cart);

//     // Eliminar del carrito los productos comprados
//     await cartManager.removeAllProductsFromCart(cartId);

//     res.status(200).json({
//       status: "success",
//       message: "Compra realizada exitosamente",
//       ticket,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: "error", error: "Error interno del servidor" });
//   }
// });

// module.exports = router;
