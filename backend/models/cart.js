const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
        required: true,
        type: String,
    },
    items:
        [{
            productId: {
                type: String,
            },
            name: String,
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity can not be less then 1.'],
                default: 1
            },
            price: Number
        }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});

const Cart = mongoose.model('Carts', CartSchema);

module.exports = Cart;