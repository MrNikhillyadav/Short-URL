const User = require('../models/user');
const { v4:uuidv4 } = require('uuid');
const {setUser} = require('../service/auth')


async function handleUserSignUp(req,res) {
    const { name,  email, password } = req.body;
    await User.create({
        name, 
        email, 
        password 
    });

    return res.redirect('/')
}
async function handleUserLogin(req,res) {
    const { name,  email, password } = req.body;
    const user = await  User.findOne({ email, password });

    if(!user){
        return res.render('login',
            {
                error : 'Invalid email or password'
            }
        );
    }
    const sessionId  = uuidv4();        // random token no. generate hua

    setUser(sessionId, user);     // -> ye state server store krta h as session || e.g. parking wala Dairy me user ka name aur usko konsa taken no. assign kia, likh leta h.|

    res.cookie('uid', sessionId)    //-> user k pass chale jata h  || cookie set hua, user ko cookie mil jayega (having  token no.)

    
    return res.redirect('/')
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,

}