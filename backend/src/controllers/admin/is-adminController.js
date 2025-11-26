// Auth Amdin 
async function isAdmin(req, res){
      try{
            return res.status(200).json({ isAdmin: true });
      }catch(err){
            console.log(err);
            return res.status(400).json({ error: err.code || err.message });
      }     
}
module.exports = { isAdmin };
