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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_user_adminFunctions_js__ = __webpack_require__(2);
// import 'js/user_prototype.js';

//console.log('something');
Object(__WEBPACK_IMPORTED_MODULE_0__js_user_adminFunctions_js__["a" /* default */])();
//import * as thing from '/js/user_adminFunctions';
// import 'js/dom_objects.js';
// import 'js/dom_functions.js';
// import 'js/_global.js';

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = test;
// admin functions

var Admin = {
    createUser: function createUser(username, password) {
        users.push(new User(username, password));
    },

    findUser: function findUser(username) {
        console.log(users.filter(function (user) {
            return user.username == username;
        }));
    },

    getAllPosts: function getAllPosts() {
        var allPosts = [];
        users.forEach(function (user) {
            user.posts.forEach(function (post) {
                allPosts.push(post);
            });
        });
        return allPosts;
    },

    getThisPost: function getThisPost(post_id) {
        return getAllPosts().find(function (post) {
            return post.post_id == post_id;
        });
    },

    getUserFromPost: function getUserFromPost(post_id) {
        //debugger;

        var thisPost = getAllPosts().find(function (post) {
            return post.post_id == post_id;
        });
        console.log('Posted by', thisPost.user);
        return thisPost.user;
    },

    sortByVotes: function sortByVotes(type, id) {}

    // sample users
    //createUser("charlie","pass");
    //createUser("coolguy1","hunter2");


};function test() {
    console.log('anything');
}

// export {Admin};
//export var k = 1;
//export default "TEST";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);