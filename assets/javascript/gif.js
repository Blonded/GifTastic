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

  // add a source attribute 
  emotionImg.attr("src", results[i].images.fixed_height.url);

  // prepend the results to the p tag
  emotionDiv.prepend(p);

  // prepend the result to the html
  emotionDiv.prepend(emotionImg);

  // prepend the gifs to the emotions view class linking html
  $("#emotions-view").prepend(emotionDiv);
}
})
} 

// closes function display 'emotions'

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

  // Adding a click event listener to all elements with a class of "emotions-btn"
  $(document).on("click", ".emotion-btn", displayEmotions);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();


// have 4/6 pre-existing button options
    // excited, sad, groovy, accomplished, hungry
    // WITH PARAMETERS q, limit, rating

        //  with option to take in input from the user
        // when the user inputs a new emotion, dynamically generate a button to the html

// q :
// limit : Only allow 10 gifs to be displayed at a time
// rating : Limit the gif rating to PG/Pg13

// Pause the Gif when it is clicked, and unpause it when it is clicked again. START AS STATIC 


// RATING and PAUSING GIFS LAST. 


