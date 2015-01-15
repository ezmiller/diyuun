module.exports = {

	ISBNError: function(message) {
		this.name = 'ISBNError';
		this.message = message;
		this.stack = Error().stack;
	},

	InvalidArgumentException: function(message) {
		this.name = 'InvalidArgumentException';
		this.message = message;
		this.stack = Error().stack;
	},

	FailedToPersistDataException: function(message) {
		this.name = 'FailedToPersistDataException';
		this.message = message;
		this.stack = Error().stack;
	}

}