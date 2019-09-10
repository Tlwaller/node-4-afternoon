const swag = require('../models/swag');

module.exports = {
    add: (req, res) => {
        const {id} = req.params;
        var {user} = req.session;
    
        const index = user.cart.findIndex(swag => swag.id == id);
    
        if(index === -1) {
            const selectedSwag = swag.find(swag => swag.id == id);
    
            user.cart.push(selectedSwag);
            user.total += selectedSwag.price;
        }
    
        res.status(200).send(user);
    },
    
    remove: (req, res) => {
        const {id} = req.params;
        const {user} = req.session;

        const index = user.cart.findIndex(swag => swag.id == id);

        if(index !== -1) {
            const selectedSwag = swag.find(swag => swag.id == id);

            user.cart.splice(selectedSwag, 1);
            user.total -= selectedSwag.price;
        }
        res.status(200).send(user);
    },

    checkout: (req, res) => {
        const {user} = req.session;

        user.cart = [];
        user.total = 0;

        res.status(200).send(user);
    }
}