var React = require('react');
var Editor = require('./editor/Editor');

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
  changeContent: function() {
    if(this.props.view === 'Notes') {
      return (
        <NotesList allNotes={this.props.allNotes}/>
      );
    } else if (this.props.view === 'Editor') {
      return (
        <Editor note={this.props.currentNote} newBlock={this.props.newBlock} />
      );
    }
  },

  render: function() {
    var classes = 'content ';
    var Content = null;
    if (this.props.view === 'Notes') {
      Content = <NotesList allNotes={this.props.allNotes}/>;
    } else if (this.props.view === 'Editor') {
      Content = <Editor note={this.props.currentNote} newBlock={this.props.newBlock}/>;
    }
    return (
      <div className={classes}>
        <h1>This is the main content area</h1>
        {Content}
      </div>
    );
  }
});

module.exports = Content;
