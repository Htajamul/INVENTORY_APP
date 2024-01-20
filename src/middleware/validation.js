
const expressValidation = require('express-validator');
const ValidationMiddleware = async (req,res,next) => {

    //        let error = [];
    //         const {name,price,imageUrl}=req.body;
    //         if(!name||name.trim()==" "){
    //             error.push('name is required')
    //         }
    //         if(!price || parseFloat(price)<0){
    //             error.push('price must be positive')
    //         }
    //         try {
    //             const validURl = new URL(imageUrl)
    //         } catch (err) {
    //             error.push("URL is invalid")
    //         }





    //         instead of above validation code .We use express validator code
    //          use express valodator code

    //         1. setup rules for validation.
    //         2. run those rules.
    //         3. check if there sre any errors after running the rules.



    console.log(req.body);
      // 1. Setup rules for validation.
    const rules = [
        expressValidation.body('name').notEmpty().withMessage('Name is required'),
        expressValidation.body('price').isFloat({ gt: 0 }).withMessage('Price should be a positive value'),
        //expressValidation.body('imageUrl').isURL().withMessage('Invalid url'),
        expressValidation.body('imageUrl').custom((value,{req})=>{
          if(!req.file){
            throw new Error("image is required ok")
          }
          return true;
        })
    ];
  
      // 2. run those rules.
    await Promise.all(
      rules.map((rule) => rule.run(req))
    );
  
      // 3. check if there are any errors after running the rules.
    var validationErrors = expressValidation.validationResult(req);
    console.log(validationErrors);
      // 4. if errros, return the error message
    if (!validationErrors.isEmpty()) {
      return res.render('new_product', {
        errorMessage:validationErrors.array()[0].msg,
      });
    }
    next();
};

module.exports =ValidationMiddleware;
  