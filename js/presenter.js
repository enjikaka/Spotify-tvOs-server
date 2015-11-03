/* global navigationDocument */

var Presenter = {
  createDocument: function(resource) {
    if (!Presenter.parser) {
      Presenter.parser = new DOMParser();
    }

    var doc = Presenter.parser.parseFromString(resource, 'application/xml');
    return doc;
  },
  modalDialogPresenter: function(xml) {
    navigationDocument.presentModal(xml);
  },
  pushDocument: function(xml) {
    navigationDocument.pushDocument(xml);
  }
};
