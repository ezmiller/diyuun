module.exports = {

	ISBNError: function(message) {
		this.name = 'ISBNError';
		this.message = message;
		this.stack = Error().stack;
	}

}