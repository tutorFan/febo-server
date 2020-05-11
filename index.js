const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var WebSocket = require('faye-websocket')
const http = require('http').createServer(app);
//const io = require('socket.io')(http);
//ste the statics
app.use(bodyParser.json())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static("public"));

//io.set('transports', ['websocket']);

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
http.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    
    ws.on('message', function(event) {
      ws.send(event.data + ": risposta dal server");
      console.log(event.data)
    });
    
    ws.on('close', function(event) {
      console.log('close', event.code, event.reason);
      ws = null;
    });
  }
});
/*io.on('connection',(socket)=>{
    socket.emit('welcome', 'Hello There and Welcome to the Socket');
    console.log("A new client is connected")
})
*/


app.use('/', require ('./route/mobile'));


const port = process.env.PORT || 5000;
http.listen(port, console.log('Server has started on port ' + port.toString()));

/*var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);*/

/*const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env
io.listen(PORT, LOCAL_ADDRESS, () => {
  const address = io.address();
  console.log('server listening at', address);
});*/