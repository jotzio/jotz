var Ace = require('./ace_config');

var Editor = function(target) {
  this.silent = false;
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
  this.silent = true;
  this.editor.setValue(text, 1);
  this.silent = false;
};

Editor.prototype.onChange = function(func) {
  var silent = this.isSilent.bind(this);
  this.editor.on('change', function(data) {
    if(silent()){
      return;
    }
    func();
  });
};

Editor.prototype.isSilent = function () {
  return this.silent;
};

module.exports = Editor;
