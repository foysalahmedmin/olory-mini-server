import express from "express";
import auth from "../../middlewares/auth.middleware";
import file from "../../middlewares/file.middleware";
import validation from "../../middlewares/validation.middleware";
import * as ProductControllers from "./product.controller";
import * as ProductValidations from "./product.validation";

const router = express.Router();

router.get("/", ProductControllers.getProducts);

router.get("/:id", ProductControllers.getProduct);

router.post(
  "/",
  auth("admin"),
  validation(ProductValidations.productSchema),
  file({
    name: "thumbnail",
    folder: "thumbnails",
  }),
  ProductControllers.createProduct,
);

router.patch(
  "/:id",
  auth("admin"),
  validation(ProductValidations.productSchema.partial()),
  ProductControllers.updateProduct,
);

router.delete("/:id", auth("admin"), ProductControllers.deleteProduct);

export default router;
