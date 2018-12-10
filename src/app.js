/*
https://github.com/mysqljs/mysql
https://www.getdonedone.com/building-the-optimal-user-database-model-for-your-application/
https://medium.com/@kimtnguyen/relational-database-schema-design-overview-70e447ff66f9
*/
import $ from './js/jquery';
import store from './js/store'; // for broad variables
import Admin from './js/user_adminFunctions';
import DOMponents from './js/dom_objects';
import DOMFuncs from './js/dom_functions';
import dom_functions from './js/dom_functions';
import User from './js/user_prototype';


var initEventListeners = function() {

    $("[hook-js=select-user]").on("change",function() {
        store.setCurrentUser(this.value);
        console.log('current user',store.getCurrentUser);
    })

    $("[hook-js=new-post]").on("click",function() {
        DOMponents.NewPostModal.draw();
    })

    $("[hook-js=new-user]").on("click",function() {
        DOMponents.NewUserModal.draw();
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


    
}

/*
    WEB SOCKETS
*/


store.getSocket().on('connect', function() {
    store.getSocket().emit('connected', "A Client has Connected");


    

    /*
        All this is for testing / debugging right now
    */

    // Admin.createUser('charlie','password');

    DOMFuncs.populateUsersDropdown().then(function(data){
        console.log(data)
        store.setCurrentUser("charlie")
            .then( function() {
                DOMFuncs.drawAllPosts();
            })
    })
});





$("[hook-js=test]").on("click",function() {
    console.log("button pressed")
    store.getSocket().emit('request', 'a request'); // emit an event to the socket
    store.getSocket().on('reply', () => { console.log("got reply") }); // listen to the event
})













initEventListeners();