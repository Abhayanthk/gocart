const prisma = require("../../../prisma/prisma");
const { getUserData } = require("../../utilities/getUserData");

// Add new Address
const addAddress = async (req, res) => {
  try {
    const userData = getUserData(req);
    const { address } = req.body;

    //     save the cart in the database
    address.userId = userData.id.toString();
    const newAddress = await prisma.address.create({
      data: address,
    });
    return res
      .status(200)
      .json({ message: "Address added successfully", newAddress });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.code || error.message,
    });
  }
};

// get all addAddress

const getAllAddress = async (req, res) => {
  try {
    const userData = getUserData(req);

    //     save the cart in the database
    const addresses = await prisma.address.findMany({
      where: { userId: userData.id.toString() },
    });
    return res.status(200).json({ addresses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.code || error.message,
    });
  }
};

module.exports = { addAddress, getAllAddress };
