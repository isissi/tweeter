/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const creatTweetElement = function (tweetData) {
  const html = `
  <article> 
    <header class="tweet-header">
      <div class="tweet-heade-group">
        <img src="${tweetData.user.avatars}" alt="avatar" id="tweet-avatar">
        <span>${tweetData.user.name}</span>
      </div>
      <span id="user-name">${tweetData.user.handle}</span>
    </header>

    <p id="tweet">
      ${tweetData.content.text}
    </p>

    <footer>
      <hr>
      <div class="date-icon-group">
        <span id="date">${createdDate(tweetData)}</span>
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
}

const createdDate = function (tweetData) {
  const today = new Date();
  const date = new Date(parseInt(tweetData.created_at));
  const timeAgo = (today - date) / 1000;

  if (timeAgo <= 60) {
    return `Just posted`;
  } else if (timeAgo > 60 && timeAgo < 3600) {
    result = Math.floor(timeAgo / 60);
    return `${result} minutes ago`;
  } else if (timeAgo > 360 && timeAgo < 84600) {
    result = Math.floor(timeAgo / 60 / 60);
    if (result === 1) {
      return `1 hour ago`;
    }
    return `${result} hours ago`
  } else if (timeAgo >= 84600 &&  timeAgo < 2592000) {
    result = Math.floor(timeAgo / 60 / 60 / 24);
    if (result === 1) {
      return `1 day ago`;
    }
    return `${result} days ago`;
  } else if (timeAgo > 2592000 && timeAgo < 31536000) {
    result = Math.floor(timeAgo / 60 / 60 / 24 / 30);
    if (result === 1) {
      return `1 month ago`;
    }
    return `${result} months ago`;
  } else {
    result = Math.floor(timeAgo / 31536000);
    if (result === 1) {
      return `1 year ago`;
    }
    return `${result} years ago`;
  }

}

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    const newTweet = creatTweetElement(tweet);
    const container = $('#tweets-container');

    container.append(newTweet);
  }
}


$(document).ready(function () {
  renderTweets(data);
});
