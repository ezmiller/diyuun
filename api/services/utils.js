var Promise = require('promise');

module.exports = {

	/**
	 * Takes an array of source objects and returns a promise
	 * that adds any sources not yet in the local sources database.
	 * It detects if the source is not yet added by the presence 
	 * of the 'web_source' property on the source object.
	 * @param  {Array|Object} sources An array or object containing sources
	 * @return {Promise}         A Promise function that adds the sources
	 */
	processWebSources: function(sources) {

		if (_.isArray(sources) === false) {
			sources = Array(sources);
		}

		return Promise.all(sources.map(function(source) {
			
			if (!source.websource) return source;

			return Source.create(source).then(function(newSource) {
				return newSource;
			}).catch(function(err) { throw err; });

		})).catch(console.log.bind(console));
	
	}

}