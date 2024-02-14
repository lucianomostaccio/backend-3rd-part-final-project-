// import { Product } from "../../models/products.model.js";
import { getDaoProducts } from "../daos/products/products.dao.js";

const productsDao = getDaoProducts();

class ProductsService {
  // Load products from the database
  async loadProductsFromDatabase() {
    return await productsDao.readMany();
  }

  async addProduct(data) {
    return await productsDao.create(data);
  }

  // Get product by ID
  async getProductById(_id) {
    return await productsDao.readOne({ _id });
  }

  // Update product by ID
  async updateProduct(_id, updatedProduct) {
    try {
      const productToUpdate = await productsDao.readOne({ _id });

      if (!productToUpdate) {
        console.error("Product not found for update");
        return null;
      }

      Object.assign(productToUpdate, updatedProduct);

      await productsDao.updateOne({ _id }, productToUpdate);
      console.log("Product updated:", productToUpdate);
      return productToUpdate;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  // Delete product by ID
  async deleteProduct(_id) {
    try {
      const deletedProduct = await productsDao.deleteOne({ _id });

      if (deletedProduct) {
        console.log("Product deleted:", deletedProduct);
        return deletedProduct;
      } else {
        console.error("Product not found for deletion");
        return null;
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}

export const productsService = new ProductsService();
