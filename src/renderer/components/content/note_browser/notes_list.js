var React = require('react');
var _ = require('underscore');
var actionCreator = require('../../../actions/action_creator');

// TODO: Make each note clickable

var NotesList = React.createClass({

  handleClick: function(e) {
    e.preventDefault();
    var noteId = e.target.attributes.getNamedItem('data-note').value;
    var note = this.props.notes.findWhere({ _id: noteId });
    this.props.swapView('Editor', note);
  },

  handleDelete: function(e) {
    e.preventDefault();
    var noteId = e.target.attributes.getNamedItem('data-note').value;
    var note = this.props.notes.findWhere({ _id: noteId });
    actionCreator.destroyNote(note.attributes);
  },

  render: function() {
    var notes = this.props.notes.sortBy('_id').map(function(note) {
      var noteId = note.get('_id');
      return <li>
              <a onClick={this.handleClick} data-note={noteId} key={noteId} href=''>{note.get('title')}</a>
              <a onClick={this.handleDelete} data-note={noteId} href=''> delete</a>
             </li>;
    }.bind(this));
    return (
      <div>
        <h1>Hooray for the NotesList!!!</h1>
        <ul>
          {notes}
        </ul>
      </div>
    );
  }
});

module.exports = NotesList;

