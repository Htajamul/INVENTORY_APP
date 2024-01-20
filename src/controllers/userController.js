const userModel = require("../models/userModel");
const productModel = require('../models/productModel')
//const UserModel = require("../models/userModel");

class UserController {
  register(req, res) {
    return res.render("register");
  }

  getLogin(req,res){
    return res.render('login',{errorMessage:null})
  }

  postRegister(req,res){
    const {name,email,password} = req.body
    // use validation yourself plz
    userModel.add(name,email,password);
    res.render('login',{errorMessage:null})
  }

  postLogin(req,res){
    const {email,password} = req.body;
    const user = userModel.isValidUser(email,password);
    if(!user){
      return res.render("login",{errorMessage:"invalid user"})
    }
    req.session.Useremail = email;    // attaching into the req obj
    const products = productModel.get()
    return res.render('products',{products,Useremail:req.session.Useremail})

  }


  logout(req,res){
    // on logout, destroy the session
    //console.log(req.session)
    req.session.destroy((err)=>{
      if(err){
        console.log(err,"error in destroyong the session")
      }else{
        res.clearCookie("lastVisit")  //  here we clear the cookies by using clearCookie function and passes name of the cookie
        res.redirect('/login')

      }
    })

    res.clearCookie("lastVisit")  //  here we clear the cookies by using clearCookie function and passes name of the cookie.

  }
}

module.exports = UserController;
