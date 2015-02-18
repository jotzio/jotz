var React = require('react');

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

var Content = React.createClass({
  render: function() {
    var classes = 'content ';
    return (
      <div className={classes}>
        <h1>This is the main content area</h1>
        {this.props.view === 'Notes' ? <NotesList allNotes={this.props.allNotes}/> : null}
      </div>
    );
  }
});

module.exports = Content;
