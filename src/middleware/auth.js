const auth = (req,res,next)=>{
    if(req.session.Useremail){
        next();
    }else{
        res.redirect('/login')
    }
}

module.exports =auth