var React = require('react');
var actionCreator = require('../../../actions/action_creator');

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
  return (S4() + S4() + "_" + S4() + "_" + S4() + "_" + S4() + "_" + S4() + S4() + S4());
}

var NotebookCreator = React.createClass({

  saveNotebook: function() {
    var notebook = {
      title: this.refs.newNotebook.getDOMNode().value.trim(),
      _id: guid()
    };
    this.props.updateNotebook(notebook);
    actionCreator.saveNotebook(notebook);
    this.props.toggleNotebookInput();
  },

  render: function() {
    return (
      <div>
        <input
          type='text'
          placeholder='untitled'
          ref='newNotebook'
        />
        <input type='submit' onClick={this.saveNotebook} />
      </div>
    );
  }
});

module.exports = NotebookCreator;