const authAdmin = async (email) => {
      try{
            if(!email) return false;
            return process.env.ADMIN_ID.split(",").includes(email);
      }catch(err){
            console.log(err);
            return false;
      }
}
export default authAdmin;