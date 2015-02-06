'use strict';

requirejs.config({
	baseUrl: "/assets",
    paths: {
    	'jquery': '/bower_components/jquery/dist/jquery',
    	'react': '/bower_components/react/react',
    	'backbone': '/bower_components/backbone/backbone',
    	'flux': '/bower_components/flux/dist/Flux',
    	'underscore': '/bower_components/underscore/underscore',
		'ourDispatcher': '/js/dispatcher/OurDispatcher',
		'constants': '/js/constants',
		'components': '/js/components',
		'stores': '/js/stores',
		'actions': '/js/actions',
    },
});

require(['jquery', 'react', 'components/AddBook'], function(jQuery, React, AddBook) {

	function render() {
		React.render(
			<AddBook />,
			document.getElementById('new-book-form')
		);
	}

	render();

}); // require