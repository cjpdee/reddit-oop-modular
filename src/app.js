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
currentUser.upvote('post',0);
//Admin.findUser("myG").upvote('post',1);
//Admin.findUser("myG").upvote('comment',1);

console.log('admin',Admin);
console.log('store',store);
console.log(store.getUsers());
console.log(store.incrementPostCount());

DOMFuncs.populateUsersDropdown();
DOMFuncs.drawAllPosts(store.getUsers());

$("[hook-js=select-user]").on("change",function() {
    store.setCurrentUser(this.value);
})

$("[hook-js=new-post]").on("click",function() {
    DOMponents.NewPostModal.draw();
})



/*
how to make this shiet work:
instead of trying to directly change variables
try making functions which change the values

e.g getUsers(), getUser(currentUser).createPost()
incrementPostCount()
incrementCommentCount()



*/


// Admin.createUser("lol","p");
// var l = new User('name','pass');
// console.log(Admin);
// console.log(l);






// Admin.createUser("somename","somepass");
//var l = new Data.User();
// console.log(l);
//user[1].createPost("r","t","c");
// Admin.createUser('name','pass');
//console.log('something');
//import * as thing from '/js/user_adminFunctions';
// import 'js/dom_objects.js';
// import 'js/dom_functions.js';
// import 'js/_global.js';