const ProductModel = require("../models/productModel.js");

class ProductManager {
  //load products from db
  async loadProductsFromDatabase() {
    try {
      this.products = await ProductModel.find();
    } catch (err) {
      console.error(
        "Error al cargar los productos desde la base de datos:",
        err
      );
    }
  }

  //save all products in DB
  async saveProductsToDatabase() {
    try {
      await ProductModel.insertMany(this.products);
      console.log("Productos guardados en la base de datos correctamente.");
    } catch (err) {
      console.error("Error al guardar los productos en la base de datos:", err);
    }
  }

  //gather all products from DB
  async getProducts(options, searchQuery, sort) {
    try {
      // @ts-ignore
      const products = await ProductModel.paginate(searchQuery, {
        ...options,
        sort: sort,
      });
      console.log(products)
      return products;
    } catch (err) {
      console.error("Error al obtener los productos desde la base de datos:", err);
      return [];
    }
  }

  //add product to DB
  async addProduct(productData) {
    const newProduct = new ProductModel(productData);

    try {
      await newProduct.save();
      console.log(
        "Se acaba de agregar el producto en la base de datos:",
        newProduct
      );
    } catch (err) {
      console.error("Error al agregar el producto en la base de datos:", err);
    }
  }

  //traer producto por id
  async getProductById(_id) {
    try {
      return await ProductModel.findById(_id).lean();
    } catch (err) {
      console.error(
        "Error al obtener el producto desde la base de datos:",
        err
      );
      return null;
    }
  }

  //updatear producto obtenido con id en el paso anterior
  async updateProduct(_id, updatedProduct) {
    try {
      const productToUpdate = await ProductModel.findById(_id);

      if (productToUpdate) {
        // Actualizar el producto utilizando el método save de Mongoose
        Object.assign(productToUpdate, updatedProduct);
        await productToUpdate.save();

        console.log("Producto actualizado:", productToUpdate);
      } else {
        console.error("Producto no encontrado para actualizar");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  //borrar producto por id
  async deleteProduct(_id) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(_id);

      if (deletedProduct) {
        console.log("Producto eliminado:", deletedProduct);
      } else {
        console.error("Producto no encontrado para eliminar");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }
}

module.exports = ProductManager;
