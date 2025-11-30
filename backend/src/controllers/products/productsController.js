const prisma = require("../../../prisma/prisma");

const getProducts = async (req, res) => {
  try {
    let products = await prisma.product.findMany({
      where: { inStock: true },
      include: {
        rating: {
          select: {
            createdAt: true,
            rating: true,
            review: true,
            user: { select: { username: true, image: true } },
          },
        },
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    //     remove products with store isActive false
    products = products.filter((product) => product.store.isActive);

    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.code || error.message,
    });
  }
};

module.exports = { getProducts };
