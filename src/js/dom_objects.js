import Admin from './user_adminFunctions';
import store from './store';

var DOMponents;
export default DOMponents = {
/*
============================
----------- DOM ------------
============================
*/

// COMPONENTS



drawPost : function(post_id) {
    var post = Admin.getThisPost(post_id);
    //console.log(post);
    
    $("[hook-js=display]").append($(`
        <div class="post" data-post-id="${post.post_id}">
            <div class="post__votes__wrap">
                <button class="post__votes__upvote" post-js="upvote">${post.upvotes}</button>
                <button class="post__votes__downvote" post-js="downvote">${post.downvotes}</button>
            </div>
            <div class="post__main">
                <h3 class="post__header">${post.title}</h3>
                <div class="post__details">
                    <span class="post__detail">${post.subreddit}</span>
                    <span class="post__detail">${post.user}</span>
                    <span class="post__detail">Date posted: 
                        ${post.date_posted.getDate()}.${post.date_posted.getMonth()}.${post.date_posted.getFullYear()}
                        at 
                        ${post.date_posted.getHours()}:${post.date_posted.getMinutes()}
                    </span>
                </div>
                <div class="post__controls">
                    <span>
                        <label for="showPost-${post.post_id}">Show Post</label>
                        <input type="checkbox" name="showPost" id="showPost-${post.post_id}">
                        <div class="post__content">
                            ${post.content}
                            <div>
                                <label for="showComments-${post.post_id}">Show Comments</label>
                                <input type="checkbox" name="showComments" id="showComments-${post.post_id}">
                                <button class="post__controls__btn" post-js="create-comment">Post Comment</button>
                                <div class="post__comments">
                                    ${
                                        post.comments.map(comment => (
                                            `<span>${comment.content}</span>`
                                        )).join('<br />')
                                    }
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
                
            </div>
        </div>
    `));
},


NewPostModal : {
    draw : function() {
        console.log(store.getCurrentUser());
        $("body").append($(`
            <section class="modal__wrap" data-user="${store.getCurrentUser().username}" modal-js="modal">
                <div class="modal">
                    <h1>New Post</h1>
                    <form onSubmit="e.preventDefault">
                        <label for="title">Title</label>
                        <input type="text" id="title">
                        <label for="sub">Subreddit</label>
                        <input type="text" id="sub">
                        <label for="content">Content</label>
                        <textarea name="" id="content" cols="30" rows="10"></textarea>
                        <button modal-js="submit-post">Submit</button>
                    </form>
                </div>
            </section>
        `));
        $(`[modal-js=submit-post]`).on('click',function(e){
            e.preventDefault();
            console.log(
                $("#sub").val(),
                $("#title").val(),
                $("#content").val()
            );

            let thisPostId = Admin.getThisPost(
                store.getCurrentUser().createPost(
                    $("#sub").val(),
                    $("#title").val(),
                    $("#content").val()
                )
            ).post_id;
            console.log(Admin.getAllPosts());
            DOMponents.drawPost(thisPostId);
            $(`[modal-js=modal]`).remove();
            // (subreddit,title,content)
        });
    },

    delete : function() {
        $(`[modal-js=modal]`).remove();
        delete store.getCurrentUser().newPost;
    },

    submit : function() {
        console.log(this);
        let $form = $(`[modal-js=modal]`).children().children("form");
        let input = {
            title : $form.children("#title").val(),
            subreddit : $form.children("#sub").val(),
            content : $form.children("#content").val(),
        }
        console.log(input);
    }
},

NewCommentModal : {
    draw : function(post) {
        console.log(store.getCurrentUser());
        $("body").append($(`
            <section class="modal__wrap" data-user="${store.getCurrentUser().username}" modal-js="modal">
                <div class="modal">
                    <h1>New Comment : Post ${post.post_id}</h1>
                    <form onSubmit="e.preventDefault">
                        <label for="content">Content</label>
                        <textarea name="" id="content" cols="30" rows="10"></textarea>
                        <button modal-js="submit-comment">Submit</button>
                    </form>
                </div>
            </section>
        `));
        $(`[modal-js=submit-comment]`).on('click',function(e){
            e.preventDefault();
            console.log(
                $("#content").val()
            );

            let thisCommentId = Admin.getThisComment(
                store.getCurrentUser().createComment(
                    post.post_id,
                    $("#content").val()
                )
            ).comment_id;
            console.log(Admin.getAllComments());
            //DOMponents.drawPost(post.post_id);
            $(`[modal-js=modal]`).remove();
            $(`[data-post-id=${post.post_id}]`).remove();
            DOMponents.drawPost(post.post_id);
        });
    }
}

}