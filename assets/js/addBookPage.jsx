requirejs.config({
	baseUrl: "/assets",
    paths: {
    	'react': '/bower_components/react/react',
    	'mootools': '/bower_components/mootools/dist/mootools-core',
    	'eventEmitter': '/bower_components/eventEmitter/EventEmitter',
    	'flux': '/bower_components/flux/dist/Flux',
    	'underscore': '/bower_components/underscore/underscore',
		'ourDispatcher': '/js/dispatcher/OurDispatcher',
		'constants': '/js/constants',
		'components': '/js/components',
		'stores': '/js/stores',
		'actions': '/js/actions',
    },
});

require(['react', 'mootools', 'components/NewBookForm'], function(React, Mootools, NewBookForm) {

	function render() {
		React.render(
			<NewBookForm url="/book" />,
			document.getElementById('new-book-form')
		);
	}

	render();

}); // require