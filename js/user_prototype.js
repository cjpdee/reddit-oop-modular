// global vars
var post_count = 1;
var comment_count = 0;
var users = [];
var currentUser;
//

// User Constructor
function User(username,password) {
    this.username = username;
    this.password = password;
    this.date_created = new Date();
    this.comments = [];
    this.posts = [];
    this.votes = {
        up   : [],
        down : []
    }
}

User.prototype = {
    createPost : function(subreddit,title,content) {
        let post = {
            post_id: post_count,
            date_posted: new Date(),
            upvotes: 0,
            downvotes: 0,
            title: title,
            user: this.username,
            content: content,
            subreddit: subreddit
        }
        this.posts.push(post);
        post_count ++;
    },
    createComment : function(post_id,content) {
        let comment = {
            comment_id: comment_count + 1,
            post_id: post_id,
            date_posted: new Date(),
            upvotes: 0,
            downvotes: 0,
            content: content,
            subreddit: subreddit
        }
        this.posts.push(post);
    },
    upvotePost : function(post_id) {
        if (this.votes.up.find(upvotedPost => upvotedPost == post_id)) {
            console.log("this user has already voted on this post");
            return
        } else {
            let allPosts = getAllPosts();
            let thisPost = allPosts.find(post => post.post_id == post_id);

            thisPost.upvotes++;
            this.votes.up.push(post_id);
            console.log('this post was upvoted',thisPost);
        }
    },
    downvotePost : function(post_id) {
        if (this.votes.down.find(downvotedPost => downvotedPost == post_id)) {
            console.log("this user has already voted on this post");
            return
        } else {
            let allPosts = getAllPosts();
            let thisPost = allPosts.find(post => post.post_id == post_id);

            thisPost.downvotes++;
            this.votes.down.push(post_id);
            console.log('this post was downvoted',thisPost);
        }
    },
    // User.upvote('post',1)
    upvote : function(type,post_id) {
        if (this.votes.up.find(upvoted => upvoted == post_id)) {
            console.log("this user has already voted on this " + type);
            return
        } else {
            let allPosts = getAllPosts();
            let thisPost = getThisPost(post_id);

            thisPost.upvotes++;
            this.votes.up.push(post_id);
            console.log('this post was upvoted',thisPost);
        }
    },
}