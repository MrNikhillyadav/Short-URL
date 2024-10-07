const express = require('express');
const path = require('path');

const {connectToMongoDB} = require('./connect');
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly,checkAuth} = require('./middlewares/auth')

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const userRoute =  require('./routes/user');


const app = express()
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('mongodb connected!'));

app.use(express.json());
app.use(express.urlencoded({extended:  false}));
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth,staticRoute);
app.use("/user", userRoute);


app.listen(PORT, () =>{
    console.log(`server started at PORT: ${PORT}`);
})
