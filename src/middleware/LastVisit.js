

const setLastVisit = (req,res,next)=>{                      //  here cookie is updated
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString()
    }
    res.cookie("lastVisit",new Date().toISOString(),{      //  cookie is setted here
        maxAge: 2*24*60*60*1000
    })
    // res.cookie("cookie_name","cookie_data",{
    //     maxAge:2*24*60*60*1000                // only for how to set cookie
    // }) 
    next()
}
module.exports = setLastVisit;


