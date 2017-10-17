const User = require('../models/user');
const jwt = require('jwt-simple');
const secret = require('../config.js').secret;

function createToken(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signin = function(req, res, next) {
    return res.send(
        {
            token: createToken(req.user)
        }
    )
};

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({error: "Username and password must be provided"});
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if(err) {
            return next(err);
        }
        //The email address already exists
        if(existingUser) {
            return res.status(422).send({error: "Email is in use"});
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err) {
            if(err) {
                next(err);
            }
            return res.json(
                { 
                    "token": createToken(user)
                }
            );
        });
    });
    
};