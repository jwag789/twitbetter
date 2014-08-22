var redirected = false
var re = /.+/
function getRandomTweet(event){
	event.preventDefault();
	console.log("prevented");
	$.ajax('/random',
		  {method: 'post',
		  data: $("input[name=word]").serialize(),
		  dataType: 'json'
		 }).done(function(data){
		 	var rand = data['random'];
		 	var screen_name = data['screen_name'];
		 	var url = data['url']
		 	console.log(rand);
		 	console.log(screen_name)
		 	var followForm = "<form action='/follow' name='follow' method='post'>" +
		 	"<input type='hidden' name='screen_name' value='" + screen_name + "'>" +
		 	"<input type='hidden' name='url' value='" + url + "'>" +
		    "<input type='submit' value='Follow User?'>" 
		 	+ "</form>"

		 	$(".random_tweets").html("<p>" + rand + "</p>" + followForm)
		 })
}

function followUser(event){
	event.preventDefault();
	console.log("prevented to follow");
}



$(document).ready(function() {
	console.log("ready")
	console.log(re)
  $("form[name='random']").on('submit', getRandomTweet);
  $("form[name='follow']").on('submit', followUser);
});

if (window.location.pathname == '/followed') {
    window.setTimeout(function () {
        window.location.href = "/random";
    }, 2000)
};
