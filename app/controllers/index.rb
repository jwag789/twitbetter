get '/' do
  @user = User.find(session[:user_id]) if session[:user_id]
  erb :index
end

get '/sign_in' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  redirect request_token.authorize_url
end

get '/sign_out' do
  session.clear
  redirect '/'
end

get '/auth' do

  # the `request_token` method is defined in `app/helpers/oauth.rb`
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  # our request token is only valid until we use it to get an access token, so let's delete it from our session
  session.delete(:request_token)
  @user = User.find_or_create_by(oauth_token: @access_token.token, oauth_secret: @access_token.secret, username: @access_token.params[:screen_name])
  # at this point in the code is where you'll need to create your user account and store the access token

  session[:user_id] = @user.id

  erb :index

end

post '/tweet' do
  user = User.find(session[:user_id])

  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV["CONSUMER_KEY"]
    config.consumer_secret     = ENV["CONSUMER_SECRET"]
    config.access_token        = user.oauth_token
    config.access_token_secret = user.oauth_secret
  end

  client.update(params[:text])

  redirect '/'
end

get '/mentions' do
  @user = User.find(session[:user_id])
  
  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV["CONSUMER_KEY"]
    config.consumer_secret     = ENV["CONSUMER_SECRET"]
    config.access_token        = @user.oauth_token
    config.access_token_secret = @user.oauth_secret
  end
  @mentions = client.mentions
  erb :mentions
end

get '/random' do
   puts session[:screen_name] if session[:screen_name]
   session[:screen_name].clear if session[:screen_name]
   puts session[:screen_name]
   @user = User.find(session[:user_id])
  
  # client = Twitter::REST::Client.new do |config|
  #   config.consumer_key        = ENV["CONSUMER_KEY"]
  #   config.consumer_secret     = ENV["CONSUMER_SECRET"]
  #   config.access_token        = @user.oauth_token
  #   config.access_token_secret = @user.oauth_secret
  # end


  # @random = random_tweet(client, "random")

  # @random = random_tweet(client, "hello")
  # puts @random
  # puts @random

  erb :random
end

post '/random' do
  @user = User.find(session[:user_id])

  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV["CONSUMER_KEY"]
    config.consumer_secret     = ENV["CONSUMER_SECRET"]
    config.access_token        = @user.oauth_token
    config.access_token_secret = @user.oauth_secret
  end

  @random = random_tweet(client, params[:word])
  @message = @random.text
  @split_message = @message.split(" ")
  matches = @message.scan(/http:\/\/[^ !"*()]+/)
  @split_message.each do |word|
    if matches.include?(word)
      puts "SO AWESOMEEEE"
      puts word
      puts word
      puts word
      word.gsub!(word, "<a href='#{word}'>#{word}</a>")
    end
  end
  @message = @split_message.join(" ")

  @screen_name = @random.user.screen_name
  @url = @random.user.uri.to_s
  @description = @random.user.description
  @image = @random.user.profile_image_uri_https.to_s
  puts @screen_name
  {random: @message, screen_name: @screen_name, url: @url, description: @description, image: @image}.to_json
end

post '/follow' do
  @user = User.find(session[:user_id])

  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV["CONSUMER_KEY"]
    config.consumer_secret     = ENV["CONSUMER_SECRET"]
    config.access_token        = @user.oauth_token
    config.access_token_secret = @user.oauth_secret
  end

  @screen_name = params[:screen_name]
  @url = params[:url]
  @description = params[:description]
  @image = params[:image]
  Friend.create(screen_name: @screen_name, url: @url, description: @description, user_id: @user.id, image: @image)
  client.follow(@screen_name)

  {follow_name: @screen_name, follow_url: @url}.to_json
end

get '/followed' do
  @user = User.find(session[:user_id])
  @friends = @user.friends.reverse
  puts @friends
  erb :followed
end













