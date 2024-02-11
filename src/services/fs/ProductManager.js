const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../../../db/products.json");

class ProductManager {
  constructor() {
    this.path = filePath;
    this.loadProductsFromFile();
    this.products = [];
    this.nextId = 1;
  }
  //cargar productos desde el json
  async loadProductsFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf8");
      this.products = JSON.parse(data);
      // console.log("Productos leídos desde el json:", this.products);
      const lastProduct = this.products[this.products.length - 1];
      if (lastProduct) {
        this.nextId = lastProduct.id + 1;
      }
    } catch (err) {
      console.error("Error al cargar los productos desde el archivo:", err);
    }
  }
  //guardar todos los productos en el json
  async saveProductsToFile() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data, "utf8");
      console.log("Productos guardados en el archivo correctamente.");
    } catch (err) {
      console.error("Error al guardar los productos en el archivo:", err);
    }
  }

  //traer los productos
  getProducts() {
    return this.products;
  }

  //agregar producto
  async addProduct(productData) {
    const {
      title,
      description,
      code,
      price,
      status = true,
      stock,
      category,
      thumbnails,
    } = productData;

    if (!title && !description && !code && !price && !stock && !category) {
      console.error("Al menos un campo es obligatorio: title, description, code, price, stock, o category.");
      return;
    }

    //setear nuevo producto
    const newProduct = {
      id: this.nextId,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    this.products.push(newProduct); //pushearlo
    console.log("se acaba de agregar el producto en el array:", newProduct);
    this.nextId++; //autogenerar el id sumando 1
    await this.saveProductsToFile(); //ejecutar la función para escribir el nuevo producto en el json
  }

  //traer producto por id
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error("Producto no encontrado");
    } else {
      return product;
    }
  }

  //updatear producto obtenido con id en el paso anterior
  async updateProduct(id, updatedProduct) {
    const productToUpdate = this.getProductById(id);

    if (productToUpdate) {
      // se actualiza el producto utilizando el spread operator
      this.products = this.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      );
      await this.saveProductsToFile();
      console.log("Producto actualizado:", this.getProductById(id));
    } else {
      console.error("Producto no encontrado para actualizar");
    }
  }

  //borrar producto por id
  async deleteProduct(id) {
    const productToDelete = this.getProductById(id);
    console.log("producto a eliminar encontrado por id:", productToDelete);
    if (productToDelete) {
      // Utilizamos filter para crear un nuevo array sin el producto a eliminar
      this.products = this.products.filter((product) => product.id !== id);
      await this.saveProductsToFile();
      console.log("Producto eliminado");
    } else {
      console.error("Producto no encontrado para eliminar");
    }
  }
}

module.exports = ProductManager;
