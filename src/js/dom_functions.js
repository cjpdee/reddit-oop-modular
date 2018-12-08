// COMPONENT MACROS

import DOMponents from './dom_objects';
import Admin from './user_adminFunctions';
import store from './store';
// function sortPosts(sortType) {}
var DOMFuncs;
export default DOMFuncs = {
    drawAllPosts : function(sortedPosts) {
        sortedPosts.forEach(function(post) {
            DOMponents.insertTop(DOMponents.drawPost(post.post_id));
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
