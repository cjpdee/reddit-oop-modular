import store from './store';
import User from './user_prototype';
import Post from './post_prototype';

// var socket = store.getSocket();
// console.log(store);

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

            store.getSocket().emit('getAllPosts');
            store.getSocket().on('getAllPosts',function(data) {
                console.log('ALL POSTS: ',data);
                let posts = [];
                data.forEach(function(item) {
                    item.date_posted = new Date(item.date_posted);
                    console.log(data.comments);
                    let newPost = new Post(item.post_id,item.date_posted,item.title,item.user,item.subreddit,item.content,item.upvotes,item.downvotes,item.comments);
                    posts.push(newPost);
                })
                console.log('after: ',posts);

                // data.forEach(function(item){
                //     let newUser = new User(item.username,item.password,item.date_created,item.comments,item.comment_upvotes,item.comment_downvotes,item.posts,item.post_upvotes,item.post_downvotes);
                //     users.push(newUser)
                // })
                // console.log('-- getUsers');
                // console.log(users);
                resolve(posts);
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
            store.getSocket().emit('getThisPost',post_id);
            store.getSocket().on('getThisPost',function(data) {
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
