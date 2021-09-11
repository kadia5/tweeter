$(document).ready(function() {
  $("#tweet-text").on("input", event => {
    const counter = event.target.value.length;
    const inputLength = 140 - counter;
    $(".counter").text(inputLength)
    if (inputLength < 0) {
      $(".counter").css({"color": "red"})
    }
  })
});

// $("#btn").on('click', function() {
//   console.log(this); //The this keyword is a reference to the button
// });