var React = require('react');
var Editor = require('./editor/Editor');
var NotesList = require('./noteBrowser/NotesList');

/*
  This manages what is displayed in the content area,
  Notes or Editor.
  TODO: Create NoteBook View
 */

var Content = React.createClass({

  //Checks view state, returns jsx for rendering
  renderContent: function() {
    if(this.props.view === 'Notes') {
      return (
        <NotesList
          allNotes={this.props.allNotes}
          newNote={this.props.newNote}
        />
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
    var classes = 'content main-container ';
    return (
      <div className={classes}>
        <h1>This is the main content area</h1>
        {this.renderContent()}
      </div>
    );
  }
});

module.exports = Content;
