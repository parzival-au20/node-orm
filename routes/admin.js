const express = require('express')
const router = express.Router();
const path = require('path');

const adminController =  require("../controllers/admin");

//   /admin/add-product => GET
router.get('/add-product', adminController.getAddProducts);

//   /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);


router.get('/products/:productid', adminController.getEditProduct);

router.post('/products', adminController.postEditProduct);

router.get('/products', adminController.getProducts);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router ;
