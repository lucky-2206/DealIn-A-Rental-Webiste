 // We use multer to upload images
 const multer = require("multer");
const uploadController = require("express").Router();

//destination -> where the image will be saved
//fileName -> where will be the name of the saved image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename);
    },
});

const upload = multer({
    storage: storage,
});

//upload.single("image") is going to check in the req.body for the req.body.image
uploadController.post("/image", upload.single("image"), async (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});

module.exports = uploadController