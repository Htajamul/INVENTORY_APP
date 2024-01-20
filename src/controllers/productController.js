//import path from 'path';
//const { url } = require('inspector')
const productModel = require("../models/productModel");
const path = require("path");
const { error } = require("console");
class ProductController {
  getProducts(req, res) {
    let products = productModel.get();
    res.render("products", { products: products ,Useremail:req.session.Useremail});
  }

  getAddForm(req, res) {
    return res.render("new_product", { errorMessage: error[0],Useremail:req.session.Useremail });
  }

  postNewProduct(req, res, next) {
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    productModel.add(name, desc, price, imageUrl);
    let products = productModel.get();
    return res.render("products", { products: products ,Useremail:req.session.Useremail});
  }

  getUpdateView(req, res, next) {
    // 1. if product exists then return view
    const id = req.params.id;
    const productFound = productModel.getById(id);
    if (productFound) {
      res.render("update_product", {
        product: productFound,
        errorMessage: null,
        Useremail:req.session.Useremail,
      });
    }

    // 2.  return errors
    else {
      res.status(401).send("product not found");
    }
  }

  postUpdateProduct(req, res) {
    productModel.update(req.body);
    let products = productModel.get();
    return res.render("products", { products: products,Useremail:req.session.Useremail });
  }

  deleteProduct(req, res) {
    const id = Number(req.params.id);
    const productFound = productModel.getById(id);
    if (!productFound) {
      return res.status(401).send("product not found");
    }
    let products = productModel.delete(id);
    //let products = productModel.get()
    return res.render("products", { products: products,Useremail:req.session.Useremail });
  }
}

module.exports = ProductController;
