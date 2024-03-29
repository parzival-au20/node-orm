const Product = require("../models/product");
const Category = require("../models/category");

exports.getAddProducts = (req,res,next) => {

    Category.findAll()
                .then((categories)=> {
                    res.render('admin/add-product', {
                        title: 'New Product',
                        path : '/admin/add-product',
                        categories : categories,
                    });
                })
                .catch( (err) => {
                    console.log(err);
                });
  
};

exports.postAddProduct = (req,res,next) => {
    
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl; 
    const description = req.body.description;
    const categoryid = req.body.categoryid;

    Product.create({
        name : name,
        price : price,
        imageUrl : imageUrl,
        description : description,
        categoryId : categoryid,
    }).then((result) =>{
        //console.log(result);
        res.redirect('/');

    }).catch( (err) => {
        console.log(err);
    });

                            
};

exports.getEditProduct = (req,res,next) => {

    const productId = req.params.productid;

    Product.findByPk(productId)
        .then((product) => {
            if(!product){
                return res.redirect('/'); 
            }
            Category.findAll()
                .then((categories)=> {
                    res.render('admin/edit-product', {
                        title: 'Edit Product',
                        path : '/admin/products',
                        product : product,
                        categories : categories,
                    });
                })
                .catch( (err) => {
                    console.log(err);
                });
            
        }).catch((err) => {
            console.log(err);
        });

};

exports.postEditProduct = (req,res,next) => {
    //database kayıt
    const product = new Product();

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const categoryid = req.body.categoryid;

    Product.findByPk(id)
        .then((product) => {
            product.name = name;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;
            product.categoryId = categoryid;
            return product.save();
        }).then((result) =>{
            console.log('updated');
            res.redirect('/admin/products?action=edit');
        })
        .catch((error)=>{
            console.log(error);
        });
   
};
exports.postDeleteProduct = (req,res,next) => {
    
    const id = req.body.id;

    Product.findByPk(id)
        .then((product)=> {
            product.destroy();
            
        }).then((result) => {
            console.log("product has been deleted");
            res.redirect('/admin/products?action=delete');
        })
        .catch((err) => {
            console.log(err);
            });

   /* Product.destroy({where: {id: id}}) // ikinci yöntem
        .then(() =>{
            res.redirect('/admin/products?action=delete');
        })
        .catch((err) => {
            console.log(err);
            });*/
};

exports.getProducts = (req, res, next) => {
    //res.sendFile(path.join(__dirname,'../','views','index.html'));
    Product.findAll()
        .then((products) => {
            res.render('admin/products', {
                title: 'Admin Products',
                products:products,
                path : '/admin/products',
                action : req.query.action,
            });

        }).catch((err) => {
            console.log(err);
        });
}