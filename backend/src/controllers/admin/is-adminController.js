const isAdmin = async (req, res) => {
  try {
    res.status(200).json({ isAdmin: true, user: req.userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message || err.code });
  }
};
module.exports = { isAdmin };
