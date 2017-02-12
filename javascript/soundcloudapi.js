var SoundCloud = {};

SoundCloud.init = function( clientId ) {
	SC.initialize({
		client_id: clientId
	});
} // start

SoundCloud.getTracks = function( type, query ) {
	return SC.get( type, {
		q: query
	});
} // search

SoundCloud.getTrack = function( trackId ) {
	return SC.get('/tracks/' + trackId);
} // getTrack

SoundCloud.getTrackAsHTML = function( track ) {
	return SC.oEmbed(track.permalink_url, {
	    maxheight: 200,
	    show_comments: false,
	    sharing: false,
	    linking: false
	});
} // getEmbeds

SoundCloud.getWidget = function( html ) {
	return SC.Widget( html );
}


