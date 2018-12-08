import DOMFuncs from './dom_functions';
import User from './user_prototype';


var io = require('socket.io-client');
var socket = io.connect("http://127.0.0.1:8081");


var post_count = 1;
var comment_count = 0;
var users = [];
var currentUser;

var store = {
    // USER
    getUsers : new Promise(function(resolve,reject) {
        console.log('getting users');
        var x;
        socket.emit('getUsers');
        socket.on('getUsers',function(data) {
            console.log('gotUsers',data);
            users = [];
            data.forEach(function(item){
                let newUser = new User(item.username,item.password,item.date_created,item.comments,{up: item.comment_upvotes, down: item.comment_downvotes},item.posts,{up:item.post_upvotes,down:item.post_downvotes});
                users.push(newUser)
            })
            console.log(users);
            resolve(data);
        });
        // response.then(function(data){
        //     console.log('it worked',data);
        //     users = data;
        // },function(){
        //     console.log('it didnt worked');
        // });
        // return

        // response.then(function(){
        //     console.log('x',x)
        //     return users;
        // })
        
    }),
    getCurrentUser : ()=> currentUser,
    setCurrentUser : function(username) { // this thing isn't working
        store.getUsers.then(function(users) {
            let foundUserIndex = users.map(function(e) {
                if(e.username == username) {
                    return e.username
                }
            }).indexOf(username);
            currentUser = users[foundUserIndex];
            console.log("Current user set: ",currentUser);
        })
    },
    addUser : function(user) {
        socket.emit('newUser',user);
        window.location.reload(); // temp maybe
    },
    // POSTS
    getPostCount : new Promise(function() {
        socket.emit('getPostCount');
        var postCount;
        socket.on('getPostCount', function(data) {
            console.log("-- first getPostCount --");
            console.log(data);
            postCount = data;
        })
        return postCount;
    }),
    incrementPostCount : new Promise(function() {
        socket.emit('incrementPostCount', function(data) {
            console.log("incremented post count: " + data);
        });
    }),
    
    getCommentCount : function() {
        socket.emit('getCommentCount');
        var commentCount;
        socket.on('getCommentCount', function(data) {
            console.log("-- first getPostCount --");
            console.log(data);
            commentCount = data;
        })
        return commentCount;
    },
    incrementCommentCount : ()=> comment_count++
}

export default store;
