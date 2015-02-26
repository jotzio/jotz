var React = require('react');
var actionCreator = require('../../../actions/action_creator');

var NotebookCreator = React.createClass({
  createNotebook: function() {
    actionCreator.saveNotebook(this.refs.newNotebook.value);
    this.props.changeNotebook(this.refs.newNotebook.value);
  },

  render: function() {
    return (
      <div>
        <input
          type='text'
          ref='newNotebook'
          placeholder='untitled'
        />
        <button onClick={this.createNotebook}>+ Notebook</button>
      </div>

    );
  }
});

module.exports = NotebookCreator;