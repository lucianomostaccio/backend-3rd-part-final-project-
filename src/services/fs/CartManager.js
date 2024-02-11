const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../../../db/carts.json");

class CartManager {
  constructor() {
    this.path = filePath;
    this.carts = [];
    this.nextId = 1;
    this.loadCartsFromFile();
  }
  //cargar carts desde el json
  async loadCartsFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf8");
      this.carts = JSON.parse(data);
      // console.log("carts leídos desde el json:", this.carts);
      const lastCart = this.carts[this.carts.length - 1];
      if (lastCart) {
        this.nextId = lastCart.id + 1;
      }
    } catch (err) {
      console.error("Error al cargar los carts desde el archivo:", err);
    }
  }
  //guardar todos los carts en el json
  async saveCartsToFile() {
    try {
      const data = JSON.stringify(this.carts, null, 2);
      await fs.promises.writeFile(this.path, data, "utf8");
      console.log("Carts guardados en el archivo correctamente.");
    } catch (err) {
      console.error("Error al guardar los carts en el archivo:", err);
    }
  }
  //agregar cart
  async addCart(cartData) {
    const newCart = {
      id: this.nextId,
      products: [],
    };
    //requerimientos:
    // if (!products) {
    //   console.error(
    //     "Los campos son obligatorios: array de products."
    //   );
    //   return;
    // }
    this.carts.push(newCart); 
    this.nextId++; //autogenerar el id sumando 1
    await this.saveCartsToFile(); //ejecutar la función para escribir el nuevo cart en el json
    console.log("Cart agregado:", newCart);
  }

  //traer todos los carts 
    getCarts() {
      return this.carts;
    }

  //traer cart por id
  getCartById(id) {
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) {
      console.error("Cart no encontrado");
    } else {
      return cart;
    }
  }

  //updatear cart obtenido con id en el paso anterior
  async addProductToCart(cartId, productId) {
    const cartToUpdate = this.getCartById(cartId);

    if (cartToUpdate) {
      const productIndex = cartToUpdate.products.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        // si el producto ya existe en el carrito, se incrementa la cantidad
        cartToUpdate.products[productIndex].quantity += 1;
      } else {
        // sl el producto no está en el carrito (es nuevo), se agrega con cantidad inicial=1
        cartToUpdate.products.push({
          id: productId,
          quantity: 1,
        });
      }
      await this.saveCartsToFile();
      console.log("Producto agregado al carrito:", this.getCartById(cartId));
    } else {
      console.error("Carrito no encontrado para agregar el producto");
    }
  }
}

module.exports = CartManager;
