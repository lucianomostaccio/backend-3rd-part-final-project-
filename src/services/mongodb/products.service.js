import { getDaoProducts } from "../../daos/products/products.dao.js";
import { Product } from "../../models/products.model.js";

const productsDao = getDaoProducts();

class ProductsService {
  //load products from db
  async loadProductsFromDatabase() {
    try {
      this.products = await Product.find();
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
      await Product.insertMany(this.products);
      console.log("Productos guardados en la base de datos correctamente.");
    } catch (err) {
      console.error("Error al guardar los productos en la base de datos:", err);
    }
  }

  //gather all products from DB
  async getProducts(options, searchQuery, sort) {
    try {
      // @ts-ignore
      const products = await Product.paginate(searchQuery, {
        ...options,
        sort: sort,
      });
      console.log(products);
      return products;
    } catch (err) {
      console.error(
        "Error al obtener los productos desde la base de datos:",
        err
      );
      return [];
    }
  }

  //add product to DB
  async addProduct(productData) {
    const newProduct = new Product(productData);

    try {
      savedProduct = await productsDao.create(newProduct.toPOJO());
      return savedProduct;
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
      return await Product.findById(_id).lean();
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
      const productToUpdate = await Product.findById(_id);

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
      const deletedProduct = await Product.findByIdAndDelete(_id);

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

export const productsService = new ProductsService();
