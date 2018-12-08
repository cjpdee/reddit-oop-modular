// COMPONENT MACROS

import DOMponents from './dom_objects';
import Admin from './user_adminFunctions';
import store from './store';
// function sortPosts(sortType) {}
var DOMFuncs;
export default DOMFuncs = {
    drawAllPosts : function(sortedPosts) {
        Admin.getAllPosts().forEach(function(post) {
            DOMponents.insertTop(DOMponents.drawPost(post.post_id));
        });
    },

    populateUsersDropdown : function () {
        $("[hook-js=select-user]").children().remove();
        store.getUsers.then(function(data) {
            data.forEach(function(user) {
                //console.log('user',user);
                $("[hook-js=select-user]").append(
                    $(`
                        <option value="${user.username}">
                            ${user.username}
                        </option>
                    `)
                );
            });
        })
    }
}
