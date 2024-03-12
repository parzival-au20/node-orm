const Product = require("../models/product");
const Category = require("../models/category");


exports.getIndex = (req, res, next) => {
    //res.sendFile(path.join(__dirname,'../','views','index.html'));

    Product.findAll()
        .then((products) => {
            Category.findAll()
                .then((categories)=> {
                    res.render('shop/index', {
                        title: 'Shopping',
                        products:products,
                        categories:categories,
                        path : '/'
                    });
                })
                .catch( (err) => {
                    console.log(err);
                });

        }).catch((err) => {
            console.log(err);
        });
    
}

exports.getProducts = (req, res, next) => {
    
    Product.findAll()
        .then((products) => {
            Category.findAll()
                .then((categories)=> {
                    res.render('shop/products', {
                        title: 'Products',
                        products:products,
                        categories:categories,
                        path : '/'
                    });
                })
                .catch( (err) => {
                    console.log(err);
                });

        }).catch((err) => {
            console.log(err);
        });

}

exports.getProductsByCategoryId = (req, res, next) => {

    const categoryid = req.params.categoryid;
    const model = [];

    Category.findAll()
        .then(categories => {
            model.categories = categories;
            const category = categories.find(i => i.id == categoryid);
            return category.getProducts();
        }).then(products => {
            res.render('shop/products', {
                title: 'Products',
                products:products,
                categories:model.categories,
                selectedCategory:categoryid,
                path : '/products'
            });
        }).catch( (err) => {
            console.log(err);
        });
}

exports.getProduct = (req, res, next) => {
    
    const productId = req.params.productid;
    
    Product.findByPk(productId)
        .then((product) => {
            res.render('shop/product-detail', {
                title: product.name,
                product:product,
                path : '/products'
            });
        }).catch((err) => {
            console.log(err);
        });

}

exports.getProductDetails = (req, res, next) => {
    //res.sendFile(path.join(__dirname,'../','views','index.html'));
    const products = Product.getAll();

    res.render('shop/details', {
        title: 'Details',
        path : '/details'
    });
}
exports.getCart = (req, res, next) => {
    //res.sendFile(path.join(__dirname,'../','views','index.html'));
    const products = Product.getAll();

    res.render('shop/cart', {
        title: 'Cart',
        path : '/cart'
    });
}
exports.getOrders = (req, res, next) => {
    //res.sendFile(path.join(__dirname,'../','views','index.html'));
    const products = Product.getAll();

    res.render('shop/orders', {
        title: 'Orders',
        path : '/orders'
    });
}