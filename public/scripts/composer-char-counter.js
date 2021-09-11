//counts when tweet characers have exceeded their limit
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
