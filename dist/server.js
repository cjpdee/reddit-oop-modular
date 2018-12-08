var password = require('./sensitive.js');
var express = require('express');
var app = express();
var server = require("http").createServer(app);
const io = require('socket.io')(server)

// SETUP SQL
var mysql = require('mysql');

var con = mysql.createConnection({
	host:'46.183.13.53',
	port:'3306',
	user: 'cjpdee',
	database: 'redditDB',
	password: password
});

// connect to database
con.connect(function(err) {
	if (err) throw err;
	console.log('Connected to SQL Database.');
	con.query("SELECT * FROM users", function (err, result, fields) {
		if (err) throw err;
		console.log(result);
	});
});





// ROUTING

app.get('/', function(req, res, next) {
	res.sendFile(__dirname + '/index.html'); 
	console.log('routed client to index');
});

app.get('/app.css', function(req, res, next) {
	res.sendFile(__dirname + '/app.css'); 
	console.log('routed client to css');
});

app.get('/app.js', function(req, res, next) {
	res.sendFile(__dirname + '/app.js'); 
	console.log('routed client to js');
});

app.get("/request",function(req,res,next) {
	res.send("hi from server");
	console.log("sent back data to client");
});

/*
------------------------
------- sockets --------
------------------------
*/

io.on('connection', client => {
	client.on('request', data => { console.log(data); });

	// --------
	// NEW USER

	client.on('newUser', data => {
		console.log("Creating new user: " + data.username);

		con.query("INSERT INTO users (username, password, date_created, comments, comment_upvotes, comment_downvotes, posts, post_upvotes, post_downvotes) VALUES ('" +
			data.username + "','" + data.password + "','" +
			data.date_created + "','" + data.comments + "','" +
			data.comment_votes.up + "','" + data.comment_votes.down + "','" +
			data.posts + "','" + data.post_votes.up + "','" +
			data.post_votes.down +
		"')", function (err, result, fields) {
			if (err) throw err;
			console.log(result);
		});
	});

	client.on('UserCreateNewPost', data => {

		con.query("INSERT INTO posts (post_id,date_posted,user,subreddit,title,content,comments,upvotes,downvotes) VALUE ('" +
			data.post_id + "','" + data.date_posted + "','" +
			data.user + "','" + data.subreddit + "','" +
			data.title + "','" + data.content + "','" +
			data.comments + "','" + date.upvotes + "','" +
			data.downvotes +
		"')", function(err, result) {
			if(err) throw err;
			console.log(result);
		});
	})

	/*
	-----------------------
	-------- STORE --------
	-----------------------
	*/

	// --------
	// getUsers

	client.on('getUsers',function() {
		let data;
		con.query("SELECT * from users", function(err, result, fields) {
			if (err) throw err;
			console.log(result);

			client.emit('getUsers',result);
			data = result;
		})
		return data;
	})

	// ------------
	// getPostCount

	client.on('getPostCount', function() {
		con.query("SELECT value FROM store WHERE name='post_count'", function (err, result, fields) {
			if (err) throw err;
			console.log(result[0].value);
			client.emit('getPostCount',result[0].value)
		});
	});

	// ------------------
	// incrementPostCount

	client.on('incrementPostCount', function() {

		con.query("SELECT value FROM store WHERE name='post_count'", function (err, result, fields) {
			if (err) throw err;
			let incrementedValue = result[0].value++;
			client.emit('incrementPostCount',incrementedValue);
			con.query("UPDATE store SET value = '" +  result[0].value + "' WHERE name = 'post_count'",function(err,result) {
				if(err) throw err;
				console.log('did query: ',result); 
			});
		});

		//con.query("UPDATE store SET value = '" + data + "' WHERE name = 'post_count'");

		// UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'
	})


	// ------------
	// getPostCount

	client.on('getCommentCount', function() {
		con.query("SELECT value FROM store WHERE name='comment_count'", function (err, result, fields) {
			if (err) throw err;
			console.log(result[0].value);
			client.emit('getCommentCount',result[0].value)
		});
	});



	client.on('incrementCommentCount', function() {

		con.query("SELECT value FROM store WHERE name='comment_count'", function (err, result, fields) {
			if (err) throw err;
			let incrementedValue = result[0].value++;
			client.emit('incrementCommentCount',incrementedValue);
			con.query("UPDATE store SET value = '" +  result[0].value + "' WHERE name = 'comment_count'",function(err,result) {
				if(err) throw err;
				console.log('did query: ',result);
			});
		});

		//con.query("UPDATE store SET value = '" + data + "' WHERE name = 'post_count'");

		// UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'
	})





	client.on('connected', data => { console.log(data); });
	client.on('disconnect', () => { console.log("User disconnected") });
});



server.listen(8081);
 
 // Console will print the message
 console.log('Server running at http://127.0.0.1:8081/');