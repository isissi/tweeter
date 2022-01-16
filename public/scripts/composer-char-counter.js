$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").on("input", function() {
    let inputLength = $(this).val().length;
    let remaining = $(this).siblings(".button-group").children(".counter");

    remaining.text(140 - inputLength);

    if (inputLength > 140) {
      remaining.addClass("chara-red");
    } else {
      remaining.removeClass("chara-red");
    }
  })
});
