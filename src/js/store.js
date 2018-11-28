var post_count = 1;
var comment_count = 0;
var users = [];
var currentUser;

var store = {
    // USER
    getUsers : ()=>users,
    getCurrentUser : ()=> currentUser,
    setCurrentUser : function(username) { // this thing isn't working
        console.log('x',users.map(User => User.username == username));
        console.log('y',users.map(function(e) {
            if(e.username == username) {
                return e.username
            }
        }));
        currentUser = users[users.indexOf(username)];
    },
    // POSTS
    getPostCount : ()=> post_count,
    incrementPostCount : ()=> post_count++,
    
    getCommentCount : ()=> comment_count,
    incrementCommentCount : ()=> comment_count
}

export default store;
