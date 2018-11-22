/*
============================
----------- DOM ------------
============================
*/

// COMPONENTS

var $display = $("[hook-js=display]");
var $usersDropdown = $("[hook-js=select-user]");
var $newPostBtn = $("[hook-js=new-post]");
var $modal = $("[hook-js=modal]");

function drawPost(post_id) {
    var post = getThisPost(post_id);
    
    $display.append($(`
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
}


var NewPostModal = function() {
    var $currentModal;
    this.draw = function() {
        $("body").append($(`
            <section class="modal__wrap" data-user="${currentUser.username}" modal-js="modal">
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
            currentUser.newPost.delete();
        }).children().click(function(){
            return false;
        });
        $(`[modal-js=submit]`).on('click',function(e){
            e.preventDefault();
            currentUser.newPost.submit();
        });
    }

    this.delete = function() {
        $(`[modal-js=modal]`).remove();
        delete currentUser.newPost;
    }

    this.submit = function() {
        console.log(this);
        let $form = $(`[modal-js=modal]`).children().children("form");
        let input = {
            title : $form.children("#title").val(),
            subreddit : $form.children("#sub").val(),
            content : $form.children("#content").val(),
        }
        console.log(input);
    }
}

function NewUserModal() {}