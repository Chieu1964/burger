// Make sure we wait to attach handlers until DOM is fully loaded.
$(function () {
    // Make a new burger:
    $(".create-update-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newburger").val().trim(),
            devoured: 0
        };

        // Send the POST request:
        $.ajax("/api/burgers/", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("A new burger has been made");
            // Reload the page to get the updated burger list
            location.reload();
        });
    });

    // Make new burger DONE!

    // Eat burger:
    $(".eatburger").on("click", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        var devouredStatus = {
            devoured: 1
        };

        // Send PUT request:
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredStatus
        }).then(function () {
            console.log("Burger devoured");
            location.reload();
        })
    })
    // Eat burger DONE!

    // Delete a burger from DB

    $(".trashburger").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");

        // Send DELETE request:
        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" + id
        }).then(location.reload());
    });

})