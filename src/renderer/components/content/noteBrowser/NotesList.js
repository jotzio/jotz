var React = require('react');
var _ = require('underscore');

// TODO: Make each note clickable

var NotesList = React.createClass({

  handleClick: function(e) {
    e.preventDefault();
    var noteId = e.target.attributes.getNamedItem('data-note').value;
    var note = this.props.allNotes.findWhere({ _id: noteId });
    this.props.swapNoteView(note);
  },

  render: function() {
    var notes = this.props.allNotes.map(function(note) {
      return <li onClick={this.handleClick} data-note={note.get('_id')} key={note.get('_id')}>{note.get('title')}</li>;
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

