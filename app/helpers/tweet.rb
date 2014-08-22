def random_tweet(user, word)
    user.search("#{word}", :lang => "en").first
 end
