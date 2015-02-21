var React = require('react');
var _ = require('underscore');

// TODO: Make each note clickable

var NotesList = React.createClass({

  handleClick: function(e) {
    e.preventDefault();
    var noteId = e.target.attributes.getNamedItem('data-note').value;
    var note = this.props.notes.findWhere({ _id: noteId });
    this.props.swapView('Editor', note);
  },

  render: function() {
    var notes = this.props.notes.sortBy('_id').map(function(note) {
      var noteId = note.get('_id');
      return <li onClick={this.handleClick} data-note={noteId} key={noteId}>{note.get('title')}</li>;
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

