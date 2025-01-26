import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/usersModels.js';
// import { getMaxListeners } from 'nodemailer/lib/xoauth2/index.js';


//resistration
export const register = async (req, res)=>{
    const {name, email , password}= req.body;

    if(!name || !email || !password){
        return res.json({success:false, message: 'Missing Data'})
    }

    try{
        
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.json({success:false, message:"User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRETE, {expiresIn:'7d'})     //this create a new and unique id and tocke with expire of 7 days for eact new user
         
        res.cookie('token', token, {                                   //send the 7day tocken to the user
            httpOnly: true,                                       //only http req acces this token
            secure: process.env.NODE_ENV === 'production',                       //if the environment is production the it is true
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,                    //7 days in miliseconds
        });
        return res.json({success: true});


    } catch(error) {
        console.error(error);
        res.json({success: false, message: error.message}) 
    }
}



// login
export const  login = async (req, res)=>{
    const {email , password}= req.body;

    if(!email || !password){
        return res.json({success:false, message: 'Missing Data'})
    }

    try {
        const user = await userModel.findOne({email});

        //if we cant find any user
        if(!user){
            return res.json({success:false, message: 'Invalid Email'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.json({success:false, message: 'Invalid Password'})
        }

        //after above line if email and password of a user are correct the system create a tocken
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRETE, {expiresIn:'7d'})     //this create a new and unique id and tocke with expire of 7 days for eact new user
         
        res.cookie('token', token, {                                   //send the 7day tocken to the user
            httpOnly: true,                                       //only http req acces this token
            secure: process.env.NODE_ENV === 'production',                       //if the environment is production the it is true
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,                    //7 days in miliseconds
        });

        return res.json({success: true});


    } catch (error) {
        return res.json({ success:false, message: error.message })
    }
}



// logout

export const logout = async(req, res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true,                                       //only http req acces this token
            secure: process.env.NODE_ENV === 'production',                       //if the environment is production the it is true
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({success:true , message:"Logged Out"})
        
    } catch (error) {
        return res.json({ success:false, message: error.message })
    }
}