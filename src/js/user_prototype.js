import store from './store';
import Admin from './user_adminFunctions';
import DOMPonents from './dom_objects';

// console.log(store)
// store.startSocket();
// var socket = store.getSocket()


// User Constructor
export default function User(username,password,date_created,comments,comment_upvotes,comment_downvotes,posts,post_upvotes,post_downvotes) {
    this.username = username;
    this.password = password;
    if(date_created) {
        this.date_created = date_created;
        this.comments = comments;
        this.comment_votes = {
            up   : comment_upvotes,
            down : comment_downvotes
        }
        this.posts = posts;
        this.post_votes = {
            up   : post_upvotes,
            down : post_downvotes
        }
    } else {
        this.date_created = new Date();
        this.comments = "[]";
        this.comment_votes = {
            up   : "[]",
            down : "[]"
        }
        this.posts = "[]";
        this.post_votes = {
            up   : "[]",
            down : "[]"
        }
    }
}

User.prototype = {
    createPost : function(subreddit,title,content) {
        store.getPostCount().then(function(data) {
            var post = {
                post_id: data,
                date_posted: new Date(),
                upvotes: 0,
                downvotes: 0,
                title: title,
                user: store.getCurrentUser().username,
                content: content,
                subreddit: subreddit,
                comments: '[]'
            };
            store.getSocket().emit('userCreateNewPost',post);

            // this needs moving so it's only called once
            store.getSocket().on('userCreateNewPost',function(data) {
                console.log('UCNP',data);
                // store.parse(data)
                // turn the return into a regular old object
                store.incrementPostCount();
                DOMPonents.drawPost(data).then(function(data) {
                    console.log($(data));
                    DOMPonents.insertTop($(data));
                    store.getSocket().off('userCreateNewPost');
                })
            })
            return post
        });
    },
    deletePost : function(post_id) {
        this.posts.pop(post_id)
    },
    createComment : function(post_id,content) {
        return new Promise(function(resolve) {
            let comment;
            // commit comment to user
            // this.comments.push(comment);
            Admin.getThisPost(post_id).then(function(data) {
                comment = {
                    user: User.username,
                    comment_id: store.getCommentCount(),
                    post_id: data.post_id,
                    date_posted: new Date(),
                    upvotes: 0,
                    downvotes: 0,
                    content: content,
                    subreddit: data.subreddit
                }
                console.log(comment.user)
                store.incrementCommentCount();
                resolve(comment.comment_id);
            })
    
            // pass this comment to the post it's linked to
            // Admin.getThisPost(post_id).comments.push(comment);
        })
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

        let thisThing;
        

        console.log(this.post_votes);
        if (this.post_votes.find(upvoted => upvoted == thing_id)) {
            console.log("this user has already voted on this " + type);
            return
        } else {
            function doesNotExist() {
                if(!thisThing){
                    console.log(`That ${type} doesn't exist!`);
                    return
                }
            }

            switch (type) {
                case 'post'    :
                    thisThing = Admin.getThisPost(thing_id).then(doesItExist())
                    break
                case 'comment' :
                    thisThing = Admin.getThisComment(thing_id).then(doesItExist())
                    break
            }    
            if(!thisThing) {
                console.log(`That ${type} doesn't exist!`);
                return
            }
            console.log(type);
            console.log("upvote()",thisThing);
            thisThing.upvotes++;
            store.getCurrentUser().votes.up.push(thing_id);
            console.log('this post was upvoted',thisThing);
        }
    },

    downvote : function(type,thing_id) {
        if (this.votes.down.find(downvoted => downvoted == thing_id)) {
            console.log("this user has already voted on this " + type);
            return
        } else {
            let thisThing;
            switch (type) {
                case 'post'    : thisThing = Admin.getThisPost(thing_id); break
                case 'comment' : thisThing = Admin.getThisComment(thing_id); break
            }
            if(!thisThing) {
                console.log(`That ${type} doesn't exist!`);
                return
            }
            console.log("downvote()",thisThing);
            thisThing.downvotes++;
            store.getCurrentUser().votes.down.push(thing_id);
            console.log('this post was downvoted',thisThing);
        }
    }
}