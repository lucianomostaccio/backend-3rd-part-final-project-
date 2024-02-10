const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/services/ProductManager");
const productManager = new ProductManager();
const ProductModel = require("../dao/models/productModel.js")

// Rutas para manejo de productos

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort === "desc" ? -1 : 1;
    const query = req.query.query || {};


    const options = {
      page,
      limit,
    };

    // Construir objeto de búsqueda para aplicar el filtro
    const searchQuery = {
      $or: [
        { category: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ],
    };


    // Realizar la búsqueda y aplicar paginación
    const result = await productManager.getProducts(options, searchQuery, sort);

    console.log(result.docs);
  

    const totalPages = result.totalPages;
    const hasPrevPage = result.hasPrevPage;
    const hasNextPage = result.hasNextPage;
    const prevLink = hasPrevPage ? `/products?page=${page - 1}&limit=${limit}` : null;
    const nextLink = hasNextPage ? `/products?page=${page + 1}&limit=${limit}` : null;

    res.json({
      status: "success",
      data:{
        payload: result.docs,
        totalPages,
        prevPage: page - 1,
        nextPage: page + 1,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      }
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


  //   const products = await productManager.getProducts();
  //   if (!isNaN(limit)) {
  //     res.json(products.slice(0, limit));
  //   } else {
  //     res.json(products);
  //   }
  // } catch (error) {
  //   console.error("Error al obtener los productos:", error);
  //   res.status(500).json({ error: "Error interno del servidor" });
  // }
// });

// Obtener un producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  const productData = req.body;
  try {
    await productManager.addProduct(productData);
    res.status(201).json({ message: "Producto agregado exitosamente" });
    console.log("Producto agregado:", productData);
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar un producto por ID
router.put("/:pid", async (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  try {
    await productManager.updateProduct(productId, updatedProduct);
    res.json({
      message: "Producto actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar un producto por ID
router.delete("/:pid", async (req, res) => {
  const productId = req.params.pid;
  try {
    await productManager.deleteProduct(productId);
    res.json({
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
