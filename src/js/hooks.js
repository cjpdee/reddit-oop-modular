(function(){
    var $display = $("[hook-js=display]");
    var $usersDropdown = $("[hook-js=select-user]");
    var $newPostBtn = $("[hook-js=new-post]");
    var $modal = $("[hook-js=modal]");

    return {
        $display : $display,
        $usersDropdown : $usersDropdown,
        $newPostBtn : $newPostBtn,
        $modal : $modal
    }
})()