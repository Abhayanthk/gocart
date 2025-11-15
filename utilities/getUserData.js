const {cookies} = require("next/headers");
const jwt = require("jsonwebtoken");

export const getUserData = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if(!token){
        return {message:"Unauthorized", status:401};
    }
    try{
    const decodedToken = jwt.verify(token.value, process.env.JWT_SECRET);
    return decodedToken;
    }catch(err){
        console.log(err);
        return {message:"Unauthorized", status:401};
    }
}
