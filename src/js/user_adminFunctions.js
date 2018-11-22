// admin functions

var Admin = {
    createUser : function(username,password) {
        users.push(new User(username,password));
    },
    
    findUser : function(username) {
        console.log(
            users.filter(user => user.username == username)
        );
    },
    
    getAllPosts : function() {
        let allPosts = [];
        users.forEach(function (user) {
            user.posts.forEach(function(post) {
                allPosts.push(post);
            })
        });
        return allPosts;
    },
    
    getThisPost : function(post_id) {
        return getAllPosts().find(post => post.post_id == post_id);
    },
    
    getUserFromPost : function(post_id) {
        //debugger;
    
        var thisPost = getAllPosts().find(post => post.post_id == post_id);
        console.log('Posted by',thisPost.user);
        return thisPost.user;
    },
    
    sortByVotes : function(type,id) {}
}



// sample users
//createUser("charlie","pass");
//createUser("coolguy1","hunter2");


export default function test() {
    console.log('anything');
}

// export {Admin};
//export var k = 1;
//export default "TEST";
