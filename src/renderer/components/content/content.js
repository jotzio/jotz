var React = require('react');
var Editor = require('./editor/Editor');

/*
  This manages what is displayed in the content area,
  Notes or Editor.
  TODO: Refactor NotesList to separate file
  TODO: Create NoteBook View
 */

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

  //Checks view state, returns jsx for rendering
  renderContent: function() {
    if(this.props.view === 'Notes') {
      return (
        <NotesList allNotes={this.props.allNotes}/>
      );
    } else if (this.props.view === 'Editor') {
      return (
        <Editor
          note={this.props.currentNote}
          updateNoteBlock={this.props.updateNoteBlock}
          changeView={this.props.changeView}
        />
      );
    }
  },

  render: function() {
    var classes = 'content ';
    return (
      <div className={classes}>
        <h1>This is the main content area</h1>
        {this.renderContent()}
      </div>
    );
  }
});

module.exports = Content;
