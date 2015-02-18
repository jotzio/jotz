var React = require('react');
var BlockMenu = require('./BlockMenu');
var AceEditor = require('./aceEditor');

var NoteBlock = React.createClass({
  updateNote: function() {
    console.log(this.props.value);
    this.props.value = this.editor.getText();
    this.props.updateBlock(this.props.blockNum, this.props.value);
  },
  changeLanguage: function (event) {
    this.editor.changeLanguage('ace/mode/' + event.target.value);
  },
  componentDidMount: function() {
    this.editor = new AceEditor('ace-editor' + this.props.blockNum);
    this.editor.setText(this.props.value);
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