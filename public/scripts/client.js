$ (document).ready (function () {
  const renderTweets = function (tweets) {
    //When a tweet is made allows newest tweet to appear at top of page when rendered
    tweets.forEach (tweet => {
      $ ('.tweets').prepend (createTweetElement (tweet));
    });
  };

  //1-use time ago library get current date 2-curent date/time subtracted from original tweet creation date i.e. created_at 3= change d
  const createTweetElement = function (tweet) {
    const {content, created_at, user} = tweet;
    const escape = function (str) {
      let div = document.createElement ('div');
      div.appendChild (document.createTextNode (str));
      return div.innerHTML;
    };
    //jquery tweet obj holding information from the database
    const $tweet = `
    <article class="tweet">
        <header>
          <div class="user">
            <div class="user-image-container"> 
              <img src="${user.avatars}" alt="user avatar"/>
            </div>
            <span>${user.name}</span>
          </div>
          <span class="tag">${user.handle}</span>
        </header>
        <span class="tweet-text">${escape (content.text)} </span>
        <footer>
          <span class="tweetTime">${timeago.format (created_at)}</span>
          <div class="symbols">
            <!-- flags below -->
            <i class="fas fa-solid fa-flag"></i>
            <i class="fas fa-solid fa-retweet"></i>
            <i class="fas fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;

    return $tweet;
  };

  //on submit the data becomes tweets in rendertweets function
  $ ('#tweet-form').on ('submit', function (event) {
    event.preventDefault ();
    const data = $ (this).serialize ();
    const tweetValue = $ (this).find ('textarea').val ();
    // tweetValue == '' || tweetValue.length > 140 || tweetValue == null
    if (tweetValue.length === 0 || tweetValue.length > 140) {
      $ ('.error-msg').slideDown ({
        start: function () {
          $ (this).css ({
            display: 'flex',
          });
        }
      });
    }
    $.post ('/tweets', data)
      //calls the loadTweets function again if the user submitted a valid tweet
      .then (() => {
        $ ('.error-msg').slideUp ({
          start: function () {
            $ (this).css ({
              display: 'none',
            });
          }
        });
      })
      .then (() => {
        loadTweets ();
      });
  });
  //jquery ajax get request to tweets that renders tweet data
  const loadTweets = function () {
    $.ajax ({url: '/tweets', method: 'GET'}).then (function (response) {
      renderTweets (response);
    });
  };
  loadTweets ();
});

/*TO DO:
fix error reappearance condition for words over 140/null
add screenshots and push
*/
