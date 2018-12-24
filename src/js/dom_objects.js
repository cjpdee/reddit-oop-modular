import Admin from './user_adminFunctions';
import store from './store';
import DOMFuncs from './dom_functions';
import User from './user_prototype';

var DOMponents;
export default DOMponents = {
    insertTop : function(element) {
        $("[hook-js=display]").prepend(element);
    },
    insertAfter : function(element,prevSibling){
        $(prevSibling).after(element);
    },
    reinsert : function(element) {
        let prevElement = $(element).prev();
        let nextElement = $(element).next();
        let thisPostId =  $(element).data("postId");
        $(element).remove();
        if(prevElement.length) {
            prevElement.after(DOMponents.drawPost(thisPostId));
        } else if(nextElement.length) {
            nextElement.before(DOMponents.drawPost(thisPostId));
        } else {
            DOMponents.insertTop(DOMponents.drawPost(thisPostId));
        }
    },
    drawPostFromObject : function(data) {
        var commentsArray;
        var date = new Date( data.date_posted );
        if(data.comments) {
            commentsArray = new Array(data.comments).map(comment => (
                `<span><strong>` + comment.user + `: </strong>` + comment.content + `</span>`
            )).join('<br />')
        }
        console.log(data);
        return $(`
            <div class="post" data-post-id="${data.post_id}">
                <div class="post__votes__wrap">
                    <button class="post__votes__upvote" post-js="upvote">${data.upvotes}</button>
                    <button class="post__votes__downvote" post-js="downvote">${data.downvotes}</button>
                </div>
                <div class="post__main">
                    <h3 class="post__header">${data.title}</h3>
                    <div class="post__details">
                        <span class="post__detail">${data.subreddit}</span>
                        <span class="post__detail">${data.user}</span>
                        <span class="post__detail">Date posted: 
                            ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
                            at 
                            ${date.getHours()}:${date.getMinutes()}
                        </span>
                    </div>
                    <div class="post__controls">
                        <span>
                            <label class="post__show-post" for="showPost-${data.post_id}">Show Post</label>
                            <input type="checkbox" name="showPost" id="showPost-${data.post_id}">
                            <div class="post__content">
                                ${data.content}
                                <div>
                                    <label for="showComments-${data.post_id}">Show Comments</label>
                                    <input type="checkbox" name="showComments" id="showComments-${data.post_id}">
                                    <button class="post__controls__btn" post-js="create-comment">Post Comment</button>
                                    <div class="post__comments">
                                        ${
                                            commentsArray
                                        }
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        `)
    },
    drawPost : function(post_id) {
        return new Promise(function(resolve) {
            Admin.getThisPost(post_id).then(function(data) {
                if(data.username) {
                    data.user = data.username;
                }
                var date = new Date( data.date_posted );
                console.log('instance of data',data)
                console.log(date)
                var commentsArray;
                if(data.comments) {
                    commentsArray = new Array(data.comments).map(comment => (
                        `<span><strong>` + comment.user + `: </strong>` + comment.content + `</span>`
                    )).join('<br />')
                }
                resolve( $(`
                    <div class="post" data-post-id="${data.post_id}">
                        <div class="post__votes__wrap">
                            <button class="post__votes__upvote" post-js="upvote">${data.upvotes}</button>
                            <button class="post__votes__downvote" post-js="downvote">${data.downvotes}</button>
                        </div>
                        <div class="post__main">
                            <h3 class="post__header">${data.title}</h3>
                            <div class="post__details">
                                <span class="post__detail">${data.subreddit}</span>
                                <span class="post__detail">${data.user}</span>
                                <span class="post__detail">Date posted: 
                                    ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
                                    at 
                                    ${date.getHours()}:${date.getMinutes()}
                                </span>
                            </div>
                            <div class="post__controls">
                                <span>
                                    <label class="post__show-post" for="showPost-${data.post_id}">Show Post</label>
                                    <input type="checkbox" name="showPost" id="showPost-${data.post_id}">
                                    <div class="post__content">
                                        ${data.content}
                                        <div>
                                            <label for="showComments-${data.post_id}">Show Comments</label>
                                            <input type="checkbox" name="showComments" id="showComments-${data.post_id}">
                                            <button class="post__controls__btn" post-js="create-comment">Post Comment</button>
                                            <div class="post__comments">
                                                ${
                                                    commentsArray
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                `)
                );
            })
        })
        
        
    },


    NewPostModal : {
        draw : function() {
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
                console.log($("#title").val());
                console.log($("#sub").val());
                console.log($("#content").val());
                 if(($("#title").val().length > 0) && ($("#sub").val().length > 0) && ($("#content").val().length >0)) {
                     console.log('its got it all');
                     DOMponents.NewPostModal.submit(e);
                 }
            });

            $("[modal-js=modal] textarea").on('keyup',function(e) {
                console.log(e);
                if(e.which==13){
                    DOMponents.NewPostModal.submit(e);
                }
            })
        },

        submit : function(e) {
            e.preventDefault();
            let $form = $(`[modal-js=modal]`).children().children("form");
            let input = {
                title : $form.children("#title").val(),
                subreddit : $form.children("#sub").val(),
                content : $form.children("#content").val(),
            }
            let newPost = store.getCurrentUser().createPost(input.subreddit,input.title,input.content);

            // DOMponents.insertTop(DOMponents.drawPost(newPost.post_id));
            $(`[modal-js=modal]`).remove();
        },
    },

    NewCommentModal : {
        draw : function(post) {
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
            $(`[modal-js=submit-comment]`).one('click',function(e) {
                e.preventDefault();
                DOMponents.NewCommentModal.submit(post);
            });
        },

        submit : function(post) {
            console.log('ello',post);      
            store.getCurrentUser().createComment(
                post.post_id,
                $("#content").val()
            ).then(function() {
                $(`[modal-js=modal]`).remove();
                DOMponents.reinsert(`[data-post-id=${post.post_id}]`);
            })

        }
    },

    NewUserModal : {
        draw : function() {
            $("body").append($(`
                <section class="modal__wrap" modal-js="modal">
                    <div class="modal">
                        <h1>New User</h1>
                        <form onSubmit="e.preventDefault">
                            <label for="username">Username</label>
                            <input type="text" id="username">
                            <label for="password">Password</label>
                            <input type="text" id="password">
                            <button modal-js="submit-user">Submit</button>
                        </form>
                    </div>
                </section>
            `));
            $(`[modal-js=submit-user]`).one('click',function(e) {
                e.preventDefault();
                DOMponents.NewUserModal.submit();
            });
        },
        submit: function() {
            let $form = $(`[modal-js=modal]`).children().children("form");
            let input = {
                username : $form.children("#username").val(),
                password : $form.children("#password").val()
            }
            $(`[modal-js=modal]`).remove();
            let newUser = new User(input.username,input.password);
            console.log(newUser);
            store.addUser(newUser);
            console.log(store.getUsers);
            DOMFuncs.populateUsersDropdown();
        }
    }
}