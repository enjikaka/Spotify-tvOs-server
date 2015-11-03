/*eslint-disable no-unused-vars*/
var WebAPI = {
    getJSON: function(url, successCallback, errorCallback) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.status === 200 && xhr.readyState === 4) {
          var json = JSON.parse(xhr.responseText);

          successCallback(json);
        }
      };

      xhr.onerror = function() {
        errorCallback(xhr.response);
      };

      xhr.open('GET', url, true);

      xhr.send();
    },
    tracks: function(id, successCallback, errorCallback) {
      this.getJSON('https://api.spotify.com/v1/tracks/' + id, function(json) {
        successCallback(json);
      }, function(error) {
        errorCallback(error);
      });
    },
    playlist: function(id, successCallback, errorCallback) {
      this.getJSON('https://api.spotify.com/v1/playlist/' + id, function(json) {
        successCallback(json);
      }, function(error) {
        errorCallback(error);
      });
    },
    artist: function(id, successCallback, errorCallback) {
      this.getJSON('https://api.spotify.com/v1/artists/' + id, function(json) {
        successCallback(json);
      }, function(error) {
        errorCallback(error);
      });
    },
    album: function(id, successCallback, errorCallback) {
      this.getJSON('https://api.spotify.com/v1/albums/' + id, function(json) {
        successCallback(json);
      }, function(error) {
        errorCallback(error);
      });
    },
    artistAlbums: function(id, successCallback, errorCallback) {
      this.getJSON('https://api.spotify.com/v1/artists/' + id + '/albums?market=SE', function(json) {
        successCallback(json);
      }, function(error) {
        errorCallback(error);
      });
    },
    findTrack: function(q, successCallback, errorCallback) {
        q = q.replace(/\s/g, '+');
        q = q.replace(/å/g, 'a');
        q = q.replace(/ä/g, 'a');
        q = q.replace(/ö/g, 'o');
        this.getJSON('https://api.spotify.com/v1/search?q=' + q + '&type=track', function(json) {
          successCallback(json);
        }, function(error) {
          errorCallback(error);
        });
    },
    artistSearch: function(q, successCallback, errorCallback) {
        this.getJSON('https://api.spotify.com/v1/search?q=' + q + '&type=artist', function(json) {
          successCallback(json);
        }, function(error) {
          errorCallback(error);
        });
    },
    urlToId: function(uri) {
      try {
        if (uri.indexOf('spotify:') !== -1) {
          if (uri.indexOf('spotify:track:') !== -1) {
            return uri.split('spotify:track:')[1];
          } else {
            throw new TypeError('The URI does not belong to a track.');
          }
        } else if (uri.indexOf('spotify.com/') !== -1) {
          if (uri.indexOf('spotify.com/track/') !== -1) {
            return uri.split('spotify.com/track/')[1];
          } else {
            throw new TypeError('The URI does not belong to a track.');
          }
        } else {
          return uri;
        }
      } catch (error) {
        alert(error.name + ': ' + error.message);
      }
    }
};
/*eslint-enable no-unused-vars*/
