// COMPONENT MACROS

// function sortPosts(sortType) {}

function drawAllPosts(sortedPosts) {
    sortedPosts.forEach(function(post) {
        drawPost(post.post_id);
    });
}

function populateUsersDropdown() {
    users.forEach(function(user) {
        $usersDropdown.append(
            $(`
                <option value="${user.username}">
                    ${user.username}
                </option>
            `)
        );
    });
}