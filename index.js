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
        httpOnly: true,
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
    var UserID = req.body.UserID; //take User ID
    var password = req.body.password; //Take User pass
    var databaseID = UserID.slice(1);// slice ID to check role
    var role = await db.checkRole(UserID[0]);//Check role
    if (role == 'Manage') {
        //check ID techer in Database and send to Management page
        var user = await db.checkID(databaseID)
        if (!user) {
            //can't find user redect
            res.redirect("/");
        }
        //check pass
        else if (user.ManagerPass == password) {
            req.session.id = databaseID;
            var userInfor = {
                ID: user.ManagerID,
                Name: user.ManagerName,
                Email: user.ManagerEmail
            }
            //Send teacher info to management page
            var TcherIfo = await db.getTeacherData();
            res.render("ManagementHome",{
                userInformation: userInfor,
                TecherData: TcherIfo
            });
        }
        else {

            res.redirect("/");
        }
    }
    else {
        res.redirect("/");
    }
});

// Show student page
app.get("/Student", function (req,res){
    res.render("ManagementStudentShow");
});

//arrange teacher time
app.get("/Teacherlession",async function (req,res){
    var TcherIfo = await db.getTeacherData();
    var getclass = await db.getClass();
    res.render("ManagementArrangeLession",{teacherData: TcherIfo,ClassInfor: getclass});
});
// arrangle teacher class
app.get("/:classID", async function (req,res) {
    var classID = req.params.ClassID;
    var Lession = await db.getLessionByID(classID);
    var teachers = await db.getTeacherData();
    var dayOflession = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday:[],
        Friday: [],
        IsEmty: false,
        teacherInfo: teachers,
    };
    let length = Lession.length;
    if (length!=0) {
        dayOflession.IsEmty = true;
    }
    for (let index = 0; index < length; index++) {
        if(index < 10){
            dayOflession.Monday.push(Lession[index]);
        } else if (index < 20) {
            dayOflession.Tuesday.push(Lession[index]);
        } else if (index < 30) {
            dayOflession.Wednesday.push(Lession[index]);
        } else if (index < 40) {
            dayOflession.Thursday.push(Lession[index]);
        } else if (index < 50) {
            dayOflession.Friday.push(Lession[index]);
        }
        
    }
    res.render("MangementArrangeClassForTeacher",dayOflession);
});
//logout
app.get("/logout",function (req,res) {
    req.session.destroy();
    res.redirect("/");
})
//set port

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`sever start on port ${PORT}`);
});