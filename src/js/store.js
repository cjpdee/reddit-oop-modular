var post_count = 1;
var comment_count = 0;
var users = [];
var currentUser;

var store = {
    // USER
    getUsers : ()=>users,
    getCurrentUser : ()=> currentUser,
    setCurrentUser : function(username) { // this thing isn't working
        let foundUserIndex = users.map(function(e) {
            if(e.username == username) {
                return e.username
            }
        }).indexOf(username);
        currentUser = users[foundUserIndex];
        console.log("Current user set: ",currentUser);
    },
    // POSTS
    getPostCount : ()=> post_count,
    incrementPostCount : ()=> post_count++,
    
    getCommentCount : ()=> comment_count,
    incrementCommentCount : ()=> comment_count++
}

export default store;
