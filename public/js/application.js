var redirected = false
var re = /.+/
function getRandomTweet(event){
	console.log(event)
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
		 	var description = data['description']
		 	console.log(rand);
		 	console.log(screen_name)
		 	console.log(description)
		 	var followForm = "<form action='/follow' name='follow' method='post'>" +
		 	"<input type='hidden' name='screen_name' value='" + screen_name + "'>" +
		 	"<input type='hidden' name='url' value='" + url + "'>" +
		    "<input type='hidden' name='description' value='" + description + "'>" + 
		    "<input type='submit' value='Follow User?'>" 
		 	+ "</form>"

		 	$(".random_tweets").html("<p>" + rand + "</p>" + followForm)
		 })
}

function followUser(event){
	console.log(event)
	event.preventDefault();
	console.log("prevented to follow");
	$.ajax('/follow',
		  {method: 'post',
		  data: $("form[name='follow']").serialize(),
		  dataType: 'json'
		}).done(function(data){
			console.log('done with follow')
			var follow_name = data['follow_name']
			var follow_url = data['follow_url']
			$(".random_tweets").append("<br>You have just followed " +
			"<a href='" + follow_url + "'>" + follow_name + "</a>")
		})
}



$(document).ready(function() {
	console.log("ready")
	console.log(re)
  $('body').on('submit', "form[name='random']", getRandomTweet);
  $('body').on('submit', "form[name='follow']", followUser);
});

// if (window.location.pathname == '/followed') {
//     window.setTimeout(function () {
//         window.location.href = "/random";
//     }, 2000)
// };
