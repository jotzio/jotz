var Ace = require('./ace_config');

/*
  Editor Helper functions
  TODO: deleteTextBlock
 */

var Editor = function(target) {
  this.editor = Ace.edit(target);
  this.editor.setOptions({
    maxLines: 400,
    minLines: 5,
    useWorker: false,
    showPrintMargin: false,
    showLineNumbers: false,
    showGutter: false,
    mode: 'ace/mode/text',
    theme: 'ace/theme/monokai'
  });
};

Editor.prototype.changeLanguage = function(languagePath) {
  this.editor.getSession().setMode(languagePath);
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
