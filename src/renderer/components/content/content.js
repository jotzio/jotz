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
          swapNoteView={this.props.swapNoteView}
        />
      );
    } else if (this.props.view === 'Editor') {
      return (
        <Editor
          note={this.props.currentNote}
          allNotes={this.props.allNotes}
          swapListView={this.props.swapListView}
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
