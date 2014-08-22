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
		 	var image = data['image']
		 	console.log(rand);
		 	console.log(screen_name)
		 	console.log(description)
		 	var followForm = "<form action='/follow' name='follow' method='post'>" +
		 	"<input type='hidden' name='screen_name' value='" + screen_name + "'>" +
		 	"<input type='hidden' name='url' value='" + url + "'>" +
		    "<input type='hidden' name='description' value='" + description + "'>" + 
		    "<input type='hidden' name='image' value='" + image + "'>" + 
		    "<input type='submit' value='Follow User?'>" 
		 	+ "</form>"

		 	$(".random_tweets").html("<div class='big'><p>" + rand + "</p></div>" + followForm).hide().fadeIn(500)
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
			$(".random_tweets").html("<br><div class='big'>You have just followed " +
			"<a target='_blank' href='" + follow_url + "'>" + follow_name + "</a></div>").hide().fadeIn(500)
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
