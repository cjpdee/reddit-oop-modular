// import DOMFuncs from './dom_functions';
import User from './user_prototype';


var io = require('socket.io-client');
var socket = io.connect("http://127.0.0.1:8081");

var users = [];
var currentUser;

var store = {
    getSocket: function() {
        console.log('app.js',socket);
        return socket
    },
    // USER
    getUsers : function() {
        return new Promise(function(resolve,reject) {
            socket.emit('getUsers');
            socket.on('getUsers',function(data) {
                users = [];
                data.forEach(function(item){
                    let newUser = new User(item.username,item.password,item.date_created,item.comments,item.comment_upvotes,item.comment_downvotes,item.posts,item.post_upvotes,item.post_downvotes);
                    users.push(newUser)
                })
                resolve(users);
            });
        })
    },
    getCurrentUser : ()=> currentUser,
    setCurrentUser : function(username) { // complete
        return new Promise(function(resolve) {
            store.getUsers().then(function(users) {
                let foundUserIndex = users.map(function(e) {
                    if(e.username == username) {
                        return e.username
                    }
                }).indexOf(username);
                currentUser = users[foundUserIndex];
                console.log("Current user set: ",currentUser);
                // console.log(store.getCurrentUser());
                resolve(currentUser);
            });
        }) 
    },
    addUser : function(user) {
        new Promise(function() { // complete-ish
            socket.emit('newUser',user);

            socket.on('newUser',function(data) {
                console.log(data);
                return data
            })


            // window.location.reload(); // temp maybe
        })
    },
    // POSTS
    getPostCount : function() {
        return new Promise(function(resolve) { // complete
            socket.emit('getPostCount');
            var postCount;
            socket.on('getPostCount', function(data) {
                console.log("-- getPostCount --");
                console.log(data);
                postCount = data;
                resolve(data);
            })
        })
    },
    incrementPostCount : function() {
        return new Promise(function(resolve) { // complete
            socket.emit('incrementPostCount');
            socket.on('incrementedPostCount',function(data) {
                console.log('-- incrementPostCount : ', data);
                resolve(data);
            });
        })
    },
    
    getCommentCount : function() {
        new Promise(function() { // complete
            socket.emit('getCommentCount');
            var commentCount;
            socket.on('getCommentCount', function(data) {
                console.log("-- getCommentCount : ", data);
                commentCount = data;
            })
            return commentCount;
        })
    },
    incrementCommentCount : function() {
        new Promise(function() { // complete
            socket.emit('incrementCommentCount');
            socket.on('incrementCommentCount',function(data) {
                console.log("-- incrementCommentCount : ", data);
            })
        })
    },
}

export default store;
