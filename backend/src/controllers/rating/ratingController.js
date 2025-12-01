// Add new Rating

const prisma = require("../../../prisma/prisma");
const { getUserData } = require("../../utilities/getUserData");

const addRating = async (req, res) => {
  try {
    const { orderId, productId, rating, review } = req.body;
    const userData = getUserData(req);
    const userId = userData.id.toString();
    const order = await prisma.order.findUnique({
      where: { id: orderId, userId },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    const isAlreadyRated = await prisma.rating.findFirst({
      where: { productId, orderId },
    });
    if (isAlreadyRated) {
      return res
        .status(400)
        .json({ error: "You have already rated this product" });
    }
    const response = await prisma.rating.create({
      data: { userId, productId, rating, review, orderId },
    });
    return res
      .status(200)
      .json({ message: "Rating added successfully", rating: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.code || error.message });
  }
};

// get all rating for a user
const getAllRating = async (req, res) => {
  try {
    const userData = getUserData(req);
    const userId = userData?.id?.toString();
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const response = await prisma.rating.findMany({
      where: { userId },
    });
    return res
      .status(200)
      .json({ message: "Rating fetched successfully", ratings: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.code || error.message });
  }
};
module.exports = { addRating, getAllRating };
