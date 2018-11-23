// COMPONENT MACROS

import DOM from './dom_objects';

// function sortPosts(sortType) {}
export default (function() {
DOM = {
    drawAllPosts : function(sortedPosts) {
        sortedPosts.forEach(function(post) {
            DOM.drawPost(post.post_id);
        });
    },

    populateUsersDropdown : function () {
        store.getUsers().forEach(function(user) {
            $usersDropdown.append(
                $(`
                    <option value="${user.username}">
                        ${user.username}
                    </option>
                `)
            );
        });
    }
}
// this page is fucked
})()