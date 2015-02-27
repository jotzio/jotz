var Ace = require('./ace_config');

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
  this.silent = false;
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

Editor.prototype.onBlur = function(func) {
  var isSilent = this.isSilentAction.bind(this);
  this.editor.on('blur', function(data) {
    if (isSilent()) {
      return;
    }
    func();
  });
};

Editor.prototype.onFocus = function(func) {
  this.editor.on('focus', function() {
    func();
  });
};

Editor.prototype.isSilentAction = function() {
  return this.silent;
};

module.exports = Editor;
