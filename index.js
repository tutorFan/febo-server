const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http').createServer();
const io = require('socket.io')(http);

const app = express();

//ste the statics
app.use(bodyParser.json())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static("public"));



// set view engine
app.set("view engine", "ejs");
//app.use(express.urlencoded());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)


//Database
const db = require('./config/db_manager')


//Test db
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log ('Error while connecting to the databes :' + err))

//app.get('/', (req,res) => res.render('index'));


//Set Sockets
/*io.on('connection',(socket)=>{
    socket.emit('welcome', 'Hello There and Welcome to the Socket');
    
})
*/

app.use('/', require ('./route/mobile'));


const port = process.env.port || 5000;
app.listen(port, console.log('Server has started on port ' + port.toString()));
