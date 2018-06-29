$(document).ready(function () {
    $("#submit-button").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            method: "GET",
            url: "http://www.politifact.com/api/subjects/all/json/",
            dataType: "jsonp"
        }).then(function (response) {
            console.log(response);
            var politifactData = response;
            var inputValue = $("#search-input").val().trim();
            //giphyAPI
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=eb8e89c091bd409eb627bb0b7594c298&q=" + inputValue + "&limit=25&offset=0&rating=G&lang=en"
            $.ajax({
                method: "GET",
                url: queryURL
            }).then(function (response) {
                console.log(response.data);
                $("#results").empty();
                var items = response.data;
                for (var i = 0; i < items.length; i++) {
                    var div = $("<div>");
                    var img = $("<img>");
                    var select = $("<select>");
                    for (var j = 0; j < politifactData.length; j++) {
                        var option = $("<option>");
                        option.attr("value", politifactData[j].subject);
                        option.text(politifactData[j].subject);
                        select.append(option);
                    }
                    img.attr("src", items[i].images["480w_still"].url);
                    div.append(img, select);
                    $("#results").append(div);
                }
            });
        }).catch(function (err) {
            console.log("Error", err);
        });
    });
});