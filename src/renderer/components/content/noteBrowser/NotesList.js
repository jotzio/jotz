var React = require('react');

// TODO: Make each note clickable

var NotesList = React.createClass({

  render: function() {
    var notes = this.props.allNotes.map(function(note) {
      return <li key={note.get('_id')}>{note.get('title')}</li>;
    });
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