const prisma = require("../../prisma/prisma");


const authSeller = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { store: true },
    });
    if (!user) return false;
    
    if (user.store) {
      if (user.store.status === "approved") {
        return user.store.id;
      } else {
        return false;
      }
    }
    return false;
  } catch (err) {
    console.log(err, "error from authSeller");
    return false;
  }
};
module.exports = { authSeller };