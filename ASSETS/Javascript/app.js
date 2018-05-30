
var topics = ["actions", "emotions", "reactions", "adjectives", "trending"];


function renderButtons () {
    $("#mood-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var topicBtn = $("<button>");

        topicBtn.addClass("topics");

        topicBtn.attr("data-moods", topics[i]);
        topicBtn.text(topics[i]);

        $("#mood-buttons").append(topicBtn);
        
    }
}
$("#add-moods").on("click", function(event) {
    
    event.preventDefault();

    var topic = $("#mood-input").val().trim();

    topics.push(topic);

    renderButtons();
    
});

renderButtons();


$("button").on("click", function displayGif() {

    var topic = $(this).attr("data-moods");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=gy5eeQA4GtheQkGfgqfgvuSlHdgYwBU7&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response) {
        console.log(response);

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);

            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var topicImg = $("<img class='gif'>");
            topicImg.attr("src", results[i].images.fixed_height_still.url);
            topicImg.attr("data-animate", results[i].images.fixed_height.url);
            topicImg.attr("data-still", results[i].images.fixed_height_still.url);
            topicImg.attr("data-state", "still");
            

            gifDiv.append(topicImg, p);

            $("#mood-views").prepend(gifDiv);

        }

        $(".gif").on("click", function() {
        
            var state = $(this).attr("data-state");
    
            if (state === "still") {
                $(this).attr("data-state", "animate");
                $(this).attr("src", $(this).attr("data-animate"));
            }
            else {
                $(this).attr("data-state", "still");
                $(this).attr("src", $(this).attr("data-still"));
            }    
        
        });
   
    })
    console.log(displayGif);
    console.log();
    $(document).on("click", "button.topics", displayGif);

    renderButtons();
})



