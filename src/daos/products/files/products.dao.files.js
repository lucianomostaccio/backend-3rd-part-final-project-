import fs from "fs/promises";
import { matches } from "../../utils.js";

export class ProductsDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readProducts() {
    return JSON.parse(await fs.readFile(this.path, "utf-8"));
  }

  async #writeProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async create(productPojo) {
    const products = await this.#readProducts();
    products.push(productPojo);
    await this.#writeProducts(products);
    return productPojo;
  }

  async readOne(query) {
    const products = await this.#readProducts();
    const searched = products.find(matches(query));
    return searched;
  }

  async readMany(query) {
    const products = await this.#readProducts();
    const manySearched = products.filter(matches(query));
    return manySearched;
  }

  async updateOne(query, data) {
    const products = await this.#readProducts();
    const index = products.findIndex(matches(query));
    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      await this.#writeProducts(products);
      return products[index];
    }
    throw new Error("Product not found");
  }

  async updateMany(query, data) {
    const products = await this.#readProducts();
    const updatedProducts = products.map((product) => {
      if (matches(query)(product)) {
        return { ...product, ...data };
      }
      return product;
    });
    await this.#writeProducts(updatedProducts);
    return updatedProducts;
  }

  async deleteOne(query) {
    const products = await this.#readProducts();
    const index = products.findIndex(matches(query));
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      await this.#writeProducts(products);
      return deletedProduct;
    }
    throw new Error("Product not found");
  }

  async deleteMany(query) {
    const products = await this.#readProducts();
    const remainingProducts = products.filter(
      (product) => !matches(query)(product)
    );
    const deletedProducts = products.filter((product) =>
      matches(query)(product)
    );
    await this.#writeProducts(remainingProducts);
    return deletedProducts;
  }
}
