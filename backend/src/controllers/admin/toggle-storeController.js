const prisma = require("../../../prisma/prisma");
// Toggle Store IsActive
async function toggleStore(req, res) {
  try {
    const { storeId } = req.body;
    if (!storeId) {
      return res.status(400).json({ error: "StoreId is required" });
    }
//     find the Store by StoreId
    const store = await prisma.store.findUnique({
      where:{id:storeId},
    })
    if(!store){
      return res.status(404).json({error:"Store not found"});
    }
    await prisma.store.update({
      where:{id:storeId},
      data:{isActive: !store.isActive}
    })
    return res.status(200).json({ message:"Store status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      { error: error.code || error.message }
    );
  }
}
module.exports = { toggleStore };