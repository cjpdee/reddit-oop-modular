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
		// console.log(result);
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
			// console.log(result);
			console.log("User '" + data.username + "' saved to database.");
		});
	});

	client.on('userCreateNewPost', data => {
		if ( !data.user ) {
			console.log("failed to enter post to database",data)
			return
		}
		console.log("Creating new post: " + data.title);
		con.query("INSERT INTO posts (post_id,date_posted,user,subreddit,title,content,comments,upvotes,downvotes) VALUE ('" +
			data.post_id + "','" + data.date_posted + "','" +
			data.user + "','" + data.subreddit + "','" +
			data.title + "','" + data.content + "','" +
			data.comments + "','" + data.upvotes + "','" +
			data.downvotes +
		"')", function(err, result) {
			if(err) throw err;
			// console.log(result);
			console.log("New post created with title : " + data.title);

			// create query functions : query.updatePosts(username,new_post_id)
			// query.updateComments()
			// query.updateCommentUpvotes()
			// etc...

			con.query("SELECT posts FROM users WHERE username = '" + data.user + "'",function(err,result) {
				// console.log(result[0].posts);
				let postsStr = result[0].posts;
				// console.log(postsStr);

				if((postsStr.endsWith(']')) && (postsStr.startsWith('['))) {
					var thing = ',';
					if (postsStr.length == 2) {
						thing = '';
					}
					console.log("Author's posts array before update:" + postsStr);
					// postsArray = "[" + postsStr + "]";
					// console.log(postsArray);
					postsStr = postsStr.replace('[','');
					postsStr = postsStr.replace(']','');
					var postsArray = "[" + postsStr + thing + data.post_id + "]";
					console.log(postsArray);
					// postsArray.push(data.post_id);

					console.log("Author' s posts array after update: " + postsArray);

					con.query("UPDATE users SET posts = '" + postsArray + "' WHERE username = '" + data.user + "'",function(err,result) {
						if (err) throw err;
						// console.log('emitting thingy',result);
						client.emit('userCreateNewPost',data);
					})

				} else {
					console.log('The database returned an incorrectly written posts array : ',postsStr);
				}


				
			})
			

			
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
		return con.query("SELECT * from users", function(err, result, fields) {
			if (err) throw err;
			client.emit('getUsers',result);
			return result;
		})
	})

	// ------------
	// getPostCount

	client.on('getPostCount', function() {
		con.query("SELECT value FROM store WHERE name='post_count'", function (err, result) {
			if (err) throw err;
			console.log("client retrieved post_count from db");
			client.emit('getPostCount',result[0].value);
		});
	});

	// ------------------
	// incrementPostCount

	client.on('incrementPostCount', function() {
		con.query("SELECT value FROM store WHERE name='post_count'", function (err, result, fields) {
			if (err) throw err;
			let incrementedValue = parseInt(result[0].value) + 1;
			
			con.query("UPDATE store SET value = '" +  incrementedValue + "' WHERE name = 'post_count'",function(err,result) {
				if(err) throw err;
				console.log("client incremented post_count"); 
				client.emit('incrementPostCount',incrementedValue);
			});
		});
	});

	// ---------------
	// getCommentCount

	client.on('getCommentCount', function() {
		con.query("SELECT value FROM store WHERE name='comment_count'", function (err, result, fields) {
			if (err) throw err;
			console.log("client retrieved comment_count from db");
			client.emit('getCommentCount',result[0].value)
		});
	});

	// ---------------------
	// incrementCommentCount

	client.on('incrementCommentCount', function() {
		con.query("SELECT value FROM store WHERE name='comment_count'", function (err, result, fields) {
			if (err) throw err;
			let incrementedValue = result[0].value++;
			con.query("UPDATE store SET value = '" +  result[0].value + "' WHERE name = 'comment_count'",function(err,result) {
				if(err) throw err;
				console.log("client incremented comment_count to ", incrementedValue+1);
				client.emit('incrementCommentCount',incrementedValue+1);
			});
		});
	});

	/*
		USER ADMIN FUNCTIONS
	*/

	//------------
	// getAllPosts

	client.on('getAllPosts',function() {
		con.query("SELECT * FROM posts", function(err,result) {
			if (err) throw err;
			console.log('retrieved all posts',result);
			client.emit('getAllPosts',result);
		});
	});

	client.on('getThisPost',function(data) {
		con.query("SELECT * FROM posts WHERE 'post_id' = '" + data + "'",function(err,result) {
			console.log('GETHISPOS',result);
			client.emit('getThisPost',data);
		});
	});

	client.on('connected', data => { console.log(data); });
	client.on('disconnect', () => { console.log("User disconnected") });
});



server.listen(8081);

console.log('Server running at http://127.0.0.1:8081/');