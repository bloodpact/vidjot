const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
//user model
require('../models/User');
const User = mongoose.model('users');

router.get('/login', (req, res)=>{
    res.render('users/login')
});
router.get('/register', (req, res)=>{
    res.render('users/register')
});
router.get('/logout', (req, res)=>{
    req.logOut();
    req.flash('success_msg', 'Logged out')
    res.redirect('/users/login')
});
router.post('/login', (req, res, next)=>{
    passport.authenticate('local',{
        successRedirect: '/links',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req, res, next)
});
router.post('/register', (req, res)=>{
    let errors =[];
    if (req.body.password !== req.body.password2) {
        errors.push({text: 'Passwords do not match'});
    }
     if (req.body.password.length < 4){
         errors.push({text: 'Password should have more than 4 characters'});
     }
     if (errors.length > 0){
         res.render('users/register',{
             errors: errors,
             email: req.body.email,
             name: req.body.name
         })
     } else {
        User.findOne({email: req.body.email})
            .then(user=>{
                if(user){
                 req.flash('error_msg', 'Email is already registered')
                    res.redirect('/users/login')
                }else{
                    const newUser = new User({
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password,
                    });
                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(newUser.password, salt, (err, hash)=>{
                            if (err) throw  err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user =>{
                                    req.flash('success_msg', 'Registered');
                                    res.redirect('/users/login')
                                })
                                .catch(err=>{
                                    console.log(err);
                                    return;
                                })
                        })
                    });
                }
            });
     }
});
module.exports = router;