//Package Variables
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var WebSocket = require('faye-websocket')
const http = require('http').createServer(app);
const NodeRSA = require('node-rsa');

//Enviroment Variables
const key = NodeRSA({b:4096});
/*const public_key = key.exportKey('public');
const private_key= key.exportKey('private');

console.log(public_key + '\n' + private_key);*/

let public ='-----BEGIN PUBLIC KEY-----\n'+
'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA0LaQmzNUyhyi0Uk9T/Kz\n'+
'uh6ecsSnYaOC2BPDK/3urGiX+HeGmiEqGOCTJG6M3f2bH46hwDN2h20lgmqps8YY\n'+
'8XD30BpfwfVATgcY/LzYdr/GMTB49phJzkMaVkioCS00ZKdtZ1Bw1ctmEYIDRqmN\n'+
'fSpDAAyBI/AZAOCeg7ys/aYaAwxL5zzz5RYJqkICkC5qEy2dYREvKweX9X/HFidt\n'+
'LHl3gWR9e0ushdrMeV45Trc0ECcVRJhjAqIC814qHneN6TGtBRhcJfxLQG3T0x0B\n'+
'UZc53ig/LsLwWjM2I4GtAU6DmYZxp5BGDYHcwid2wVbXGQD3pOeEyic8HWHq4mM6\n'+
'rftFM4Ucc/CvziA+/sW8UzLKhmuMsxfKxHxeaIBbi0tAPcAGE37ZmNgKm2HgJSlZ\n'+
'7zqu+ZvTa5KuGhTmKHwyIui3oTrtfL8rRt6A9CswmnUMNZPyeyPRSG6043M/lfSZ\n'+
'LJVdtRVe0HcXYjyZYBD5Fm+SF/I6F21qJALfV4OmeJyv2GCGU7BZiZE6uLGkhaF7\n'+
'o4cZj8ic/EsasUVvwR3j30KviMRMrhVIQ/Tey5tEGN6oa4GwDpGmppuU3XL+6bCB\n'+
'/B9HovBktMCQglNERC6oGMmQ6IrANkPx1rI6oyKlr4d4H2UWfU33U2IUsEi10vzK\n'+
'StZEfFVJcEP1+4lAsCWeFwECAwEAAQ==\n'+
'-----END PUBLIC KEY-----';

let private=' -----BEGIN RSA PRIVATE KEY-----\n'+
'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\n'+
'-----END RSA PRIVATE KEY-----';

let key_private = new NodeRSA(private);
let key_public = new NodeRSA(public)
//ste the statics
app.use(bodyParser.json())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use("/public", express.static("public"));


// set view engine
app.set("view engine", "ejs");


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


//Set Sockets
http.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    
    ws.on('message', function(event) {
      ws.send(JSON.stringify({msg : "Benvenuto sei appena connesso al server Ash", from : http.address}));
      console.log(event.data)
    });
    
    ws.on('close', function(event) {
      console.log('close', event.code, event.reason);
      ws = null;
    });
  }
});



app.use('/', require ('./route/mobile'));


const port = process.env.PORT || 5000;
http.listen(port, console.log('Server has started on port ' + port.toString()));

