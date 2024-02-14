import { productsService } from "../services/products.service.js";

export async function getController(req, res, next) {
  try {
    // const product = await productsService.getProducts()
    const product = await productsService.readMany({});
    res.result(product);
  } catch (error) {
    next(error);
  }
}

export async function postController(req, res, next) {
  try {
    const product = await productsService.addProduct(req.body);
    res.created(product);
  } catch (error) {
    next(error);
  }
}

export async function putController(req, res, next) {
  try {
    const productId = req.params.productId;
    const updatedProduct = await productsService.updateProduct(
      productId,
      req.body
    );
    res.result(updatedProduct);
  } catch (error) {
    next(error);
  }
}

export async function deleteController(req, res, next) {
  try {
    const product = await productsService.deleteProduct(req.body);
    res.delete(product);
  } catch (error) {
    next(error);
  }
}

// export async function putController(req, res, next) {
//   try {
//     const product = await productsService.updateProduct(req.body)
//     res.delete(product)
//   } catch (error) {
//     next(error)
//   }
// }
