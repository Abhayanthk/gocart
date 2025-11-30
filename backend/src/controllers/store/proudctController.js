const { authSeller } = require("../../middlewares/authSeller");
const { imagekit } = require("../../../config/imageKit");
const { getUserData } = require("../../utilities/getUserData");
const prisma = require("../../../prisma/prisma");

// Add new Product
async function addProduct(req, res) {
  try {
    // get storeId from authSeller middleware
    const { storeId } = req;
    if (!storeId) {
      return res.status(401).json({ error: "not authorized" });
    }
    // get the data from the form
    const { name, description, category } = req.body;
    const mrp = Number(req.body.mrp);
    const price = Number(req.body.price);
    const images = req.files;

    if (
      !name ||
      !description ||
      !mrp ||
      !price ||
      !category ||
      !images ||
      images.length === 0
    ) {
      return res.status(400).json({
        error: "Please provide all required fields",
      });
    }
    //uploading images to imageKit
    const imagesurl = await Promise.all(
      images.map(async (image) => {
        const fileData = image.buffer.toString("base64");
        const response = await imagekit.files.upload({
          file: fileData,
          fileName: image.originalname,
          folder: "products",
        });

        const url = imagekit.helper.buildSrc({
          urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
          src: response.filePath,
          transformation: [
            { quality: "auto" },
            { format: "webp" },
            { width: "1024" },
          ],
        });
        return url;
      })
    );
    await prisma.product.create({
      data: {
        name,
        description,
        mrp,
        price,
        category,
        images: imagesurl,
        storeId,
      },
    });
    return res.status(201).json({
      message: "Product added successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.code || err.message,
    });
  }
}

// get all proudcts for a seller
async function getProducts(req, res) {
  try {
    const storeId = req.storeId;
    const products = await prisma.product.findMany({
      where: {
        storeId,
      },
    });
    return res.status(200).json({ products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.code || err.message,
    });
  }
}

module.exports = { addProduct, getProducts };
