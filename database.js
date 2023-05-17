const { rejects } = require('assert');
const mysql = require('mysql');
const { resolve } = require('path');
//add conection


var conection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0368216443",
    database: "SchoolManagement"
});
//add conected to database
var db = {};

/*Check conection*/ 
db.checkConection = function(){
    conection.connect(function(err){
        if (err) throw err;
        console.log("Conected!!");
    });
};
/*Check Role
input: variable C Type String
Output: String
*/
db.checkRole = function(c){
    return new Promise((resolve,rejects)=>{
        var query = "SELECT * FROM schoolmanagement.role WHERE RoleID = ?";
        conection.query(query,[c],(err,result)=>{
            if (err)
            {
                return rejects(err);
            } 
            else
            {
                return resolve(result[0].RoleName);
            }
        })
    })
};

/**
 * Funtion name: CheckID
 * input: string
 * Output: object
 */
db.checkID = function(ID){
    return new Promise((resolve,rejects)=>{
        var query = "SELECT * FROM schoolmanagement.manage WHERE ManagerID = ?";
        conection.query(query,[ID],(err,result)=>{
            if (err)
                return rejects(err);
            else
                return resolve(result[0]);
        })
    })
};

/**
 * function name: getTeacherData
 * input: none
 * output: array
 */

db.getTeacherData = function(){
    return new Promise((resolve,rejects)=>{
        var query = "SELECT B.ObjectName, A.TeacherID, A.TeacherName FROM schoolmanagement.teacher A JOIN schoolmanagement.object B WHERE A.TeacherID = B.TeacherID";
        conection.query(query,(err,result)=>{
            if (err)
                return rejects(err);
            else
                return resolve(result);
        })
    })
};
/**Function Name: findDataWithID
 * input: string
 * Output: object
 */

db.findDataWithID = function (id) {
    return new Promise((resolve,rejects)=>{
        var query = "SELECT B.ObjectName, A.TeacherID, A.TeacherName, A.TeacherMail " + 
        "FROM schoolmanagement.teacher A JOIN schoolmanagement.object B ON A.TeacherID = B.TeacherID";
        conection.query(query,[id],(err,result)=>{
            if (err)
            {
                return rejects(err);
            } 
            else
            {
                return resolve(result[0]);
            }
        })
    })
};

/**Function Name: GetClass
 * input: string
 * Output: Array
 */
db.getClass = function()
{
    return new Promise((resolve,rejects)=>{
        var query = "SELECT * FROM schoolmanagement.Class";
        conection.query(query,(err,result)=>{
            if (err)
            {
                return rejects(err);
            } 
            else
            {
                return resolve(result)
            }
        })
    })
}

module.exports = db;