const router = require('express').Router();
let User = require('../models/user.model');

//note: can we get around file based routing? Is there a way to not create a microservices framework, wherein everything is through internet APIs,
//but rather than there is an alias that auto updates. 
//perhaps I define alias USER_ROUTER, and I set that equal to the user router file name. Then, wherever that alias is used, whenever I change the 
//user router file name, my entire application automatically refactors itself 

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username; //req.body - what is its form ? 
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(error => res.status(400).json('Error: ' + error));
});

module.exports = router;