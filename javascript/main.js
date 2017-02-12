/* CURRENTLY IN: javascript/main.js */

SoundCloud.init('5503c7b55dabd29c9ed8b095f1e9cbd6');

var DOM = {};

DOM.init = function( inputSelector, submitSelector, resultsSelector, playlistSelector ) {
	var inputField = document.querySelector( inputSelector );
	var searchBtn = document.querySelector( submitSelector );
	DOM.searchResultsEl = document.querySelector( resultsSelector );
	DOM.playlistEl = document.querySelector( playlistSelector );

	searchBtn.addEventListener('click', function( e ) {
		DOM.search( inputField.value );
	});

	inputField.addEventListener('keypress', function( e ) {
		if ( e.which === 13 ) {
			DOM.search( this.value );
		}
	});

	var data = Playlist.getData();
	data.forEach( DOM.updateSidebar );
}

DOM.search = function( value ) {
	SoundCloud.getTracks( 'tracks', value )
	.then(function(tracks){
		DOM.searchResultsEl.innerHTML = "";
		tracks.forEach(DOM.drawTrack);
	});
}

DOM.drawTrack = function( track ) {
	var card = document.createElement('div');
	card.classList.add('card');

	// image
	var image = document.createElement('div');
	image.classList.add('image');

	var image__img = document.createElement('img');
	image__img.classList.add('image__img');
	image__img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/';

	image.appendChild( image__img );

	// content
	var content = document.createElement('div');
	content.classList.add('content');

	var header = document.createElement('div');
	header.classList.add('header');
	header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

	content.appendChild( header );

	// button
	var button = document.createElement('div');
	button.setAttribute('data-id', track.id)
	button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

	var icon = document.createElement('i');
	icon.classList.add('add', 'icon');

	var buttonText = document.createElement('span');
	buttonText.innerHTML = 'Add to playlist';

	button.appendChild( icon );
	button.appendChild( buttonText );

	button.addEventListener('click', function() {
		var id = track.id
		Playlist.add( id, DOM.updateSidebar );
	})

	// card
	card.appendChild( image );
	card.appendChild( content );
	card.appendChild( button );

	DOM.searchResultsEl.appendChild( card );
}

DOM.updateSidebar = function( id, data ) {
	SoundCloud.getTrack( id )
	.then( SoundCloud.getTrackAsHTML )
	.then( function( embedablePlayer ) {
		var widget = document.createElement('div');
		widget.innerHTML = embedablePlayer.html;

		if ( DOM.playlistEl.firstChild === null ) {
			DOM.playlistEl.appendChild( widget );
		}
		else {
			DOM.playlistEl.insertBefore( widget, DOM.playlistEl.firstChild );	
		}
		

		var SCWidget = SoundCloud.getWidget( widget.firstChild );
		SCWidget.bind('finish', function() {
			var index = Playlist.next();
			SoundCloud.getWidget( DOM.playlistEl.childNodes[ index ].firstChild ).play();
		});
		SCWidget.bind('play', function() {
			var idx = [].slice.call( DOM.playlistEl.children ).indexOf( widget );

			Playlist.setIndex( idx );
		});
	});
}

DOM.init( '.js-search', '.js-submit', '.js-search-results', '.js-playlist' );

