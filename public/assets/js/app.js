$(document).on("ready", event => {
    $(".save-article").on("click",event => {
        const link = $(event.target).attr("data-link");
        const id = $(event.target).attr("id").split("-")[1];
        $.ajax({
            type: "POST",
            url: "/api/article",
            data: {
                link
            }
        }).then(response => {
            $(event.target).addClass("hidden");
            $(`#view-${id}`).removeClass("hidden");
        });
    })

    $(".remove-article").on("click",event => {
        const id = $(event.target).attr("data-_id");
        $.ajax({
            type: "DELETE",
            url: "/api/article/"+id
        }).then(response => {
            location.reload();
        })
    })

})