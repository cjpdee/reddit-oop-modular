


/*
=============================
------ EVENT LISTENERS ------
=============================
*/
// global
$("[hook-js=select-user]").on('change',function(e) {
    let thisUserName = $(e.currentTarget).val();
    currentUser = users.find(user => user.username == thisUserName);
    console.log(currentUser);
});

$("[hook-js=new-post]").on('click',function() {
    if (!currentUser) {
        console.log("No user is logged in");
    } else {
        this.content = {
            title : $()
        }
        currentUser.newPost = new NewPostModal();
        currentUser.newPost.draw();
    }
});






function init() {
    // drawAllPosts()
    // set user
}


populateUsersDropdown();


users[0].createPost('sub','mytitle','somecontent');
users[0].createPost('sub2','atitle','somecontent2');
users[1].createPost('hey','sometitle','something');