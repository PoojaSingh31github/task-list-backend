const mongoose =require('mongoose');
const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true, 
    unique:true
  },
  password:{
    type:String,
    require:true
  },
  username:{
    type:String,
    require:true,
    unique:true
  },
  address:{
    type:String,
    require:true
  }
});
const UserModel = mongoose.model("User", UserSchema)
module.exports=UserModel;