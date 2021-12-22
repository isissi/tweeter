/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Preventing XSS with Escaping
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const creatTweetElement = function (tweetData) {
  const safeTweet = `<p id="tweet">${escape(tweetData.content.text)}</p>`;
  const html = `
  <article> 
    <header class="tweet-header">
      <div class="tweet-heade-group">
        <img src="${tweetData.user.avatars}" alt="avatar" id="tweet-avatar">
        <span>${tweetData.user.name}</span>
      </div>
      <span id="user-name">${tweetData.user.handle}</span>
    </header>

    ${safeTweet}

    <footer>
      <hr>
      <div class="date-icon-group">
        <span id="date">${timeago.format(tweetData.created_at)}</span>
          <div>
            <i class="fas fa-flag fa-xs icons"></i>
            <i class="fas fa-retweet fa-xs icons"></i>
            <i class="fas fa-heart fa-xs icons"></i>
          </div>
      </div>
    </footer>
  </article> 
  `;

  return html;
};

//Loop through all tweets and append to index.html
const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const newTweet = creatTweetElement(tweet);
    const container = $("#tweets-container");

    container.prepend(newTweet);
  }
};

//responsible for fetching tweets from the http://localhost:8080/tweets page
const loadTweets = function () {
  $.ajax("/tweets", { method: "GET" }).then((res) => {
    renderTweets(res);
  });
};

loadTweets();

$(document).ready(function () {
  //Show back-to-top button when the 
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $("nav").slideUp("slow", function () {
        $("#to-top").show();
      });
    } else {
      $("nav").slideDown("slow", function () {
        $("#to-top").hide();
      });
    }
  });

  //Back to top when the button is clicked
  //1 second of animation time
  //html works for FFX but not Chrome
  //body works for Chrome but not FFX
  $("#to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "1000");
    $("form").slideDown("slow");
    $("textarea").focus();
  });

  //Hide/show the form when click the nav bar arrows
  $("#nav-btn").click(function () {
    $("form").slideToggle("slow");
    $("textarea").focus();
  });

  //Add an Event Listener and Prevent the Default Behaviour
  $("form").submit(function (event) {
    event.preventDefault();

    //When submit slide up all errors and remove the error element
    $(".error").slideUp("slow", () => {
      $(".error").remove();
    });

    const form = $(this);
    const input = form.find("#tweet-text").val();

    //Add error message
    if (!input) {
      $(".new-tweet").prepend(
        `<div class="error empty-sbmt">
          <i class="far fa-dizzy"></i>
          <p><b>Error: </b>Sorry, you can't publish an empty tweet. </p>
        </div>`
      );
      $(".empty-sbmt").slideDown("slow");
    } else if (input.length > 140) {
      $(".new-tweet").prepend(
        `<div class="error exceed-sbmt">
          <i class="far fa-dizzy"></i>
          <p><b>Error: </b>Sorry, the tweet you are trying to publish exceeds maximum character limit. </p>
        </div>`
      );
      $(".exceed-sbmt").slideDown("slow");
    } else {
      $.ajax({
        type: "POST",
        url: "tweets",
        data: form.serialize(),
      })

        .then(() => {
          return $.ajax("/tweets", { method: "GET" });
        })

        .then((res) => {
          //Reset form input and counter
          renderTweets(res);
          form[0].reset();
          form.find(".counter").text(140);
        });
    }
  });
});
