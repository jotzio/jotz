var React = require('react');
var BlockMenu = require('./BlockMenu');
var AceEditor = require('./aceEditor');

/*
  Each NoteBlock contains an instance of AceEditor.
  Bring themes and languages in via require in aceConfig.js.
  Callbacks for changing langauges and themes defined here
  BlockMenu is where the changeable menu items are located
  TODO: add themes, make text blocks render different themes than code blocks
  TODO: set default language to text
  TODO: add block deletion (here, AceEditor, and probably a callback in jotz.js)
 */

var NoteBlock = React.createClass({
  updateNote: function() {
    this.props.text = this.editor.getText();
    this.props.updateBlock(this.props.blockNum, this.props.text);
  },

  changeLanguage: function (event) {
    this.editor.changeLanguage('ace/mode/' + event.target.value);
  },

  //This creates and appends an ace editor to the appropriate div
  //blockNum is the associated index in the blocks array
  componentDidMount: function() {
    this.editor = new AceEditor('ace-editor' + this.props.blockNum);
    this.editor.setText(this.props.text);
    this.editor.onChange(this.updateNote);
  },

  render: function () {
    return (
      <div>
        <BlockMenu changeLanguage={this.changeLanguage} />
        <div
          id={'ace-editor' + this.props.blockNum}
          className='ace-editor-inner'
        ></div>
      </div>
    )
  }
});

module.exports = NoteBlock;