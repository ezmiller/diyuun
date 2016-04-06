'use strict';

var Promise = require('promise'),
    request = require('request'),
    human = require('humanparser'),
    _ = require('underscore');


module.exports = (function() {

  var googleBooksUrl = 'https://www.googleapis.com/books/v1/volumes';

  var mendeleyUrl = 'https://api.mendeley.com';
  var mendeleyAccessToken = null;

  function getResults(searchTerms, callback) {

    console.log('WebSources::getResults() searchTerms: ', searchTerms);

    var localSearchTerms = { where: { or : []} };
    if (searchTerms.query) {
      localSearchTerms.where.or.push({title: {contains: searchTerms.query}});
    };

    var googSearchTerms = { q: '' };
    if (searchTerms.title) googSearchTerms.q += searchTerms.title;
    if (searchTerms.author) googSearchTerms.q += searchTerms.author;
    if (searchTerms.query) googSearchTerms.q += searchTerms.query;


    Promise.resolve(getLocalResults(localSearchTerms))
      .then(function(localResults) {
        
        Promise.resolve(getGoogleBookResults(googSearchTerms))
          .then(function(googResults) {
            var i, len, finalResults;
            
            finalResults = localResults;
            googResults = parseGoogleBooksData(JSON.parse(googResults));

            for (i = 0, len = googResults.length; i < len; i++) {
              if ( !isDuplicate(googResults[i], finalResults) ) {
                finalResults.push(googResults[i]);
              }
            }
            return finalResults;
            
          })
          .then(function(results) {
            callback(null, results);
          })
          .catch(function(err) {
            throw err;
          });

      })
      .catch(function(err) {
        callback(err, null);
      });

  }

  function isDuplicate(newItem, results) {
    if (results.length === 0) return false;
    var found = _.find(results, function(item) {
      return newItem.title.toLowerCase() === item.title.toLowerCase();
    });
    return found;
  }

  function getLocalResults(searchTerms) {
    return Source.find()
      .where(searchTerms)
      .populate('authors')
      .then(function(found) {
        return found;
      })
      .catch(function(err) {
        throw err;
      });
  };



  function parseGoogleBooksData(raw) {
    var result = [];

    _.each(raw.items, function(v,k) {
      var o = {};

      // Skip item if key data is missing.
      if (v.volumeInfo.authors === undefined || 
          v.volumeInfo.categories === undefined ||
          v.volumeInfo.title === undefined ||
          v.volumeInfo.publisher === undefined) {
        return;
      }

      // Build source object.
      o.id = v.id;
      o.type = 'book';
      o.identifiers = v.volumeInfo.industryIdentifiers;
      o.title = v.volumeInfo.title;
      o.subtitle = v.volumeInfo.subtitle;
      o.description = v.volumeInfo.description;
      o.authors = parseGoogleAuthors(v.volumeInfo.authors);
      o.publisher = v.volumeInfo.publisher;
      o.year = v.volumeInfo.publishedDate;
      o.language = v.volumeInfo.language;
      o.categories = v.volumeInfo.categories;
      o.abstract = v.volumeInfo.description;
      o.imageLinks = v.volumeInfo.imageLinks !== undefined ? v.volumeInfo.imageLinks : null;
      o.googleSelfLink = v.selfLink;
      o.websource = 'google_books';

      result.push(o);
    });

    console.log('WebSources::parseGoogleBooksData()  found', result.length);

    return result;
  }

  function getGoogleBookResults(searchTerms) {
    return new Promise(function(resolve, reject) {
      var options = {
        url: googleBooksUrl,
        method: 'GET',
        qs: searchTerms
      };
      request(options, function(err, resp, body) {
        if (err) reject(err.message);
        resolve(body);
      });
    });
  }

  function parseGoogleAuthors(authors) {
    var parsed = authors.map(function(name) {
      name = human.parseName(name);
      return {
        'firstName': name.firstName,
        'middleName': name.middleName,
        'lastName': name.lastName
      };
    });
    return parsed;
  }

  function authorizeMendeley() {
    return new Promise(function(resolve, reject) {

      if (mendeleyIsAuthorized()) {
        resolve();
        return;
      }

      var oauth2 = require('simple-oauth2')({
        site: mendeleyUrl,
        clientID: '1790',
        clientSecret: 'iPPOzzQHCIxFDMvk',
        authorizationPath: '/oauth'
      });

      oauth2.client.getToken({}, function (err, result) {
        if (err) {
          reject(err.message);
        }
        mendeleyAccessToken = oauth2.accessToken.create(result);
        resolve();
      });

    });
  }

  function getMendeleyResults(searchTerms) {
    return new Promise(function(resolve, reject) {
      var options = {
        url: mendeleyUrl + '/search/catalog',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + mendeleyAccessToken.token.access_token,
          'Accept': 'application/vnd.mendeley-document.1+json'
        },
        qs: searchTerms
      }
      request(options, function(err, resp, body) {
        if (err) reject(err.message);
        resolve(body);
      });
    });
  }

  function mendeleyIsAuthorized() {
    return mendeleyAccessToken && !mendeleyAccessToken.expired();
  }


  return {

    search: function(searchTerms) {
      return new Promise(function(resolve,reject) {
        getResults(searchTerms, function(err, results) {
          if (err) reject(err.message);
          else resolve(results);
        });
      });
    }

  }

})();