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



drawPost: function(post_id) {
    var post = Admin.getThisPost(post_id);
    console.log(post);
    
    $("[hook-js=display]").append($(`
        <div class="post" data-post-id="${post.post_id}">
            <div class="post__votes__wrap">
                <button class="post__votes__upvote">${post.upvotes}</button>
                <button class="post__votes__downvote">${post.downvotes}</button>
            </div>
            <div class="post__main">
                <h3 class="post__header">${post.title}</h3>
                <div class="post__details">
                    <span class="post__detail">${post.subreddit}</span>
                    <span class="post__detail">${post.user}</span>
                    <span class="post__detail">${post.date_posted}</span>
                </div>
                <div class="post__controls">
                    <span>
                        <label for="showPost">Show Post</label>
                        <input type="checkbox" name="showPost">
                    </span>
                    <span>
                        <label for="showComments">Show Comments</label>
                        <input type="checkbox" name="showComments">
                    </span>
                    <button class="post__controls__btn">Post Comment</button>

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
                        <button modal-js="submit">Submit</button>
                    </form>
                </div>
            </section>
        `));
        $(`[modal-js=modal]`).on('click',function(e){
            store.getCurrentUser().newPost.delete();
        }).children().click(function(){
            return false;
        });
        $(`[modal-js=submit]`).on('click',function(e){
            e.preventDefault();
            store.getCurrentUser().newPost.submit();
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

NewUserModal : function() {}

}