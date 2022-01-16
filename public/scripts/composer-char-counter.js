$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").on("input", function() {
    const inputLength = $(this).val().length;
    const remaining = $(this).siblings(".button-group").children(".counter");

    remaining.text(140 - inputLength);

    if (inputLength > 140) {
      remaining.addClass("chara-red");
    } else {
      remaining.removeClass("chara-red");
    }
  })
});
