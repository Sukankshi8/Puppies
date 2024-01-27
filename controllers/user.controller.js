import { User } from '../models/User.js';
import {hashPassword, comparePassword} from '../helpers/auth.js'
import jwt  from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const {name, email, password, username} = req.body;
        if (!name) {
            return res.json({
                error: "name is required"
            })
        } 
        if (!password || password.length<8) {
          return res.json({
            error: "password is required and should be atleast 8 characters long",
          });
        }
        const exist = await User.findOne({email})
        if (exist){
            return res.json({
              error: "Email is taken already",
            });
           
        }
        const existUser = await User.findOne({username})
        if (existUser){
            return res.json({
              error: "Username is taken already",
            });
            
        }

        // const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name, 
            email, 
            password, 
            username,
        });

        return res.status(200).json(user)
    } catch (error) {
        throw new Error ('Error')
    }

};

export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    console.log(email)
    const user = await User.findOne({email});
    console.log(user)
    if (!user) {
      return res.json({
        error: 'No user found'
      })
    }

    const match = await user.comparePassword(password)
    if (match) {
      jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
        if(err) throw err;
        res.cookie('token', token).json(user)
      })
    }
    console.log(match)
    if (!match)
    {
      res.json({
        error: "Password do not match"
      })
    }
  } catch (error) {
    console.log(error)
  }
};

// module.exports ={
//     register,
//     loginUser,
// };