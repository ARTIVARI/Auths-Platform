import jwt from "jsonwebtoken";


const userAuth = async (req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
        return res.json({success: false, message: 'Not Authorized. Pleases login again'})
    }

    try {

       const tockenDecode = jwt.verify(token, process.env.JWT_SECRETE);

       if(tockenDecode.id){
        req.body.userId = tockenDecode.id
       }else{
            return res.json({success: false, message: 'Not Authorized. Pleases login again'});
       }
       

       next();

    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message}) 
    }
}

export default userAuth;