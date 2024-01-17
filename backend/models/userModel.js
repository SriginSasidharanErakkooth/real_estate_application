const mongoose =require('mongoose');
const bcrypt=require('bcrypt');


const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin:{
        type:Boolean ,
        required: true,
        default:false

    }
    },
    {
      timestamps: true,
    }
  );




// Match user entered password to hashed password in database
// userSchema.methods is used to add instance methods to your documents. When you attach a function to
//  userSchema.methods, it becomes available on instances of the model.
userSchema.methods.matchPassword = async function (passwordIn) {
  
    return await bcrypt.compare(passwordIn, this.password);
  };
  
  // Encrypt password using bcrypt before storing the password to the mongodb.
  // userSchema.pre function is a middleware in Mongoose that allows you to define functions to be 
  // executed before certain operations occur
userSchema.pre('save', async function (next) { // this is a middleware
    console.log("pre running")  
    if (!this.isModified('password')) {
        next();
      }
     
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      console.log(`this.password:${this.password}`)
    });
const User=mongoose.model('Users',userSchema)
module.exports={User}
