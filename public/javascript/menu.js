$(document).ready(function () {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

    // Check for click events on the search icon
    $("#searchIcon").click(function () {
        // Toggle the search bar on mobile and tablet devices"
        $(".navbar-search").toggleClass("search-hide");
    });
});

$('img').on('error', function (event) {
    console.log('triggered');
    $(this).attr('src',
        "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg");
});
