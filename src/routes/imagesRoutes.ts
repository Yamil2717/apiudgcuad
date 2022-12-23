import { Router } from "express";
import { Response } from "../lib/tools";
import {
  upload,
  uploadImage,
  getImage,
  deleteImage,
} from "../controllers/imagesController";
const response = new Response();
const router = Router();

router.post("/:type/upload", upload().array("picture", 4), uploadImage);
router.get("/:type/:fileName", getImage);
router.delete("/:type/:fileName", deleteImage);
router.use((err: any, req: any, res: any, next: any) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return response.error(
      res,
      "La imagen o imágenes no pueden superar el tamaño de 4MB cada una."
    );
  }
});

export default router;
