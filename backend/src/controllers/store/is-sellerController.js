// Auth Seller
async function isSeller(req, res) {
  try {
    const { storeInfo } = req;
    return res.status(200).json({ storeInfo, isSeller: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message || err.code,
    });
  }
}

module.exports = { isSeller };
