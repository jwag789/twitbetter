function getRandomTweet(event){
	event.preventDefault();
	console.log("prevented");
	console.log("added");
	$.ajax('/random',
		  {method: 'post',
		  data: $("input[name=word]").serialize(),
		  dataType: 'json'
		 }).done(function(data){
		 	var rand = data['random'];
		 	var screen_name = data['screen_name'];
		 	console.log(rand);
		 	console.log(screen_name)
		 	var followForm = "<form action='/follow' method='post'>" +
		 	"<input type='hidden' name='screen_name' value='" + screen_name
		 	 + "'>"  + "<input type='submit' value='Follow User?'>" 
		 	+ "</form>"

		 	$(".random_tweets").append("<p>" + rand + "</p>" + followForm)
		 })
}

$(document).ready(function() {
  $("form[name='random']").on('submit', getRandomTweet);
});
