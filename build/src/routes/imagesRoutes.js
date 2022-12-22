"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tools_1 = require("../lib/tools");
const imagesController_1 = require("../controllers/imagesController");
const response = new tools_1.Response();
const router = (0, express_1.Router)();
router.post("/:type/upload", (0, imagesController_1.upload)().array("picture", 4), imagesController_1.uploadImage);
router.get("/:type/:fileName", imagesController_1.getImage);
router.delete("/:type:/fileName", imagesController_1.deleteImage);
router.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return response.error(res, "La imagen o imágenes no pueden superar el tamaño de 4MB cada una.");
    }
});
exports.default = router;
