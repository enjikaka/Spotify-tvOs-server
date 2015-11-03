/* global Presenter, WebAPI, Player, Playlist, MediaItem, App, evaluateScripts */

var AlbumList = {
  createGrid: function(json) {
    var template = '<grid><section>';

    for (var i = 0; i < json.items.length; i++) {
      var album = json.items[i];
      template += `
        <lockup albumId="${album.id}">
          <img src="${album.images[0].url}" width="256" height="256" />
          <title>${album.name}</title>
        </lockup>
      `;
    }
    template += '</section></grid>';

    return template;
  },
  createCatalog: function(data, grid) {
    var templateString = `
      <catalogTemplate>
        <banner>
          <title>${data.artist}</title>
        </banner>
        <list>
          <section>
            <listItemLockup>
              <title>Albums</title>
              <decorationLabel>${data.albumCount}</decorationLabel>
              <relatedContent>${grid}</relatedContent>
            </listItemLockup>
          </section>
        </list>
      </catalogTemplate>`;

    return Presenter.createDocument(templateString);
  },
  clickAlbum: function(event) {
    var ele = event.target;
    var albumId = ele.getAttribute('albumId');

    Album.render(albumId);
  },
  render: function(artistId) {
    var self = this;

    WebAPI.artist(artistId, function(artistJSON) {
      var artistName = artistJSON.name;

      WebAPI.artistAlbums(artistId, function(albumsJSON) {
        var grid = self.createGrid(albumsJSON);

        var catalog = self.createCatalog({
          albumCount: albumsJSON.items.length,
          artist: artistName
        }, grid);

        catalog.addEventListener('select', self.clickAlbum);

        Presenter.pushDocument(catalog);
      });
    });
  }
};

var Album = {
  createGrid: function(json) {
    var template = '<section>';

    for (var i = 0; i < json.tracks.items.length; i++) {
      var song = json.tracks.items[i];
      var cover = json.images[0].url;
      var artist = json.artists[0].name;
      template += `<listItemLockup audioURL="${song.preview_url}" audioArt="${cover}" audioTitle="${song.name}" artistSubtitle="${artist}" audioDesc="${json.name}">
        <title>${song.name}</title>
        <relatedContent>
          <lockup>
            <img src="${cover}" width="640" height="640" />
            <title>${json.name}</title>
            <description>${artist}</description>
          </lockup>
        </relatedContent>
      </listItemLockup>`;
    }

    template += '</section>';

    return template;
  },
  createList: function(grid) {
    var templateString = '<listTemplate> <list> <header>Songs</header> '+grid+' </list> </listTemplate>';

    return Presenter.createDocument(templateString);
  },
  clickSong: function(event) {
    var ele = event.target;
    var href = ele.getAttribute('audioURL');
    var title = ele.getAttribute('audioTitle');
    var subtitle = ele.getAttribute('audioSubtitle');
    var desc = ele.getAttribute('audioDesc');
    var cover = ele.getAttribute('audioArt');

    var player = new Player();
    var playlist = new Playlist();
    var media = new MediaItem('audio', href);
    media.title = title;
    media.subtitle = subtitle;
    media.description = desc;
    media.artworkImageURL = cover;

    playlist.push(media);
    player.playlist = playlist;

    player.play();
  },
  render: function(albumId) {
    var self = this;

    WebAPI.album(albumId, function(albumsJSON) {
      var grid = self.createGrid(albumsJSON);

      var list = self.createList(grid);

      list.addEventListener('select', self.clickSong);

      Presenter.pushDocument(list);
    });
  }
};


var createAlert = function(title, desc) {
  var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <alertTemplate>
        <title>${title}</title>
        <description>${desc}</description>
        <button>
          <text>OK</text>
        </button>
      </alertTemplate>
    </document>`;

  return Presenter.createDocument(alertString);
};

App.onLaunch = function(options) {
  var javascriptFiles = [
    `${options.BASEURL}js/spotify-api-wrapper.js`,
    `${options.BASEURL}js/presenter.js`
  ];

  evaluateScripts(javascriptFiles, function(success) {
    if (success) {
      AlbumList.render('0lLY20XpZ9yDobkbHI7u1y');
    } else {
      var alert = createAlert('Woops!', 'Looks like an error occured!');
      Presenter.modalDialogPresenter(alert);
    }
  });
};
