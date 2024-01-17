
const {User}=require('../models/userModel')
const {generateToken} = require('../utils/tokenGeneration')


const createUser=async(req,res)=>{
    console.log("running createUser")
    try {
        
        console.log(req.body)
        const userExists = await User.findOne({email:req.body.email});
        if (userExists) {
             return res.status(409).json({
                  "message": "user already exists",
                  "success": true
             })
        }

        const newuser = await User.create(req.body)
        console.log(newuser)

        if (newuser) {
             generateToken(res, newuser._id)
             res.status(201).json({
                  _id: newuser._id,
                  name: newuser.name,
                  email: newuser.email,
             });
        } else {
             res.status(400);
             throw new Error('Invalid user data');
        }
   }
   catch (error) {
        res.status(500);
        throw new Error(error);
   }

}

const login=async(req,res)=>{
    console.log(req.body)
    const { email, password } = req.body;
    console.log(`email: ${email}`)
    const user = await User.findOne({ email });
    
    console.log(user)
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404);
      res.send({"message":"user not found"})
    }
  };

module.exports={createUser,login}
