//inisialisasi express framework
var express=require('express');
var app=express();

var http=require('http').Server(app);
var io=require('socket.io')(http);

//module node js untuk mengatur path
var path=require('path');

var mongoose=require('mongoose');
var configDB=require('./server/config/database.js');

mongoose.connect(configDB.url);

var bodyParser=require('body-parser');
var methodOverride=require('method-override');

app.use(bodyParser.json());
app.use(methodOverride());

//mengambil nilai port 
var port=process.env.PORT || 3001;
//set view engine dan direktori dari view tersebut
app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'client','views'));

app.use(express.static(path.resolve(__dirname,'client')));

var users=[];
io.on('connection',function(socket){
	var username='';
	console.log('A user has Connected !');

	socket.on('request-users',function(){
		socket.emit('users',{users:users});
	});

	socket.on('message',function(data){
		io.emit('message',{username:username,message:data.message});
	});

	socket.on('add-user',function(data){
		if(users.indexOf(data.username)== -1){
			io.emit('add-user',{
				username:data.username
			});
			username:data.username;
			users.push(data.username);
		}else{
			socket.emit('promp-username',{
				message:'User Already Exists'
			})
		}
	});

	socket.on('disconnect',function(){
		console.log(username+'A user has Disconnected');
		users.splice(users.indexOf(username),1);
		io.emit('remove-user',{username:username});
	})
});

app.get('/',function(req,res){
	res.render('index.ejs');
});

var api=express.Router();
require('./server/routes/api')(api);
app.use('/api',api);

http.listen(port,function(){
	console.log('Server running...Port:'+port);
});