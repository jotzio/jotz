var Ace = require('./aceConfig');

var Editor = function(target) {
  this.editor = Ace.edit(target);
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

Editor.prototype.getText = function () {
  return this.editor.getValue();
};

Editor.prototype.setText = function(text) {
  this.editor.setValue(text, 1);
};

Editor.prototype.onChange = function(func) {
  this.editor.on('change', function(data) {
    func();
  });
};

Editor.prototype.deleteTextBlock = function () {

};

module.exports = Editor;
