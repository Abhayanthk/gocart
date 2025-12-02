const prisma = require("../../../prisma/prisma");

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      category = "",
      minPrice = 0,
      maxPrice = 1000000,
      sort = "newest",
      storeId,
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Build Where Clause
    const where = {
      inStock: true,
      store: {
        isActive: true,
      },
      AND: [
        {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        },
        {
          price: {
            gte: parseFloat(minPrice),
            lte: parseFloat(maxPrice),
          },
        },
      ],
    };

    if (storeId) {
      where.storeId = storeId;
    }

    if (category) {
      // Handle multiple categories if passed as comma-separated string or array
      const categories = Array.isArray(category)
        ? category
        : category.split(",").filter(Boolean);
      if (categories.length > 0) {
        where.category = { in: categories };
      }
    }

    // Build OrderBy Clause
    let orderBy = {};
    switch (sort) {
      case "price-low-high":
        orderBy = { price: "asc" };
        break;
      case "price-high-low":
        orderBy = { price: "desc" };
        break;
      case "newest":
      default:
        orderBy = { createdAt: "desc" };
        break;
    }

    // Fetch Products
    const products = await prisma.product.findMany({
      where,
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
      orderBy,
      skip,
      take: limitNumber,
    });

    // Get Total Count for Pagination
    const totalProducts = await prisma.product.count({ where });

    // Get Category Counts (Scoped to current search/store but ignoring category/price filters for broader context if desired,
    // but typically users want to see counts for the current search context.
    // Let's keep it simple and scope to the base search/store filters, but maybe ignore the category filter itself
    // so they see other available categories?)

    // For now, let's get counts for ALL categories matching the search term and store, ignoring the selected category and price.
    const categoryWhere = {
      inStock: true,
      store: { isActive: true },
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    };
    if (storeId) categoryWhere.storeId = storeId;

    const categoryGroups = await prisma.product.groupBy({
      by: ["category"],
      where: categoryWhere,
      _count: {
        category: true,
      },
    });

    const categories = categoryGroups.map((group) => ({
      category: group.category,
      count: group._count.category,
    }));

    return res.status(200).json({
      products,
      pagination: {
        total: totalProducts,
        page: pageNumber,
        pages: Math.ceil(totalProducts / limitNumber),
      },
      facets: {
        categories,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.code || error.message,
    });
  }
};

module.exports = { getProducts };
