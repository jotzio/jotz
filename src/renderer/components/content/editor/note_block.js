var React = require('react');
var BlockMenu = require('./block_menu');
var AceEditor = require('./ace_editor');

/*
  Each NoteBlock contains an instance of AceEditor.
  Bring themes and languages in via require in aceConfig.js.
  Callbacks for changing langauges and themes defined here
  BlockMenu is where the changeable menu items are located
  TODO: add themes, make text blocks render different themes than code blocks
  TODO: add block deletion (here, AceEditor, and probably a callback in jotz.js)
 */

var NoteBlock = React.createClass({
  updateNote: function() {
    var text = this.editor.getText();
    this.props.updateBlock(this.props.blockIndex, text, this.props.language);
  },

  changeLanguage: function(event) {
    this.editor.changeLanguage('ace/mode/' + event.target.value);
    this.props.updateBlock(this.props.blockIndex, this.props.text, event.target.value);
  },

  //This creates and appends an ace editor to the appropriate div
  //blockIndex is the associated index in the blocks array
  componentDidMount: function() {
    this.editor = new AceEditor('ace-editor' + this.props.blockIndex);
    this.editor.setText(this.props.text);
    this.editor.changeLanguage('ace/mode/' + this.props.language);
    this.editor.onChange(this.updateNote);
  },

  render: function() {
    return (
      <div>
        <BlockMenu language={this.props.language} changeLanguage={this.changeLanguage} />
        <button onClick={this.makeGist}>Create Gist</button>
        <div
          id={'ace-editor' + this.props.blockIndex}
          className='ace-editor-inner'
        ></div>
      </div>
    );
  }
});

module.exports = NoteBlock;
