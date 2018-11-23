import store from './store';
import Admin from './user_adminFunctions';

// User Constructor
export default function User(username,password) {
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
            post_id: store.getPostCount(),
            date_posted: new Date(),
            upvotes: 0,
            downvotes: 0,
            title: title,
            user: this.username,
            content: content,
            subreddit: subreddit,
            comments: []
        }
        this.posts.push(post);
        store.incrementPostCount();
    },
    createComment : function(post_id,content) {
        let comment = {
            comment_id: store.getCommentCount(),
            post_id: post_id,
            date_posted: new Date(),
            upvotes: 0,
            downvotes: 0,
            content: content,
            subreddit: Admin.getThisPostSub(post_id)
        }
        this.comments.push(comment);
        store.incrementCommentCount();

        // pass this comment to the post it's linked to
        //Admin.getThisPost(post_id).comments.push(comment);
        
        Admin.getThisPost(post_id).comments.push(
            this.comments.find(item => item.comment_id == comment.comment_id)
        );
    },
    downvotePost : function(post_id) {
        if (this.votes.down.find(downvotedPost => downvotedPost == post_id)) {
            console.log("this user has already voted on this post");
            return
        } else {
            let allPosts = Admin.getAllPosts();
            let thisPost = allPosts.find(post => post.post_id == post_id);

            thisPost.downvotes++;
            this.votes.down.push(post_id);
            console.log('this post was downvoted',thisPost);
        }
    },
    // User.upvote('post',1)
    upvote : function(type,thing_id) {
        if (this.votes.up.find(upvoted => upvoted == thing_id)) {
            console.log("this user has already voted on this " + type);
            return
        } else {
            let thisThing;
            switch (type) {
                case 'post'   : thisThing = Admin.getThisPost(thing_id);
                case 'comment': thisThing = Admin.getThisComment(thing_id);
            }
            if(!thisThing) {
                console.log(`That ${type} doesn't exist!`);
                return
            }
            console.log("upvote()",thisThing);
            thisThing.upvotes++;
            this.votes.up.push(thing_id);
            console.log('this post was upvoted',thisThing);
        }
    },

    downvote : function(type,thing_id) {}
}