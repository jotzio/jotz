var React = require('react');
var actionCreator = require('../../../actions/action_creator');

var NotebookCreator = React.createClass({
  updateNotebook: function(event) {
    console.log(event.target.value);
    this.props.updateNotebook(event.target.value);
  },

  saveNotebook: function() {
    actionCreator.saveNotebook(this.refs.newNotebook.getDOMNode().value.trim());
    this.props.toggleNotebookInput();
  },

  render: function() {
    return (
      <div>
        <input
          type='text'
          onChange={this.updateNotebook}
          placeholder='untitled'
          ref='newNotebook'
        />
        <input type='submit' onClick={this.saveNotebook} />
      </div>

    );
  }
});

module.exports = NotebookCreator;