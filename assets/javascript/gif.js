// create an array of themes for the buttons 
// topics
var emotions = ["excited", "sad", "groovy", "accomplished", "hungry"];
var apiKey = "sZR5ZpCqMPKZXVX0X6IphpQPULnfT8eJ";

// create the buttons,

function displayEmotions() {
    var emotion = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=sZR5ZpCqMPKZXVX0X6IphpQPULnfT8eJ&limit=10";
// this puts a limit of 10 images to be displayed at once w/ and api key

// create the ajax call using the api key and query url
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
// dynamically generating a div to hold the 'emotion'
var emotionDiv = $("<div class = 'emotion'>");  

// convert the response into a variable
var results = response.data;

// loop through the results
for (var i = 0; i < results.length; i++) {
  
  // create a variable to hold the items/gifs
  var gifDiv = $("<div class='item'>");

  // create a variavble displaying the rating
  var rating = results[i].rating;

  // convert the rating over to the html so it shows on the document
var p = $("<p>").text("Rating: " + rating);

// this created a class for the image placement
  var emotionImg = $("<img>");

// finding the current state of the gifs - to make them pause/start
emotionImg.attr("src", results[i].images.fixed_height_still.url);
emotionImg.attr("data-still", results[i].images.fixed_height_still.url);
emotionImg.attr("data-animate", results[i].images.fixed_height.url);
emotionImg.attr("data-state", "still");
emotionImg.attr("class", "gif");


  // add a source attribute 
  emotionImg.attr("src", results[i].images.fixed_height_still.url);
  // emotionImg.attr("src", results[i].images.fixed_height.url);

  // prepend the results to the p tag
  emotionDiv.prepend(p);

  // prepend the result to the html
  emotionDiv.prepend(emotionImg);

  // prepend the gifs to the emotions view class linking html
  $("#emotions-view").prepend(emotionDiv);
    }
  })
} 
// Function for displaying 'emotions' data
function renderButtons() {
    // deletes the users input before adding new 'emotions', no repeat buttons
    $("#buttons-view").empty();

    // loop through the array
    for (var i = 0; i < emotions.length; i++) {
      // Then dynamicaly generating buttons for each 'emotion' in the array
      var newButton = $("<button>");
      // Adding a class of emotions-btn to our button
      newButton.addClass("emotion-btn");
      // Adding a data-attribute
      newButton.attr("data-name", emotions[i]);
      // Providing the initial button text
      newButton.text(emotions[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(newButton);
    }
  }

  // This function handles events where an emotion button is clicked
  $("#add-emotion").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var emotion = $("#emotion-input").val().trim();
    // .trim() -  will trim any excess spaces that the user may accidentally add on in the search.

    // Adding emotions from the textbox to the array 
    emotions.push(emotion);

    // Calling renderButtons which handles the processing of our array
    renderButtons();
  });

  //////////




  //PAUSE GIFS on click

  // create new variable and assign it to a function - pause gifs
  var pauseImages = function(){

// to stop the page from reloading completely when clicked
      event.preventDefault();
  

      var state = $(this).attr("data-state");

  // conditional statement to change still to animate, or animate to still
      if(state === 'still'){
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      }else if(state === 'animate'){
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }
  }



  // Adding a click event listener to all elements with a class of "emotions-btn", and "gif"
  $(document).on("click", ".emotion-btn", displayEmotions);
  
  $(document).on("click", ".gif", pauseImages);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();




