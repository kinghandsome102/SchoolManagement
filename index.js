//include the libary

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require("./database");
//engine

const app = express();

app.set("view engine", "ejs");
app.set("views","./views");

//use libary

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public'));
app.use(session({
    name:process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret:"abcdef",
    cookie: {
        httpOnly:true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true,
        secure:process.env.MODE_ENV === 'production'
    }
}));

// check conection with db
db.checkConection();

app.get("/",function(req,res){
    res.render("login");
});
//Management Login
app.post("/Home", async function(req,res){
    var UserID = req.body.UserID;
    var DBID = UserID.slice(1);
    console.log(DBID);
    var role = await db.checkRole(UserID[0]);
    if (role == 'Manage') {
        res.render("ManagementHome");
    }
    else {
        res.redirect("/");
    }
});
//set port

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`sever start on port ${PORT}`);
});