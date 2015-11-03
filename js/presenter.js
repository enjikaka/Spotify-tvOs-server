/* global navigationDocument */

var Presenter = {
  currentDoc: null,
  createDocument: function(template) {
    if (!Presenter.parser) {
      Presenter.parser = new DOMParser();
    }

    var xml = `<?xml version="1.0" encoding="UTF-8" ?><document>${template}</document>`;

    var doc = Presenter.parser.parseFromString(xml, 'application/xml');
    return doc;
  },
  modalDialogPresenter: function(xml) {
    navigationDocument.presentModal(xml);
  },
  pushDocument: function(xml) {
    navigationDocument.pushDocument(xml);
  }
};
