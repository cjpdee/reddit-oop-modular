// import User from './js/user_prototype';
// import F from './js/dom_objects';
// import './js/_global.js';

import $ from './js/jquery';

// variable store
import store from './js/store';
import Admin from './js/user_adminFunctions';
import DOMponents from './js/dom_objects';
import DOMFuncs from './js/dom_functions';

// import {getThisUser} from './js/store';
// import {getCurrentUser} from './js/store';

Admin.createUser("myUser","myPass");
Admin.createUser("myG","myPass");
let currentUser = Admin.findUser("myG");
currentUser.createPost('CoolSub','My G\'s Post','What\'s up all the gs of the world');
currentUser.createPost('CoolerSub','GGGGG','ggggggggggggggggggggg');
currentUser.createComment(1,'comment data');
currentUser.createComment(1,'my g this is sick');
currentUser.createComment(2,'commf dfsds2');
// currentUser.upvote('post',1);
//Admin.findUser("myG").upvote('post',1);
//Admin.findUser("myG").upvote('comment',1);

// console.log('admin',Admin);
// console.log('store',store);
// console.log(store.getUsers());

DOMFuncs.populateUsersDropdown();
DOMFuncs.drawAllPosts(store.getUsers());

$("[hook-js=select-user]").on("change",function() {
    store.setCurrentUser(this.value);
})

$("[hook-js=new-post]").on("click",function() {
    DOMponents.NewPostModal.draw();
})

$("[hook-js=display]").on("click","[post-js=create-comment]",function() {
    let thisPostId = $(this).parents(".post").first().data("post-id");
    let thisPost   = Admin.getThisPost(thisPostId)
    DOMponents.NewCommentModal.draw(thisPost);
})

$("[hook-js=display]").on("click","[post-js=upvote]",function() {
    // TO DO: check if user has up-or-downvoted on post
    // and if they have done the opposite already, remove that
    // up/downvote
    let thisPostId = $(this).parents(".post").first().data("post-id");
    let thisPost   = Admin.getThisPost(thisPostId);
    currentUser.upvote('post',thisPostId);
    $(this).text(thisPost.upvotes);
})

$("[hook-js=display]").on("click","[post-js=downvote]",function() {
    // TO DO: check if user has up-or-downvoted on post
    // and if they have done the opposite already, remove that
    // up/downvote
    let thisPostId = $(this).parents(".post").first().data("post-id");
    let thisPost   = Admin.getThisPost(thisPostId);
    currentUser.downvote('post',thisPostId);
    $(this).text(thisPost.downvotes);
})

// // modal event listeners
$(document).on('click',"[modal-js=modal]",function(){
    $(`[modal-js=modal]`).remove();
})

$(document).on('click',"[modal-js=modal] > div",function(){
    return false;
});

// $("input[type=checkbox]").parent().on('change',function(){return false})
