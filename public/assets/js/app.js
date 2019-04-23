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

    $(".view-comments").on("click",event => {
        const id = $(event.target).attr("data-_id");
        $(`#comments-${id}`).removeClass("hidden");
        $(event.target).addClass("hidden");
    });

    $(".submit-comment").on("click",event => {
        event.preventDefault();
        const id = $(event.target).attr("data-_id");
        const author = $(`#comment-author-${id}`).val().trim() || "Anonymous";
        const body = $(`#comment-text-${id}`).val().trim();
        if (body) {
            $.ajax({
                type: "POST",
                url: "/api/comment/"+id,
                data: {
                    author,
                    body
                }
            }).then(response => {
                location.reload();
            })
        }
    })
    $(".delete-comment").on("click",event => {
        const id= $(event.target).attr("data-_id");
        $.ajax({
            type: "DELETE",
            url: "/api/comment/"+id
        }).then(response => {
            location.reload();
        })
    })

    $("#clear").on("click",event => {
        $("#article-div").html("<h2>No new Articles</h2>");
    })

})