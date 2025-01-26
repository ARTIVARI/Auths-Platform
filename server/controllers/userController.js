import userModel from "../models/usersModels.js";

export const getUserData = async(req, res)=>{
    try {
        const {userId}= req.body;

        const user = await userModel.findById(userId);
        
        // if user not found
        if (!user) {
            console.log(user);
            
            return res.json({success:false, message: 'User not founds'});
        }

        // if user found 
        res.json({success:true, userData:{
            name: user.name
        }});

        
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message}) 
    }
}