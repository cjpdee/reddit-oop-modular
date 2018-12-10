// COMPONENT MACROS

import DOMponents from './dom_objects';
import Admin from './user_adminFunctions';
import store from './store';
// function sortPosts(sortType) {}
var DOMFuncs;
export default DOMFuncs = {
    drawAllPosts : function() {
        Admin.getAllPosts().then(function(data) {
            console.log(data)
            data.forEach(function(post) {
                
                DOMponents.insertTop(DOMponents.drawPostFromObject(post));
            });
        })
    },
    drawThesePosts : function(sortedPosts) {
        sortedPosts.forEach(function(post) {
            DOMponents.drawPost(post.post_id).then(function(data) {
                DOMponents.insertTop(data);
            })
        });
    },

    populateUsersDropdown : function () {
        return new Promise(function(resolve) {
            $("[hook-js=select-user]").children().remove();
            store.getUsers().then(function(data) {
                data.forEach(function(data) {
                    $("[hook-js=select-user]").append(
                        $(`
                            <option value="${data.username}">
                                ${data.username}
                            </option>
                        `)
                    );
                });
                resolve();
            })
        })
    }
}
