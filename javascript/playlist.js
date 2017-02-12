var Playlist = {};

Playlist.current = 0;

Playlist.getData = function() {
	var currentlySavedData = localStorage.getItem('data');
	var data;

	if ( currentlySavedData ) {
		data = JSON.parse( localStorage.getItem('data') );
	}	
	else {
		data = [];
	}

	return data;
}

Playlist.saveData = function( data ) {
	localStorage.setItem('data', JSON.stringify( data ) );
}

Playlist.add = function( id, cb ) {
	var data = Playlist.getData();

	data.push( id );

	Playlist.saveData( data );

	if ( cb ) {
		cb( id );
	}
};

Playlist.next = function() {
	var data = Playlist.getData();

	Playlist.current++;

	if ( Playlist.current >= data.length ) {
		Playlist.current = 0;
	}

	return Playlist.current;
}

Playlist.setIndex = function( idx ) {
	var data = Playlist.getData();

	if ( idx >= 0 && idx < data.length ) {
		Playlist.current = idx;
	}
	
}