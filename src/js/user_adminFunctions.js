import store from './store';
import User from './user_prototype';

var io = require('socket.io-client');
var socket = io.connect("http://127.0.0.1:8081");

// admin functions
export default (function() {
var Admin = {
    createUser : function(username,password) {
            store.getUsers()
            .then(function(data) {
                console.log(data);
                // let usersArray = Array.parse(data);

                let x = new User(username,password);
                store.addUser(x);
                resolve();
            })
    },
    
    findUser : function(username) {
        return store.getUsers().find(user => user.username == username);
    },

    // Post functions
    
    getAllPosts : function() {
        return new Promise(function(resolve) {
            // example at store.js

            socket.emit('getAllPosts');
            socket.on('getAllPosts',function(data) {
                console.log(data);
                // data.forEach(function(item){
                //     let newUser = new User(item.username,item.password,item.date_created,item.comments,item.comment_upvotes,item.comment_downvotes,item.posts,item.post_upvotes,item.post_downvotes);
                //     users.push(newUser)
                // })
                // console.log('-- getUsers');
                // console.log(users);
                resolve(data);
            });

            // let allPosts = [];
            // store.getUsers().forEach(function (user) {
            //     user.posts.forEach(function(post) {
            //         allPosts.push(post);
            //     });
            // });
            // return allPosts;
        })
        
    },
    // currently working on
    getThisPost : function(post_id) {
        return new Promise(function(resolve) {
            socket.emit('getThisPost',post_id);
            socket.on('getThisPost',function(data) {
                console.log(data);
                resolve(data);
            });
        });
    },

    getThisPostSub : function(post_id) {
        return Admin.getAllPosts().find(post=> post.post_id == post_id).subreddit
    },
    
    getUserFromPost : function(post_id) {
        var thisPost = Admin.getAllPosts().find(post => post.post_id == post_id);
        return thisPost.user;
    },
    
    sortByVotes : function(type,id) {},

    // Comment functions

    getAllComments : function() {
        let allComments = [];
        store.getUsers().forEach(function (user) {
            user.comments.forEach(function(comment) {
                allComments.push(comment);
            })
        });
        return allComments;
    },

    getThisComment : function(comment_id) {
        return Admin.getAllComments().find(comment => comment.comment_id == comment_id);
    }
}
return Admin;
})();



// sample users
//createUser("charlie","pass");
//createUser("coolguy1","hunter2");



// export {Admin};
//export var k = 1;
//export default "TEST";
