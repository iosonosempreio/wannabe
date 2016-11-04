var request = require('request');

var a = [
			{
		    	'name' : 'Metallica',
		    	'URI' : 'spotify:artist:2ye2Wgw4gimLv2eAKyk1NB'
		    },
		    {
		    	'name' : 'Queen',
		    	'URI' : 'spotify:artist:1dfeR4HaWDbWqFHLkxsg1d'
		    }
    	],
    linkFound = false,
    level = 1


// https://api.spotify.com/v1/artists/2ye2Wgw4gimLv2eAKyk1NB/related-artists

function getRelated(thisId) {
  var url = 'https://api.spotify.com/v1/artists/'+thisId+'/related-artists'
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body)
      body.artists.forEach(function(d,i){
      	console.log(d.name)
      	if (linkFound) {
      		console.log('got connection')
      	} else {
      		// getRelated(a[1].URI.split(':')[2])
      	}
      })
    }
  })
}



getRelated( a[0].URI.split(':')[2] )