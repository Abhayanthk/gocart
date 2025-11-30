const prisma = require("../../../prisma/prisma");
const { getUserData } = require("../../utilities/getUserData");

const updateCart = async (req, res) => {
  try {
    const userData = getUserData(req);
    const { cart } = req.body;

    //     save the cart in the database

    await prisma.user.update({
      where: { id: userData.id.toString() },
      data: { cart },
    });

    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.code || error.message,
    });
  }
};

// get user Cart

const getUserCart = async (req, res) => {
  try {
    const userData = getUserData(req);

    //     save the cart in the database

    const user = await prisma.user.findUnique({
      where: { id: userData.id.toString() },
    });

    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.code || error.message,
    });
  }
};

module.exports = { updateCart, getUserCart };
