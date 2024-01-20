const express = require('express');
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const path = require('path');


//==============================================================
const ProductController = require('./src/controllers/productController')
const Validation = require('./src/middleware/validation')
const uploadFile = require('./src/middleware/file_upload_multer');
const UserController = require('./src/controllers/userController');
const auth = require('./src/middleware/auth');
const LastVisit = require('./src/middleware/LastVisit')

//==================================================================
const server = express();

//  set up cookie parser
server.use(cookieParser());
//server.use(LastVisit);    

//  setup session-express
server.use(session({
    name:"product",
    secret:"secretKey",  // always use key genrator tool
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        maxAge:2*24*60*60*1000
    },

}))


server.use(express.static('./src/views'));
server.use(express.static('public'));


// parse from data==================================================================
server.use(express.urlencoded({extended:true}));

// view engine setups======================================
server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),"src",'views'))
server.use(ejsLayouts)

// login form===============================================
const userController = new UserController()


server.get('/register',userController.register)
server.post('/register',userController.postRegister)
server.get('/login',userController.getLogin)
server.post('/login',userController.postLogin)
server.get('/logout',userController.logout)

// create instance of productcontroller ========

const productController = new ProductController()
 

server.get('/',LastVisit,auth,productController.getProducts)
server.get('/add-product',auth,productController.getAddForm)

server.post('/',auth,uploadFile.single("imageUrl"),Validation,productController.postNewProduct)

server.get('/update_product/:id',auth,productController.getUpdateView)
server.post('/update_product',auth,productController.postUpdateProduct);
server.post('/delete_product/:id',auth,productController.deleteProduct)



server.listen(8000);
console.log('running on port 8000')