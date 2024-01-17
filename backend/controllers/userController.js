
const {User}=require('../models/userModel')

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

module.exports={createUser}
