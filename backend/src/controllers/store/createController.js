const { imagekit } = require("../../../config/imageKit");
const { getUserData } = require("../../utilities/getUserData");
const prisma = require("../../../prisma/prisma");

async function createStore(req, res) {
  try {
    const userData = await getUserData(req);
    // Collect, store, and send key–value pairs (like form inputs) in HTTP requests — including file uploads.
    const { name, username, description, email, contact, address } = req.body;
    const image = req.file;
    if (
      !name ||
      !username ||
      !description ||
      !email ||
      !contact ||
      !address ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const store = await prisma.store.findUnique({
      where: {
        userId: userData.id.toString(),
      },
    });
    if (store) {
      return res.status(400).json({ message: "Store already exists" });
    }

    let fileData;
    if (image.buffer) {
      fileData = image.buffer.toString("base64");
    } else if (image.path) {
      fileData = fs.readFileSync(image.path).toString("base64");
    } else {
      return res.status(400).json({ message: "Image file data missing" });
    }

    const response = await imagekit.files.upload({
      file: fileData, // Send as Base64
      fileName: image.originalname,
      folder: "/stores", // Optional: nice to organize your files
    });
    console.log("ImageKit Upload Response:", response);

    // Optional: You can store the raw URL (response.url) or the transformed one.
    // Storing the transformed one (like you did) is fine:
    const optimizedImage = imagekit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        {
          quality: "auto",
          width: 512,
          format: "webp", // Modern format
        },
      ],
    });

    const newStore = await prisma.store.create({
      data: {
        userId: userData.id.toString(),
        name,
        description,
        username: username.toLowerCase(),
        email,
        contact,
        address,
        logo: optimizedImage,
      },
    });
    await prisma.user.update({
      where: {
        id: userData.id.toString(),
      },
      data: {
        store: { connect: { id: newStore.id } },
      },
    });
    return res.status(200).json({
      message: "Applied, waiting for approval",
      store: newStore,
    });
  } catch (err) {
    console.log(err);
    if (err.code === "P2002") {
      return res.status(400).json({ message: "username already taken" });
    }
    return res
      .status(500)
      .json({ err: err.code || err.message || "Internal server error" });
  }
}

async function getStore(req, res) {
  const userData = await getUserData(req);
  try {
    const store = await prisma.store.findUnique({
      where: {
        userId: userData.id.toString(),
      },
    });
    if (store) return res.status(200).json({ status: store.status, store });
    return res.status(200).json({ status: "not registered" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ err: err.code || err.message || "Internal server error" });
  }
}

module.exports = {
  createStore,
  getStore,
};
