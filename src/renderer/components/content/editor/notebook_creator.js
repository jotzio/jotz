var React = require('react');
var actionCreator = require('../../../actions/action_creator');

var NotebookCreator = React.createClass({

  saveNotebook: function() {
    var notebook = {
      title: this.refs.newNotebook.getDOMNode().value.trim()
    };
    actionCreator.saveNotebook(notebook);
    this.props.toggleNotebookCreator();
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