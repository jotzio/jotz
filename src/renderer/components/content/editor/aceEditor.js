var Ace = require('./aceConfig');

var Editor = function() {
  this.editor = Ace.edit('ace-editor');
  this.editor.setOptions({
    maxLines: 400,
    minLines: 5,
    useWorker: false,
    mode: 'ace/mode/javascript',
    theme: 'ace/theme/monokai'
  });
};

Editor.prototype.changeLanguage = function(languagePath) {
  this.editor.session.setMode(languagePath);
};

Editor.prototype.editTextBlock = function () {

};

Editor.prototype.saveTextBlock = function () {
  console.log(this.editor.getValue());
};

Editor.prototype.newTextBlock = function() {

};

Editor.prototype.deleteTextBlock = function () {

};

module.exports = Editor;
