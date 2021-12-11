// imports 
const express = require('express');
const app = express();
const apiPort = 8080;
const path = require('path');
const cors = require("cors");
const connectDB = require('./config//db');
const mongoose = require('mongoose');

// get models
const Order = require('./models/order');
const Cart = require('./models/cart');
const User = require('./models/user');
const Product = require('./models/product');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const cart = require('./models/cart');

require('dotenv').config();

// open DB connection
connectDB();

// add middleware
app.use(express.json());
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(express.static(path.join(__dirname, '../client')));
app.use(cors(corsOptions));

// routing apis
app.get('/', (req, res) => {
    res.send('Welcome');
})

app.get('/user', (req, res) => {
    User.find({})
        .then(user => {
            if (!user) {
                res.status(404).send();
            }
            res.send(user);
        }).catch((e) => {
            res.status(400).send(e);
        });
});

app.get('/items', (req, res) => {
    Product.find({})
        .then(items => {
            if (!items) {
                res.status(404).send();
            }
            res.send(items);
        }).catch((e) => {
            res.status(400).send(e);
        });
});

app.get('/item/:id', (req, res) => {
    Product.findById({ _id: req.params.id }, req.body)
        .then(item => {
            if (!item) {
                res.status(404).send();
            }
            res.send(item);
        }).catch((e) => {
            res.status(400).send(e);
        });
});

app.post('/item', (req, res) => {
    const newItem = new Product(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            img: req.body.img,
            description: req.body.description,
            sellerID: req.body.sellerID,
        }
    );
    newItem.save().then(item => res.json(item)).catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/orders', (req, res) => {
    Cart.find({})
        .then(items => {
            if (!items) {
                res.status(404).send();
            }
            res.send(items);
        }).catch((e) => {
            res.status(400).send(e);
        });
});


app.get('/orders/:userID', (req, res) => {
    Order.find({})
        .where('sellerID').equals(req.params.userID)
        .then(item => {
            if (!item) {
                res.status(404).send();
            }
            res.send(item);
        }).catch((e) => {
            res.status(400).send(e);
        });
});

app.get('/cart/:userID', (req, res) => {
    Order.find({})
        .where('sellerID').equals(req.params.userID)
        .then(cart => {
            if (!cart) {
                res.status(404).send();
            }
            res.send(cart);
        }).catch((e) => {
            res.status(400).send(e);
        });
});





// serve app
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));