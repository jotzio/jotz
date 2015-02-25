var React = require('react');
var actionCreator = require('../../../actions/action_creator');

var NoteItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.changeNote('Editor', this.props.note);
  },

  handleDelete: function(e) {
    e.preventDefault();
    actionCreator.destroyNote(this.props.note);
  },

  render: function() {
    return (
      <li>
        <a onClick={this.handleClick} href=''>{this.props.note.get('title')}</a>
        <a onClick={this.handleDelete} href=''>delete</a>
      </li>
    );
  }
});

module.exports = NoteItem;

