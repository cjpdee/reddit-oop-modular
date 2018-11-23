/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_store__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_user_adminFunctions__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_dom_objects__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_dom_functions__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_dom_functions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__js_dom_functions__);
// import User from './js/user_prototype';
// import F from './js/dom_objects';
// import './js/_global.js';


// variable store





// import {getThisUser} from './js/store';
// import {getCurrentUser} from './js/store';

__WEBPACK_IMPORTED_MODULE_1__js_user_adminFunctions__["a" /* default */].createUser("myUser", "myPass");
__WEBPACK_IMPORTED_MODULE_1__js_user_adminFunctions__["a" /* default */].createUser("myG", "myPass");
var currentUser = __WEBPACK_IMPORTED_MODULE_1__js_user_adminFunctions__["a" /* default */].findUser("myUser");
currentUser.createPost('x', 'y', 'z');
currentUser.createPost('12', '3', '4');
currentUser.createComment(1, 'comment data');
currentUser.upvote('post', 0);
//Admin.findUser("myG").upvote('post',1);
//Admin.findUser("myG").upvote('comment',1);

console.log('admin', __WEBPACK_IMPORTED_MODULE_1__js_user_adminFunctions__["a" /* default */]);
console.log('store', __WEBPACK_IMPORTED_MODULE_0__js_store__["a" /* default */]);
console.log(__WEBPACK_IMPORTED_MODULE_0__js_store__["a" /* default */].getUsers());
console.log(__WEBPACK_IMPORTED_MODULE_0__js_store__["a" /* default */].incrementPostCount());

__WEBPACK_IMPORTED_MODULE_1__js_user_adminFunctions__["a" /* default */].populateUsersDropdown;
__WEBPACK_IMPORTED_MODULE_3__js_dom_functions__["default"].drawAllPosts(__WEBPACK_IMPORTED_MODULE_0__js_store__["a" /* default */].getUsers());

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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_prototype__ = __webpack_require__(8);



// admin functions
/* harmony default export */ __webpack_exports__["a"] = ((function () {
    var Admin = {
        createUser: function createUser(username, password) {
            __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getUsers().push(new __WEBPACK_IMPORTED_MODULE_1__user_prototype__["a" /* default */](username, password));
        },

        findUser: function findUser(username) {
            console.log("findUser()", __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getUsers().find(function (user) {
                return user.username == username;
            }));
            return __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getUsers().find(function (user) {
                return user.username == username;
            });
        },

        // Post functions

        getAllPosts: function getAllPosts() {
            var allPosts = [];
            __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getUsers().forEach(function (user) {
                user.posts.forEach(function (post) {
                    allPosts.push(post);
                });
            });
            return allPosts;
        },

        getThisPost: function getThisPost(post_id) {
            return Admin.getAllPosts().find(function (post) {
                return post.post_id == post_id;
            });
        },

        getThisPostSub: function getThisPostSub(post_id) {
            return Admin.getAllPosts().find(function (post) {
                return post.post_id == post_id;
            }).subreddit;
        },

        getUserFromPost: function getUserFromPost(post_id) {
            var thisPost = getAllPosts().find(function (post) {
                return post.post_id == post_id;
            });
            console.log('getUserFromPost()', thisPost.user);
            return thisPost.user;
        },

        sortByVotes: function sortByVotes(type, id) {},

        // Comment functions

        getAllComments: function getAllComments() {
            var allComments = [];
            __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getUsers().forEach(function (user) {
                user.comments.forEach(function (comment) {
                    allComments.push(comment);
                });
            });
            return allComments;
        },

        getThisComment: function getThisComment(comment_id) {
            return Admin.getAllComments().find(function (comment) {
                return comment.comment_id == comment_id;
            });
        }
    };
    return Admin;
})());

// sample users
//createUser("charlie","pass");
//createUser("coolguy1","hunter2");


// export {Admin};
//export var k = 1;
//export default "TEST";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = User;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_adminFunctions__ = __webpack_require__(2);



// User Constructor
function User(username, password) {
    this.username = username;
    this.password = password;
    this.date_created = new Date();
    this.comments = [];
    this.posts = [];
    this.votes = {
        up: [],
        down: []
    };
}

User.prototype = {
    createPost: function createPost(subreddit, title, content) {
        var post = {
            post_id: __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getPostCount(),
            date_posted: new Date(),
            upvotes: 0,
            downvotes: 0,
            title: title,
            user: this.username,
            content: content,
            subreddit: subreddit,
            comments: []
        };
        this.posts.push(post);
        __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].incrementPostCount();
    },
    createComment: function createComment(post_id, content) {
        var comment = {
            comment_id: __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].getCommentCount(),
            post_id: post_id,
            date_posted: new Date(),
            upvotes: 0,
            downvotes: 0,
            content: content,
            subreddit: __WEBPACK_IMPORTED_MODULE_1__user_adminFunctions__["a" /* default */].getThisPostSub(post_id)
        };
        this.comments.push(comment);
        __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */].incrementCommentCount();

        // pass this comment to the post it's linked to
        //Admin.getThisPost(post_id).comments.push(comment);

        __WEBPACK_IMPORTED_MODULE_1__user_adminFunctions__["a" /* default */].getThisPost(post_id).comments.push(this.comments.find(function (item) {
            return item.comment_id == comment.comment_id;
        }));
    },
    downvotePost: function downvotePost(post_id) {
        if (this.votes.down.find(function (downvotedPost) {
            return downvotedPost == post_id;
        })) {
            console.log("this user has already voted on this post");
            return;
        } else {
            var allPosts = __WEBPACK_IMPORTED_MODULE_1__user_adminFunctions__["a" /* default */].getAllPosts();
            var thisPost = allPosts.find(function (post) {
                return post.post_id == post_id;
            });

            thisPost.downvotes++;
            this.votes.down.push(post_id);
            console.log('this post was downvoted', thisPost);
        }
    },
    // User.upvote('post',1)
    upvote: function upvote(type, thing_id) {
        if (this.votes.up.find(function (upvoted) {
            return upvoted == thing_id;
        })) {
            console.log("this user has already voted on this " + type);
            return;
        } else {
            var thisThing = void 0;
            switch (type) {
                case 'post':
                    thisThing = __WEBPACK_IMPORTED_MODULE_1__user_adminFunctions__["a" /* default */].getThisPost(thing_id);
                case 'comment':
                    thisThing = __WEBPACK_IMPORTED_MODULE_1__user_adminFunctions__["a" /* default */].getThisComment(thing_id);
            }
            if (!thisThing) {
                console.log('That ' + type + ' doesn\'t exist!');
                return;
            }
            console.log("upvote()", thisThing);
            thisThing.upvotes++;
            this.votes.up.push(thing_id);
            console.log('this post was upvoted', thisThing);
        }
    },

    downvote: function downvote(type, thing_id) {}
};

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = ((function () {
    /*
    ============================
    ----------- DOM ------------
    ============================
    */

    // COMPONENTS


    function drawPost(post_id) {
        var post = getThisPost(post_id);

        $display.append($('\n        <div class="post" data-post-id="' + post.post_id + '">\n            <div class="post__votes__wrap">\n                <button class="post__votes__upvote">' + post.upvotes + '</button>\n                <button class="post__votes__downvote">' + post.downvotes + '</button>\n            </div>\n            <div class="post__main">\n                <h3 class="post__header">' + post.title + '</h3>\n                <div class="post__details">\n                    <span class="post__detail">' + post.subreddit + '</span>\n                    <span class="post__detail">' + post.user + '</span>\n                    <span class="post__detail">' + post.date_posted + '</span>\n                </div>\n                <div class="post__controls">\n                    <span>\n                        <label for="showPost">Show Post</label>\n                        <input type="checkbox" name="showPost">\n                    </span>\n                    <span>\n                        <label for="showComments">Show Comments</label>\n                        <input type="checkbox" name="showComments">\n                    </span>\n                    <button class="post__controls__btn">Post Comment</button>\n\n                </div>\n            </div>\n        </div>\n    '));
    }

    var NewPostModal = function NewPostModal() {
        var $currentModal;
        this.draw = function () {
            $("body").append($('\n            <section class="modal__wrap" data-user="' + currentUser.username + '" modal-js="modal">\n                <div class="modal">\n                    <h1>New Post</h1>\n                    <form onSubmit="e.preventDefault">\n                        <label for="title">Title</label>\n                        <input type="text" id="title">\n                        <label for="sub">Subreddit</label>\n                        <input type="text" id="sub">\n                        <label for="content">Content</label>\n                        <textarea name="" id="content" cols="30" rows="10"></textarea>\n                        <button modal-js="submit">Submit</button>\n                    </form>\n                </div>\n            </section>\n        '));
            $('[modal-js=modal]').on('click', function (e) {
                currentUser.newPost.delete();
            }).children().click(function () {
                return false;
            });
            $('[modal-js=submit]').on('click', function (e) {
                e.preventDefault();
                currentUser.newPost.submit();
            });
        };

        this.delete = function () {
            $('[modal-js=modal]').remove();
            delete currentUser.newPost;
        };

        this.submit = function () {
            console.log(this);
            var $form = $('[modal-js=modal]').children().children("form");
            var input = {
                title: $form.children("#title").val(),
                subreddit: $form.children("#sub").val(),
                content: $form.children("#content").val()
            };
            console.log(input);
        };
    };

    function NewUserModal() {}
})());

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var post_count = 1;
var comment_count = 0;
var users = [];
var currentUser;

var store = {
    // USER
    getUsers: function getUsers() {
        return users;
    },
    getCurrentUser: function getCurrentUser() {
        return currentUser;
    },
    setCurrentUser: function setCurrentUser(username) {
        currentUser: users[users.indexOf(username)];
    },
    // POSTS
    getPostCount: function getPostCount() {
        return post_count;
    },
    incrementPostCount: function incrementPostCount() {
        return post_count++;
    },

    getCommentCount: function getCommentCount() {
        return comment_count;
    },
    incrementCommentCount: function incrementCommentCount() {
        return comment_count;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: SyntaxError: \"DOM\" is read-only\n\n\u001b[0m \u001b[90m  5 | \u001b[39m\u001b[90m// function sortPosts(sortType) {}\u001b[39m\n \u001b[90m  6 | \u001b[39m\u001b[36mexport\u001b[39m \u001b[36mdefault\u001b[39m (\u001b[36mfunction\u001b[39m() {\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m  7 | \u001b[39m\u001b[33mDOM\u001b[39m \u001b[33m=\u001b[39m {\n \u001b[90m    | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m  8 | \u001b[39m    drawAllPosts \u001b[33m:\u001b[39m \u001b[36mfunction\u001b[39m(sortedPosts) {\n \u001b[90m  9 | \u001b[39m        sortedPosts\u001b[33m.\u001b[39mforEach(\u001b[36mfunction\u001b[39m(post) {\n \u001b[90m 10 | \u001b[39m            \u001b[33mDOM\u001b[39m\u001b[33m.\u001b[39mdrawPost(post\u001b[33m.\u001b[39mpost_id)\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ })
/******/ ]);