const express = require('express');
const router = express.Router();
const URL = require('../models/url')

router.get('/', async(req,res) =>{
    if(!req.user) return  res.redirect('/login')
    const allURLs = await URL.find({ creadteBy: req.user._id }); // find all urls created by the particular user 

    return res.render('home',{
        allURLs: allURLs,
    })
})

router.get('/signup',  (req, res) => {
    return res.render('signup')
    });

router.get('/login',  (req, res) => {
    return res.render('login')
    });




module.exports = router ;