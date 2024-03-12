const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

const Product = require('./models/product');
const Category = require('./models/category');


const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const errorController = require("./controllers/errors");
const sequelize = require('./utility/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));


//Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);


sequelize.authenticate()
    .then(()=>{
        console.log('Connection has been established successfully.');
})
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
    


app.use(errorController.get404Page);


Product.belongsTo(Category, {
    foreignKey: {
        allowNull: false,
    }
});
Category.hasMany(Product);


sequelize
    //.sync({force: true}) 
    .sync() 
    .then((result)=>{
        //console.log(result);
        Category.count()
            .then((count)=>{
                if(count ===0){
                    Category.bulkCreate([
                                {name:"Telefon", description : "telefon kategorisi"},
                                {name:"Bilgisayar", description : "bilgisayar kategorisi"},
                                {name:"Elektronik", description : "elektronik kategorisi"},
                            ]);
                }
            });
        
    }).catch(error => {
        console.log(err);
    });
app.listen(3000);
console.log("Listening port on http://localhost:3000");