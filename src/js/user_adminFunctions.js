import store from './store';
import User from './user_prototype';

// admin functions
export default (function() {
var Admin = {
    createUser : function(username,password) {
        store.getUsers().push(new User(username,password));
    },
    
    findUser : function(username) {
        console.log("findUser()",
            store.getUsers().find(user => user.username == username)
        );
        return store.getUsers().find(user => user.username == username);
    },

    // Post functions
    
    getAllPosts : function() {
        let allPosts = [];
        store.getUsers().forEach(function (user) {
            user.posts.forEach(function(post) {
                allPosts.push(post);
            })
        });
        return allPosts;
    },
    
    getThisPost : function(post_id) {
        return Admin.getAllPosts().find(post => post.post_id == post_id);
    },

    getThisPostSub : function(post_id) {
        return Admin.getAllPosts().find(post=> post.post_id == post_id).subreddit
    },
    
    getUserFromPost : function(post_id) {
        var thisPost = getAllPosts().find(post => post.post_id == post_id);
        console.log('getUserFromPost()',thisPost.user);
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
